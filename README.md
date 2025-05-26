# NestJS Employee & User Auth API

A REST API built with NestJS featuring:
- **Employee CRUD operations** (Day 1)
- **User authentication & role-based access** (Day 2)

## Features

### Day 1: Employee Management
- ✅ CRUD operations for employees
- ✅ Get highest-paid employee
- ✅ Request validation using `class-validator`
- ✅ Swagger documentation
- ✅ Static data serving

### Day 2: User Authentication
- ✅ User sign-up/sign-in (JWT)
- ✅ Protected `/my-profile` endpoint
- ✅ Admin-only `/users/all` endpoint
- ✅ Role-based access with `@Role()` decorator
- ✅ Mongoose schema with validations:
  - Email (unique)
  - Password (min 8, alphanumeric)
  - Mobile (11 chars, starts with 01)
  - Age (16-60)
  - Role (`admin` or `normal`)

## Setup

1. Install dependencies:
   ```
   npm install


Configure environment variables (create .env):
    ```
    DATABASE_URI=mongodb://localhost:27017/nest-api
    JWT_SECRET=your_jwt_secret_here```

Run the app:
    ```
    npm run start:dev```

### API Documentation

Access Swagger UI at: http://localhost:3000/api-docs
![image](https://github.com/user-attachments/assets/2aa557d5-ef84-41f8-af56-e556e7c6b095)


## Endpoints

### Employee Routes (Day 1)
| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/employees`            | List all employees              |
| GET    | `/employees/highest-paid` | Get highest-paid employee     |
| POST   | `/employees`            | Add new employee                |

### User Routes (Day 2)
| Method | Endpoint               | Access     | Description                          |
|--------|------------------------|------------|--------------------------------------|
| POST   | `/users/sign-up`       | Public     | Register new user                    |
| POST   | `/users/sign-in`       | Public     | Login                                |
| GET    | `/users/my-profile`    | Protected  | Get current user's profile           |
| GET    | `/users/all`           | Admin only | List all users (excluding self)      |

## Validation Rules
- **Password**:  
  - Minimum 8 characters  
  - Alphanumeric (letters + numbers)  
- **Mobile Number**:  
  - Exactly 11 digits  
  - Must start with `01`  
- **Age**:  
  - Between 16 and 60 (inclusive)  
- **Email**:  
  - Unique in database  
  - Valid email format (e.g., `user@example.com`)  
