# Assets Folder - Media & Resources

Thư mục này chứa tất cả các tài nguyên media cho website CV của DucTV.

## Cấu trúc thư mục

```
assets/
├── images/          # Thư mục chứa hình ảnh
│   ├── avatar.jpg   # Ảnh đại diện (100x100px)
│   ├── hero-bg.jpg  # Ảnh nền hero section
│   ├── portfolio-*.jpg  # Ảnh dự án portfolio
│   └── ...
│
└── music/           # Thư mục chứa tệp âm thanh
    ├── background-music.mp3
    └── ...
```

## Hướng dẫn sử dụng

### 1. **Thêm Ảnh Đại Diện (Avatar)**
- Đặt ảnh vào: `assets/images/avatar.jpg`
- Kích thước khuyến nghị: 100x100px
- Format: JPG, PNG

### 2. **Thêm Ảnh Nền Hero Section**
- Đặt ảnh vào: `assets/images/hero-bg.jpg`
- Kích thước khuyến nghị: 1920x1080px hoặc hơn
- Format: JPG (để tối ưu hóa tốc độ tải)

### 3. **Thêm Ảnh Portfolio**
- Đặt ảnh vào: `assets/images/`
- Đặt tên có ý nghĩa: `portfolio-project1.jpg`, `portfolio-project2.jpg`

### 4. **Thêm Nhạc Nền**
- Đặt tệp nhạc vào: `assets/music/`
- Format hỗ trợ: MP3, WAV, OGG
- Tôi khuyến nghị sử dụng MP3 vì tương thích tốt

## Cập nhật đường dẫn trong HTML

Sau khi thêm tệp, hãy cập nhật các đường dẫn trong `index.html`:

```html
<!-- Ảnh đại diện -->
<img src="assets/images/avatar.jpg" alt="DucTV Avatar" class="avatar">

<!-- Ảnh nền hero section -->
<section class="hero" style="background-image: url('assets/images/hero-bg.jpg');">
```

## Kích thước file khuyến nghị

- **Avatar**: 50KB - 100KB
- **Hero Background**: 200KB - 500KB
- **Music**: 2MB - 5MB

---

Chúc bạn thiết kế portfolio đẹp! 🎨
