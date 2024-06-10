
# Project Documentation: Express REST API (JWT + Refresh Token)

## Introduction
This project is a REST API built with Express.js. It includes user authentication, secure routes, and various error handling mechanisms. The API supports the following operations: user signup, login, token refresh, logout, and user data retrieval.

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>

2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables by creating a .env file in the root directory with the following variables:
```env
DATABASE=your_database_url
DATABASE_PASSWORD=your_database_password
NODE_ENV=production
JWT_SECRET=your_secret_key_for_access_token
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_secret_key_for_refresh_token
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```
4. Start the development server:
    ```bash
    npm run dev
    ```
## Postman Collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/16950495-19154515-b725-42e6-9380-fa0f5ce6c154?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D16950495-19154515-b725-42e6-9380-fa0f5ce6c154%26entityType%3Dcollection%26workspaceId%3Dc9d05461-29ee-4605-b1de-763c454a62b8)