# NestJS Assignment (TypeScript)

## Mini E-Commerce Backend

### 📦 Modules
- UserModule
- ProductModule
- OrderModule
- NotificationModule

---

## Part 1: Intramodular Dependency (Within Same Module)

### Module: Users

#### Requirements
- **POST**: Create User  
  - Fields: `name`, `email`, `phone`

- **GET**: Get User By ID

- **PATCH**: Update User

#### Note
- Use **Validation Pipes**
- Use **DTOs**
- Use **@Param() decorator**
- Follow the concepts covered in class

---

## Part 2: Intermodular Dependency (Across Modules)

### Module Flow
```
Product → Order
```

### Product Module
- **GET**: `getProductById`

### Order Module
- **POST**: `createOrder(product_id: string)`

#### Instruction
- `OrderService` must depend on `ProductService`
- Export `ProductService` from `ProductModule`
- Import `ProductModule` into `OrderModule`

---

## Part 3: Circular Dependency

### Modules
```
Order ↔ Notification
```

### OrderService
- Depends on `NotificationService`
- **GET**: `placedOrder(id: string)`
  - When `id` is received:
    - Process order logic (dummy logic is acceptable)
    - Call `NotificationService` to send a **payment notification**

---

### NotificationService
- Depends on `OrderService`
- **GET**: `sendOrderNotification(orderId: string)`
  - Fetch order details from `OrderService`
  - Send **order confirmation notification**

---

## ⚠️ Important
- This setup creates a **circular dependency**
- Resolve it using:
  - `forwardRef()` in modules
  - `@Inject(forwardRef(() => Service))` in services

---

## 🎯 Learning Outcomes
- Understand **Dependency Injection** in NestJS
- Implement **Intramodular Dependencies**
- Implement **Intermodular Dependencies**
- Handle **Circular Dependencies**
- Write clean, modular, and testable code
