# Tối ưu hóa cho VPS cấu hình thấp (2GB RAM, 2 Core)

Với cấu hình 2GB RAM đang chạy cả Laravel + MySQL + Node.js, bạn **bắt buộc** phải tối ưu để tránh tình trạng "Out of Memory" (OOM) làm sập Web.

---

## 1. Chiến lược "Build ngoài VPS" (Đã cài đặt trong CI/CD)

**Vấn đề:** Lệnh `npm run build` của Frontend (Vite) cực kỳ tốn RAM (có thể vọt lên 1GB+). Nếu chạy lệnh này trên VPS 2GB, nó sẽ làm sập Laravel hoặc MySQL ngay lập tức.

**Giải pháp:**

- Em đã cấu hình GitHub Actions thực hiện việc build Frontend trên server của GitHub.
- Sau đó chỉ đẩy bộ file tĩnh (`dist/`) đã nén sang VPS.
- VPS của bạn không phải làm gì cả, chỉ việc nhận file và chạy.

---

## 2. Dùng chung MySQL (Host) - Bắt buộc

**Vấn đề:** Mỗi instance MySQL cần ít nhất 400MB - 800MB RAM ban đầu.
**Giải pháp:**

- Tuyệt đối không chạy thêm MySQL trong Docker.
- Hãy dùng chung MySQL mà Laravel đang dùng. Tạo thêm 1 Database mới là xong.
- Cấu hình trong `.env`: `DATABASE_URL=mysql://user:pass@172.17.0.1:3306/datban`

---

## 3. Thiết lập Swap File (Phao cứu sinh)

Nếu VPS chưa có Swap, hãy tạo ngay 2GB - 4GB Swap. Swap giúp VPS không bị sập ngay lập tức khi hết RAM thật.

```bash
# Tạo file swap 2GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Lưu lại sau khi reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 4. Giới hạn Resource trong Docker

Hạn chế để container Node.js chiếm quá nhiều RAM. Sửa file `docker-compose.yml`:

```yaml
services:
  backend:
    # ... các config cũ
    deploy:
      resources:
        limits:
          memory: 512M # Chỉ cho phép dùng tối đa 512MB RAM
```

---

## 5. Nginx phục vụ Frontend Tĩnh

Đừng dùng Node.js để serve file Frontend. Hãy để Nginx (rất nhẹ) làm việc này.

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /home/your_user/datban/frontend/dist; # Trỏ thẳng vào thư mục dist

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy tới backend Node.js (Docker)
    location /api {
        proxy_pass http://localhost:3000;
        # ... các config proxy khác
    }
}
```

---

## 6. Dọn dẹp thường xuyên

Mỗi lần build Docker, image cũ vẫn nằm trên disk. Hãy dọn dẹp để tránh đầy ổ cứng:

```bash
docker image prune -f
```

(Lệnh này đã được em thêm vào file CI/CD tự động chạy mỗi lần deploy).
