# Backend Deployment Guide (Docker + VPS)

Hướng dẫn deploy bộ Backend (Node.js + Prisma) bằng Docker lên VPS đã có sẵn Laravel/MySQL.

---

## 1. Kết nối Database MySQL hiện có (Host)

Vì bạn đã có MySQL cho Laravel, hãy tận dụng nó để tiết kiệm RAM.

1. **Tạo Database**: Login vào MySQL trên VPS và chạy `CREATE DATABASE datban;`.
2. **Cấu hình .env**: Trong `backend/.env`, dùng IP của Docker Host (thường là `172.17.0.1`):
   `DATABASE_URL=mysql://user:pass@172.17.0.1:3306/datban`

---

## 2. Deploy Backend với Docker Compose

File `docker-compose.yml` ở root của bạn:

```yaml
services:
  backend:
    build: ./backend
    container_name: datban-backend
    restart: always
    ports:
      - "3000:3000" # Map ra port 3000 của VPS
    env_file:
      - ./backend/.env
    deploy:
      resources:
        limits:
          memory: 512M # Giới hạn RAM cho 2GB VPS
```

Lệnh chạy tay:

```bash
docker compose up -d --build backend
```

---

## 3. Cấu hình Nginx (Backend Proxy)

Vì Frontend đã deploy trước đó, bạn cần trỏ API request của domain backend đến port 3000.

```nginx
server {
    listen 80;
    server_name api.datban.com; # Domain cho backend

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Cho phép upload file (nếu có dùng Cloudinary/Multer)
        client_max_body_size 10M;
    }
}
```

---

## 4. CI/CD Tự động

Mọi thứ đã được cấu hình trong file `.github/workflows/ci.yml`. Khi bạn push code backend lên nhánh `main`, GitHub sẽ:

1. Kiểm tra lỗi (lint, prisma generate).
2. SSH vào VPS và tự động `docker compose up -d --build backend`.
3. Dọn dẹp image cũ để tránh đầy ổ cứng.
