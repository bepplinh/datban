# 📋 Tổng Hợp Logic Project "Đặt Bàn" (Restaurant POS)

> Cập nhật lần cuối: 2026-03-25

---

## 1. Tổng Quan Hệ Thống

Đây là hệ thống POS (Point of Sale) nhà hàng gồm 2 phần chính:

- **Backend**: Node.js + Express + Prisma + MySQL + Socket.io
- **Frontend**: React (Vite) + React Router

Hệ thống phục vụ 3 nhóm người dùng:
| Role | Mô tả |
|------|-------|
| **Khách hàng** | Quét QR tại bàn → xem menu → đặt đồ |
| **Staff (Nhân viên)** | Quản lý bàn, xử lý đơn hàng, thu tiền |
| **Admin** | Quản lý menu, bàn, nhân viên, xem thống kê |

---

## 2. Database Schema (Prisma / MySQL)

### Enums

| Enum                   | Values                                                                            |
| ---------------------- | --------------------------------------------------------------------------------- |
| `RoleName`             | `ADMIN`, `STAFF`                                                                  |
| `TableStatus`          | `EMPTY`, `OCCUPIED`                                                               |
| `SessionStatus`        | `ACTIVE`, `CLOSED`                                                                |
| `OrderStatus`          | `PENDING` → `CONFIRMED` → `PREPARING` → `READY` → `SERVED` → `PAID` / `CANCELLED` |
| `PaymentStatus`        | `PENDING`, `SUCCESS`, `FAILED`                                                    |
| `ServiceRequestStatus` | `PENDING`, `RESOLVED`                                                             |

### Các Model chính

```
User ──── Role (ADMIN/STAFF)

Table ────┬── TableSession ──── UserSession
          ├── Order ──── OrderItem ──── Product ──── Category
          │         └── Payment
          └── ServiceRequest
```

- **Table**: Mỗi bàn có `status` (EMPTY/OCCUPIED) và `token` dùng để xác thực QR.
- **TableSession**: Phiên làm việc của một bàn (mỗi lần Staff mở bàn = 1 session mới). Có `expiresAt` (2 giờ).
- **Order**: Mỗi session chỉ có **1 đơn hàng** (`tableSessionId @unique`). Order thuộc về cả `tableId` và `tableSessionId`.
- **OrderItem**: Chi tiết từng món trong đơn, lưu `unitPrice` tại thời điểm đặt.
- **Payment**: Liên kết 1-1 với Order (`orderId @unique`).
- **ServiceRequest**: Yêu cầu từ khách (`CALL_STAFF`, `REQUEST_PAYMENT`, ...).

---

## 3. Backend Architecture

### Entry Point: `src/server.js`

```
Express App
├── Global Middleware: helmet, cors, json, cookieParser
├── Public Routes (không cần auth):
│   ├── POST /api/auth/login
│   ├── GET  /api/menu
│   ├── POST /api/table-session       ← Khách quét QR
│   ├── GET  /api/qr/:tableId         ← Tạo QR
│   ├── POST /api/service-requests    ← Khách gọi nhân viên
│   └── GET|PATCH /api/service-requests/...
├── Authenticated Routes:
│   ├── /api/admin/*  ← ADMIN only
│   └── /api/staff/*  ← STAFF + ADMIN
└── Client Routes (cần table session):
    └── /api/orders/* ← checkTableSession middleware
```

### Layer Architecture

```
Routes → Controllers → Services → Repositories → Prisma → MySQL
```

---

## 4. Business Logic Chi Tiết

### 4.1 Authentication (`auth.service.js`)

1. Nhận `username` + `password`
2. Tìm user theo username
3. Verify password bằng `bcrypt`
4. Tạo `accessToken` + `refreshToken` (JWT)
5. Trả về user info + tokens

### 4.2 Luồng Khách Hàng (Customer Flow)

```
[Quét QR] → POST /api/table-session { tableId, token }
                ↓
         tableSession.service.getOrCreateTableSession()
         ├── Kiểm tra table tồn tại
         ├── Kiểm tra token QR hợp lệ
         ├── Kiểm tra table.status === "OCCUPIED" (phải được staff mở trước)
         │   └── Nếu EMPTY → 403 "Bàn chưa được mở. Vui lòng đợi nhân viên."
         ├── Tìm session ACTIVE hiện tại
         │   └── Nếu không có → tạo session mới (expiresAt +2h)
         └── Trả về session (id lưu vào cookie tableSessionId)
                ↓
[Xem menu] → GET /api/menu (public)
                ↓
[Đặt đồ] → POST /api/orders (cần cookie tableSessionId)
           order.service.placeOrder()
           ├── Tìm order hiện tại của session
           │   ├── Nếu có (và chưa PAID/CANCELLED) → addItems()
           │   └── Nếu không có → tạo order mới
           ├── Validate sản phẩm (tồn tại + isAvailable)
           ├── Tính total
           └── Tạo Order + OrderItems trong DB
                ↓
[Thêm món] → POST /api/orders/items
           order.service.addItems()
           ├── Validate order chưa PAID/CANCELLED
           ├── Validate sản phẩm
           └── Cộng thêm items + tăng total
                ↓
[Xem trạng thái đơn] → GET /api/orders/status
                ↓
[Gọi nhân viên] → POST /api/service-requests { tableId, type }
[Yêu cầu thanh toán] → POST /api/service-requests { tableId, type: "REQUEST_PAYMENT" }
```

### 4.3 Luồng Nhân Viên / Staff (Staff Flow)

**Quản lý Bàn:**

```
staff.service.openTable(tableId)
├── Kiểm tra table tồn tại
├── Kiểm tra table chưa OCCUPIED
├── Update table.status → "OCCUPIED"
├── Tạo TableSession mới (expiresAt +2h)
└── Trả về session

staff.service.closeTable(tableId)
├── Kiểm tra table tồn tại
├── Update table.status → "EMPTY"
├── Tìm session ACTIVE
└── closeTableSession() → status = "CLOSED"
```

**Quản lý Đơn Hàng:**

```
staff.service.updateOrderStatus(orderId, newStatus)
├── Kiểm tra order tồn tại
├── Validate chuyển trạng thái (STATE MACHINE):
│   PENDING → [CONFIRMED, CANCELLED]
│   CONFIRMED → [PREPARING, CANCELLED]
│   PREPARING → [READY]
│   READY → [SERVED]
│   SERVED → [PAID]
└── Update status trong DB
```

**getTables():** Lấy danh sách bàn kèm:

- Session time (đã ngồi bao lâu tính bằng phút)
- Order status và total hiện tại

### 4.4 Luồng Admin

| Nhóm           | Endpoints                                                       |
| -------------- | --------------------------------------------------------------- |
| **Categories** | GET/POST/PUT/DELETE `/api/admin/categories`                     |
| **Products**   | GET/POST/PUT/DELETE `/api/admin/products`                       |
| **Tables**     | GET/POST/PUT/DELETE `/api/admin/tables`                         |
| **Staff**      | GET/POST/PUT/DELETE `/api/admin/staff`                          |
| **Stats**      | GET `/api/admin/stats/revenue`, `/api/admin/stats/best-selling` |

### 4.5 Service Requests

```
Khách → POST /api/service-requests { tableId, type }
       → Lưu DB với status PENDING
       → Emit socket event đến staff

Staff → GET /api/service-requests/pending
Staff → PATCH /api/service-requests/:id/resolve
       → Update status → RESOLVED
```

---

## 5. Real-time (Socket.io)

### Backend (`config/socket.js` + `socket.service.js`)

- **Server**: Socket.io attach vào HTTP server
- **Events nhận**:
  - `join-room`: Client tham gia room (theo tableId hoặc "staff")
  - `new-notification`: Nhận notification từ client

- **socketService** (dùng để emit từ các service):
  - `emitToRoom(room, event, data)`: Gửi đến một room
  - `emitToSocket(socketId, event, data)`: Gửi đến 1 client
  - `broadcast(event, data)`: Gửi đến tất cả

### Kiến trúc Room

- Khách hàng join room `table-{tableId}`
- Staff join room `staff`
- Khi có service request → emit đến room `staff`

---

## 6. Middleware

| Middleware                    | Mục đích                                                |
| ----------------------------- | ------------------------------------------------------- |
| `authenticate`                | Verify JWT token từ Authorization header                |
| `authorize(...roles)`         | Kiểm tra role của user                                  |
| `checkTableSession`           | Đọc `tableSessionId` từ cookie/header, inject vào `req` |
| `validateBodyRequest(schema)` | Validate request body bằng Zod schema                   |
| `errorHandler`                | Global error handler, chuẩn hóa response lỗi            |

---

## 7. Frontend Structure (React/Vite)

### Routing (`App.jsx`)

```
/                    → HomePage (Landing)
/menu                → Menu (Public menu)
/table/:tableId      → TableLayout
  /                  → QRHome (Quét QR, tạo session)
  /menu              → MenuPage (Đặt đồ có session)
/staff/login         → StaffLogin
/staff/*             → StaffGuard → StaffLayout
  /                  → POSDashboardPage (Quản lý bàn)
  /tables            → POSDashboardPage
  /tables/:tableId   → TableDetailPage (Chi tiết bàn)
  /orders            → (Đang xây dựng)
  /settings          → (Đang xây dựng)
```

### Feature Folders (`src/features/`)

| Folder          | Chức năng                                |
| --------------- | ---------------------------------------- |
| `landing`       | Trang chủ giới thiệu                     |
| `menu`          | Menu công khai                           |
| `table-session` | QR scan, khởi tạo session bàn            |
| `orders`        | Đặt đồ theo session bàn                  |
| `staff`         | POS Dashboard, quản lý bàn, chi tiết bàn |
| `auth`          | Đăng nhập staff                          |

### Shared (`src/shared/`)

- **layouts**: `LayoutClient`, `TableLayout`, `StaffLayout`
- **components**: `StaffGuard` (bảo vệ route staff)
- **providers**: `SocketProvider` (context Socket.io)
- **hooks**: Custom hooks (useSocket, ...)
- **services**: API service layer

---

## 8. Luồng Tổng Thể (End-to-End)

```
1. Admin tạo bàn + menu trong hệ thống
2. Admin in QR code cho từng bàn (token embedded trong URL)
3. Staff login → vào POS Dashboard
4. Khách đến → Staff click "Mở Bàn" → table.status = OCCUPIED, session mới được tạo
5. Khách quét QR → Hệ thống verify token + tìm/tạo session → lưu sessionId vào cookie
6. Khách xem menu → chọn món → Đặt hàng (POST /api/orders)
7. Staff thấy đơn mới → Confirm → Preparing → Ready → Served
8. Khách request thanh toán (service request) → Staff nhận notification realtime
9. Staff xử lý thanh toán → Order status → PAID
10. Staff click "Đóng Bàn" → table.status = EMPTY, session = CLOSED
```

---

## 9. Bảo Mật

- **JWT**: Access token + Refresh token cho staff/admin
- **bcrypt**: Hash password
- **Table Token**: Mỗi bàn có UUID token riêng để xác thực QR
- **Session Guard**: Bàn phải ở trạng thái OCCUPIED thì khách mới có thể order
- **Role-based Access**: ADMIN-only và STAFF+ADMIN routes riêng biệt
- **Helmet**: HTTP security headers
- **CORS**: Chỉ cho phép origin frontend

---

## 10. Điểm Chưa Hoàn Thiện / TODO

- [ ] Staff `/orders` và `/settings` pages đang xây dựng
- [ ] `serviceRequest` routes chưa có auth middleware bảo vệ (`TODO` trong code)
- [ ] Admin route chưa được đề cập trong frontend (admin dashboard)
- [ ] Socket room cho khách hàng chưa hoàn toàn integrate với service request notifications
- [ ] `admin.service.js` có logic thống kê revenue và best-selling products
