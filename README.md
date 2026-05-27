# Create Tailwind Docs CLI 🚀

Công cụ dòng lệnh (CLI) giúp khởi tạo nhanh một file template tài liệu (Documentation Template) tuyệt đẹp, hiện đại bằng **HTML** và **Tailwind CSS CDN**. Template này được thiết kế tối ưu, có sẵn chế độ Sáng/Tối (Light/Dark mode), mục lục động (Table of Contents), responsive đầy đủ và có các block mẫu kèm thẻ chú thích giúp **AI Agent** dễ dàng điền dữ liệu tự động.

---

## 💻 Cách sử dụng

### 1. Sử dụng tức thì qua NPX (Không cần cài đặt)

Di chuyển đến thư mục dự án của bạn và chạy lệnh sau:

```bash
npx create-tailwind-docs
```

Lệnh này sẽ tạo ra một file `index.html` trong thư mục hiện tại của bạn.

### 2. Tạo với tên file tùy chỉnh

Nếu bạn muốn đặt tên file khác thay vì `index.html`:

```bash
npx create-tailwind-docs my-docs.html
```

---

## 🤖 Hướng dẫn tích hợp với AI Agent

Template này được chèn sẵn các comment mốc định danh (Anchor Comments). Bạn có thể cấu hình Prompt cho AI Agent của mình tìm các mốc này để điền dữ liệu tự động:

### 1. Thêm liên kết vào Sidebar (Menu bên trái)
AI sẽ chèn các liên kết điều hướng vào giữa hai thẻ comment sau:
```html
<!-- AI_AGENT:SIDEBAR_NAVIGATION_START -->
<!-- Nội dung sidebar do AI tự tạo sẽ nằm ở đây -->
<!-- AI_AGENT:SIDEBAR_NAVIGATION_END -->
```

### 2. Thêm nội dung chi tiết (Cột giữa)
AI sẽ chèn các thẻ `<section id="id-cua-ban">` vào bên dưới thẻ:
```html
<!-- AI_AGENT:MAIN_CONTENT_START -->
<!-- Các khối tài liệu, bảng biểu, code do AI tự tạo nằm ở đây -->
<!-- AI_AGENT:MAIN_CONTENT_END -->
```

*Lưu ý:* Các AI agent có thể tham khảo trực tiếp cấu trúc HTML của các **Block UI mẫu** (Alert, Code block, Table, Steps, Cards) đã được viết sẵn trong file để sao chép chuẩn class Tailwind CSS.

---

## 📦 Hướng dẫn đẩy lên GitHub & Publish NPM OSS

### 1. Đưa lên GitHub & Bật Web chạy thử (GitHub Pages)

1. Tạo một Repository mới trên GitHub.
2. Khởi tạo Git cục bộ trong thư mục chứa code và đẩy lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL-REPO-CUA-BAN>
   git push -u origin main
   ```
3. Truy cập vào GitHub Repo của bạn trên trình duyệt -> Chọn **Settings** -> **Pages**.
4. Tại mục **Build and deployment** -> **Source**: Chọn `Deploy from a branch`.
5. Tại mục **Branch**: Chọn `main` (hoặc `/root`) -> Nhấn **Save**.
6. Sau 1-2 phút, GitHub sẽ cấp cho bạn một đường link HTTPS để mọi người có thể xem giao diện trực tuyến.

### 2. Phát hành lên NPM dưới dạng Package mã nguồn mở (OSS)

Để bất cứ ai cũng có thể chạy lệnh `npx <ten-package-cua-ban>` để cài đặt, bạn làm như sau:

1. Đăng ký tài khoản trên trang chủ [npmjs.com](https://www.npmjs.com/).
2. Mở terminal tại thư mục dự án và đăng nhập:
   ```bash
   npm login
   ```
   *(Làm theo hướng dẫn trên màn hình để nhập tài khoản/mật khẩu/OTP)*
3. Đổi tên package trong file `package.json` ở trường `"name"` thành tên độc nhất (ví dụ: `create-yourname-docs`).
4. Xuất bản package lên NPM:
   ```bash
   npm publish --access public
   ```
5. Kể từ lúc này, mọi người đã có thể khởi tạo file docs bằng lệnh:
   ```bash
   npx <ten-package-cua-ban>
   ```

---

## 🎨 Các tính năng giao diện có sẵn

- **Dark Mode**: Nhớ trạng thái lựa chọn qua `localStorage`.
- **Responsive Navigation**: Menu Hamburger trên mobile, tự động ẩn cột TOC bên phải ở màn hình nhỏ.
- **Copy Code**: Nút copy hoạt động mượt mà cho mọi khối code.
- **Table of Contents (TOC)**: Tự động quét các thẻ tiêu đề của bài viết để sinh mục lục bên phải, tự động highlight link khi cuộn trang (ScrollSpy).
