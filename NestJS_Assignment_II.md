# Assignment: Library Management System API
## (NestJS + PostgreSQL)

---

## Objective

Build a backend API for a **Library Management System** using:

- NestJS
- PostgreSQL
- TypeORM

The goal is to implement:

- CRUD operations
- One-to-One, One-to-Many, Many-to-Many relationships

---

## Modules to Create

- Member
- Book
- Author
- MembershipCard
- Borrowing

---

## Database Relationships

### One-to-One
- One **Member** has one **MembershipCard**

### One-to-Many
- One **Author** can write many **Books**

### Many-to-Many
- Members can borrow many Books
- Books can be borrowed by many Members
- (Use a **Borrowing** table)

---

## Database Schema

### members
| Column     | Type     |
|------------|----------|
| id (PK)    | int      |
| name       | varchar  |
| email      | varchar  |
| created_at | datetime |

### membership_cards
| Column      | Type     |
|-------------|----------|
| id (PK)     | int      |
| member_id   | int      |
| card_number | varchar  |
| issued_at   | datetime |

### authors
| Column     | Type     |
|------------|----------|
| id (PK)    | int      |
| name       | varchar  |
| created_at | datetime |

### books
| Column         | Type    |
|----------------|---------|
| id (PK)        | int     |
| title          | varchar |
| published_year | int     |
| author_id (FK) | int     |

### borrowings
| Column      | Type     |
|-------------|----------|
| member_id (FK) | int   |
| book_id (FK)   | int   |
| borrowed_at    | datetime |

---

## Requirements

### Member
- Create member
- Get all members
- Get single member

### Membership Card (1-1)
- Issue card to a member
- Get card by member

### Author
- Create author
- Get all authors

### Book
- Create book with author
- Get all books
- Get book with author

### Borrowing (Many-to-Many)
- Borrow a book

---

Good luck!
