# NestJS Assignment — Additional Tasks

---

## Part 4: AWS S3 — File Upload & Product Image

### AttachmentModule

Create a new `AttachmentModule` with a single endpoint:

- **POST** `/attachments/upload`
  - Accept a **single image file** using `FileInterceptor` and `@UploadedFile()`
  - Upload it to **AWS S3**
  - Return the full **CloudFront URL** of the uploaded file

```json
// Expected Response
{
  "url": "https://your-distribution.cloudfront.net/uploads/image.png"
}
```

---

### Enhance ProductModule

- Add `imageUrl` field to your Product entity
- **POST** `/products` — accept `imageUrl` in the request body and save it
- **PATCH** `/products/:id` — allow updating `imageUrl`

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

## Part 5: Email Notification on Order Placed

### NotificationModule — NestMailer Integration

- Integrate **@nestjs-modules/mailer** with an SMTP provider (Gmail or Mailtrap)
- Once an order is placed inside `OrderService`, trigger `NotificationService` to send a **confirmation email** to the customer

---

### Email Must Contain

- Customer name
- Order ID
- Product name
- A confirmation message

---

### Required `.env` Variables

```
MAIL_HOST
MAIL_PORT
MAIL_USER
MAIL_PASS
MAIL_FROM
```
