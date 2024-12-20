# Bingo Blogs

Bingo Blogs is a robust backend service for a modern blog site, designed to provide a seamless blogging experience. It supports features like user authentication, blog management, and robust API endpoints for developers to interact with the platform.

## 🌐 Live URL
Access the live backend here: [Bingo Blogs API](https://bingo-blogs.vercel.app)

---

## 🚀 Features
- **User Authentication:** Secure signup, login, and JWT-based authentication.
- **Blog Management:** CRUD operations for blogs.
- **Role-Based Access Control:** Admins and users have different levels of access.
- **Search Functionality:** Search blogs by title or content.
- **Optimized API Endpoints:** High performance with scalable design.

---

## 🛠️ Technology Used
- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT) with role-based access
- **Language**: TypeScript  
- **Environment Variables:** dotenv for secure configurations
- **Deployment:** Hosted on [Vercel] 


---

## 📝 API Documentation
Here's the revised API documentation with the requested formatting:

---

## API Documentation

### 1. Authentication

#### 1.1 Register User  
**POST** `/api/auth/register`  
**Description:** Registers a new user with the platform.  

**Request Body:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**  
```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

---

#### 1.2 Login User  
**POST** `/api/auth/login`  
**Description:** Authenticates a user with their email and password and generates a JWT token.  

**Request Body:**  
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**  
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

---

### 2. Blog Management

#### 2.1 Create Blog  
**POST** `/api/blogs`  
**Description:** Allows a logged-in user to create a blog.  

**Request Header:** `Authorization: Bearer <token>`  

**Request Body:**  
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**  
```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

---

#### 2.2 Update Blog  
**PATCH** `/api/blogs/:id`  
**Description:** Allows a logged-in user to update their blog.  

**Request Header:** `Authorization: Bearer <token>`  

**Request Body:**  
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**  
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

---

#### 2.3 Delete Blog  
**DELETE** `/api/blogs/:id`  
**Description:** Allows a logged-in user to delete their blog.  

**Request Header:** `Authorization: Bearer <token>`  

**Response:**  
```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

---

#### 2.4 Get All Blogs (Public)  
**GET** `/api/blogs`  
**Description:** Fetch all blogs with options for searching, sorting, and filtering.  

**Query Parameters:**  
- `search`: Search by title or content.  
- `sortBy`: Sort by fields like `createdAt`.  
- `sortOrder`: Sorting order, `asc` or `desc`.  
- `filter`: Filter by author ID.  

**Response:**  
```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

---

### 3. Admin Actions

#### 3.1 Block User  
**PATCH** `/api/admin/users/:userId/block`  
**Description:** Allows an admin to block a user.  

**Request Header:** `Authorization: Bearer <admin_token>`  

**Response:**  
```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

---

#### 3.2 Delete Blog  
**DELETE** `/api/admin/blogs/:id`  
**Description:** Allows an admin to delete any blog.  

**Request Header:** `Authorization: Bearer <admin_token>`  

**Response:**  
```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```




## 🖥️ Installation & Setup

### Prerequisites
- **Node.js**: Version 16 or above
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Fahmudul/Bingo-Blogs.git
   cd Bingo-Blogs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=5000
     NODE_ENV=development
     DATABASE_URL=your-mongodb-connection-string
     JWT_ACCESS_SECRET=your-secret-key
     JWT_ACCESS_EXPIRITY=time
     
     ```

4. **Start the Server**
   - For development:
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm run build
     ```

5. **Access the API**
   - The backend will run at `http://localhost:5000` by default.

---

## 🧪 Running Tests
Run automated tests to ensure the application is working correctly:
```bash
npm test
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository
2. Create a new branch
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature-name
   ```
5. Create a pull request

---

## 💡 Future Enhancements
- Add support for image uploads in blogs.
- Implement advanced analytics for user activity.
- Enable social media integrations.
- Add multi-language support.

---

## 📬 Contact
For any queries or feedback, feel free to reach out:
- **Author:** Fahmudul Hassan Siam
- **GitHub:** [Fahmudul](https://github.com/Fahmudul)

