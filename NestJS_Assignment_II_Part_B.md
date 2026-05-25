# NestJS Assignment II — Additional Tasks
## Library Management System

---

## Part A: AWS S3 — Book Cover Upload

### AttachmentModule

Create a new `AttachmentModule` with a single endpoint:

- **POST** `/attachments/upload`
  - Accept a **single image file** using `FileInterceptor` and `@UploadedFile()`
  - Upload it to **AWS S3**
  - Return the full **CloudFront URL** of the uploaded file

```json
// Expected Response
{
  "url": "https://your-distribution.cloudfront.net/uploads/book-cover.png"
}
```

---

### Enhance BookModule

- Add `coverImageUrl` field to your **Book** entity
- **POST** `/books` — accept `coverImageUrl` in the request body and save it
- **PATCH** `/books/:id` — allow updating `coverImageUrl`

#### Flow

```
Client uploads image  →  POST /attachments/upload
            ↓
    Returns CloudFront URL
            ↓
Client creates/updates book  →  POST /books  or  PATCH /books/:id
       (passes coverImageUrl in request body)
```

---

### Required `.env` Variables

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET_NAME
AWS_CLOUDFRONT_URL
```

---

## Part B: Email Notification on Book Borrowed

### NotificationModule — NestMailer Integration

- Integrate **@nestjs-modules/mailer** with an SMTP provider (Gmail or Mailtrap)
- Once a book is borrowed inside `BorrowingService`, trigger `NotificationService` to send a **borrowing confirmation email** to the member

---

### Email Must Contain

- Member name
- Member email
- Book title
- Author name
- Borrowed date
- A confirmation message

---

### Example Email

```
Subject: Book Borrowing Confirmation

Hello John,

You have successfully borrowed the book "Clean Code" by Robert C. Martin.

Borrowed on: 2026-05-26

Please return the book on time.

Library Management System
```

---

### Required `.env` Variables

```
MAIL_HOST
MAIL_PORT
MAIL_USER
MAIL_PASS
MAIL_FROM
```

---

## Learning Outcomes

By completing these additional tasks, students will:

- Integrate **AWS S3** for file storage
- Serve uploaded files via **CloudFront CDN**
- Send transactional **email notifications** using NestMailer
- Understand how to **enhance existing modules** with new features
- Write clean, modular, and production-aware NestJS code

---

Good luck!
