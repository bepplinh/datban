# Tài Liệu Nghiệp Vụ Frontend - Đặt Bàn QR

> **Mục đích**: Tài liệu này mô tả toàn bộ nghiệp vụ frontend, cấu trúc dữ liệu, và các API mà backend cần xây dựng để tích hợp với ứng dụng đặt bàn QR.

---

## 1. Tổng Quan Hệ Thống

### Luồng Hoạt Động Chính

```
Khách quét QR tại bàn
        │
        ▼
Vào trang QRHome (trang chủ QR)
        │
        ▼
Nhấn "Xem Thực Đơn" → MenuPage
        │
        ▼
Xem menu theo danh mục → Thêm món vào giỏ
        │
        ▼
CartBar hiển thị → Nhấn "Xem giỏ hàng"
        │
        ▼
CartDetailsModal → Chỉnh sửa / xác nhận đơn
        │
        ▼
POST /orders → Đơn hàng được gửi lên bếp
```

### Cấu Hình API

| Thuộc tính   | Giá trị                                                   |
| ------------ | --------------------------------------------------------- |
| Base URL     | `http://localhost:3000/api` (cấu hình qua `VITE_API_URL`) |
| Content-Type | `application/json`                                        |
| Auth         | Chưa cần (public API cho khách)                           |

---

## 2. API: Menu (Thực Đơn)

### `GET /api/menu`

Frontend gọi endpoint này (qua `useMenuStore.fetchMenu()`) để lấy **toàn bộ thực đơn** khi khách vào trang menu. Kết quả được cache trong Zustand store và chỉ fetch **1 lần duy nhất** trong session.

#### Response Mong Đợi

```json
{
  "data": [
    {
      "id": "cat-001",
      "name": "Đồ uống",
      "products": [
        {
          "id": "prod-001",
          "name": "Trà sữa trân châu",
          "description": "Trà sữa thơm ngon với trân châu đen",
          "price": 35000,
          "image": "https://example.com/images/tra-sua.jpg",
          "isAvailable": true
        },
        {
          "id": "prod-002",
          "name": "Cà phê sữa đá",
          "description": "Cà phê đậm đà pha với sữa đặc",
          "price": 29000,
          "image": "https://example.com/images/ca-phe.jpg",
          "isAvailable": true
        }
      ]
    },
    {
      "id": "cat-002",
      "name": "Đồ ăn",
      "products": [
        {
          "id": "prod-003",
          "name": "Cơm gà hội an",
          "description": "Cơm gà truyền thống Hội An",
          "price": 65000,
          "image": "https://example.com/images/com-ga.jpg",
          "isAvailable": true
        }
      ]
    }
  ]
}
```

#### Định Nghĩa Schema

##### Category (Danh Mục)

| Field      | Type     | Bắt Buộc | Mô Tả                                                |
| ---------- | -------- | -------- | ---------------------------------------------------- |
| `id`       | `string` | ✅       | ID duy nhất của danh mục                             |
| `name`     | `string` | ✅       | Tên hiển thị của danh mục                            |
| `products` | `array`  | ✅       | Danh sách sản phẩm thuộc danh mục (có thể rỗng `[]`) |

##### Product (Sản Phẩm)

| Field         | Type      | Bắt Buộc | Mô Tả                                                 |
| ------------- | --------- | -------- | ----------------------------------------------------- |
| `id`          | `string`  | ✅       | ID duy nhất của sản phẩm                              |
| `name`        | `string`  | ✅       | Tên sản phẩm                                          |
| `description` | `string`  | ❌       | Mô tả ngắn (hiển thị trong tìm kiếm và lọc)           |
| `price`       | `number`  | ✅       | Giá bán (VNĐ, số nguyên, VD: `35000`)                 |
| `image`       | `string`  | ✅       | URL ảnh sản phẩm (dùng cho FoodCard và EditItemModal) |
| `isAvailable` | `boolean` | ❌       | Sản phẩm còn hàng hay không (mặc định: `true`)        |

> **Lưu ý**: Frontend dùng `product.price` trực tiếp để tính `totalAmount` trong cart. Giá phải là số nguyên VNĐ. **Không** truyền dưới dạng `"35.000"` (string).

---

## 3. Nghiệp Vụ Giỏ Hàng (Cart Logic - Frontend Only)

Giỏ hàng được quản lý **hoàn toàn trên frontend** qua Zustand (`useCartStore`). Dữ liệu không gửi lên server cho đến khi khách xác nhận đặt hàng.

### Cấu Trúc Cart Item

```typescript
interface CartItem {
  id: string; // product.id từ API
  name: string; // product.name
  price: number; // product.price
  image: string; // product.image
  quantity: number; // ≥ 1
  // categoryId, categoryName: được thêm bởi useMenu hook
}
```

### Các Thao Tác

| Action            | Mô Tả                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `addToCart`       | Thêm 1 món; nếu đã có thì tăng quantity lên 1                    |
| `updateQuantity`  | Cộng/trừ số lượng theo delta; nếu quantity về 0 thì xóa khỏi giỏ |
| `setItemQuantity` | Set số lượng cụ thể (dùng trong EditItemModal); nếu = 0 thì xóa  |
| `removeFromCart`  | Xóa hẳn 1 món khỏi giỏ                                           |
| `clearCart`       | Xóa toàn bộ giỏ hàng (sau khi đặt hàng thành công)               |

### Công Thức Tính Giá

```
totalCount  = Σ (item.quantity)
totalAmount = Σ (item.price × item.quantity)
```

---

## 4. API: Đặt Hàng (Cần Backend Xây Dựng)

### `POST /api/orders`

Được gọi khi khách nhấn xác nhận đặt hàng trong `ConfirmDialog`.

#### Request Body

```json
{
  "tableId": "table-05",
  "items": [
    {
      "productId": "prod-001",
      "name": "Trà sữa trân châu",
      "price": 35000,
      "quantity": 2,
      "note": "Ít đường"
    },
    {
      "productId": "prod-003",
      "name": "Cơm gà hội an",
      "price": 65000,
      "quantity": 1,
      "note": ""
    }
  ],
  "totalAmount": 135000
}
```

#### Định Nghĩa Fields

| Field               | Type     | Bắt Buộc | Mô Tả                                           |
| ------------------- | -------- | -------- | ----------------------------------------------- |
| `tableId`           | `string` | ✅       | ID bàn (lấy từ URL / QR code)                   |
| `items`             | `array`  | ✅       | Danh sách món đặt                               |
| `items[].productId` | `string` | ✅       | ID sản phẩm tương ứng từ `/api/menu`            |
| `items[].name`      | `string` | ✅       | Tên món (để backend lưu snapshot)               |
| `items[].price`     | `number` | ✅       | Giá tại thời điểm đặt (để backend lưu snapshot) |
| `items[].quantity`  | `number` | ✅       | Số lượng (≥ 1)                                  |
| `items[].note`      | `string` | ❌       | Ghi chú của khách cho món (có thể rỗng `""`)    |
| `totalAmount`       | `number` | ✅       | Tổng tiền (VNĐ), tính từ frontend               |

> **Bảo mật**: Backend nên tự tính lại `totalAmount` từ `productId` và `quantity` để tránh giả mạo giá từ client.

#### Response Thành Công (201 Created)

```json
{
  "data": {
    "orderId": "ord-20260320-001",
    "tableId": "table-05",
    "status": "pending",
    "createdAt": "2026-03-20T10:30:00Z"
  }
}
```

#### Response Lỗi

```json
{
  "errors": [
    {
      "code": "PRODUCT_NOT_FOUND",
      "field": "items[0].productId",
      "message": "Sản phẩm không tồn tại"
    }
  ]
}
```

---

## 5. Tính Năng Ghi Chú Món (Note)

Trong `EditItemModal`, mỗi cart item có 1 ô textarea cho phép khách ghi chú riêng cho từng món (VD: "ít đường", "không rau"). Ghi chú này cần được:

- Lưu trong `CartItem` trên frontend (field `note: string`)
- Gửi kèm trong payload `POST /api/orders` ở `items[].note`
- Backend lưu vào đơn để bếp đọc được

---

## 6. Luồng Gọi API (Data Flow)

```
[Khách vào MenuPage]
    │
    ▼
useMenu() → useMenuStore.fetchMenu()
    │
    ▼
GET /api/menu
    │
    ▼
Response: { data: Category[] }
    │
    ▼
useMenuStore.categories = [...] (cached)
    │
    ▼
useMenu hook: flatten → filter → sort → filteredProducts
    │
    ▼
MenuPage renders FoodCard components
    │
    ▼
[Khách nhấn "+"] → useCartStore.addToCart(product)
    │
    ▼
CartBar hiện lên (khi totalCount > 0)
    │
    ▼
[Khách xác nhận] → POST /api/orders
    │
    ▼
useCartStore.clearCart()
```

---

## 7. Cấu Trúc File Services (Frontend)

```
frontend/src/
├── services/
│   ├── api.js              ← Axios instance (baseURL từ VITE_API_URL)
│   └── menu.service.js     ← menuService.getMenu() → GET /api/menu
├── store/
│   ├── useCartStore.js     ← Cart state management (Zustand)
│   └── useMenuStore.js     ← Menu state + fetch logic (Zustand)
└── hooks/
    └── useMenu.js          ← Filter & sort logic on top of useMenuStore
```

### Thêm Order Service (Backend cần)

Sau khi backend có API, tạo file `frontend/src/services/order.service.js`:

```javascript
import api from "./api";

export const orderService = {
  createOrder: async (payload) => {
    const response = await api.post("/orders", payload);
    return response.data;
  },
};
```

---

## 8. Biến Môi Trường

File `.env` ở thư mục `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Khi deploy production:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 9. HTTP Status Codes Mong Đợi

| Endpoint      | Method | Success | Lỗi thường gặp                                               |
| ------------- | ------ | ------- | ------------------------------------------------------------ |
| `/api/menu`   | GET    | 200     | 500 (server error)                                           |
| `/api/orders` | POST   | 201     | 400 (bad request), 404 (product not found), 409 (table busy) |

---

## 10. Ghi Chú Kỹ Thuật

- **CORS**: Backend cần cho phép `http://localhost:5173` (Vite dev server) trong môi trường development.
- **Format giá**: Frontend format giá hiển thị bằng `.replace(/\B(?=(\d{3})+(?!\d))/g, ".")` — đây chỉ là format hiển thị, **giá lưu và truyền luôn là số nguyên VNĐ**.
- **ID kiểu dữ liệu**: Frontend dùng `===` để so sánh `item.id === product.id`, nên backend cần trả về `id` kiểu `string` nhất quán (không mix `number` và `string`).
- **Ảnh sản phẩm**: Frontend dùng `<img src={item.image} />` trực tiếp — URL ảnh phải là public URL, không cần auth.
