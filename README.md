# Restaurant CRUD App

A full featured Restaurant Management application that supports CRUD operations using **Node.js**, **Prisma**, and **PostgreSQL**. This app allows users to manage restaurant data effectively, including creating, reading, updating, and deleting restaurant records.

---

## Features

- **Create**: Add new restaurants with details such as name, contact info, and address.
- **Read**: View all restaurants or fetch details of a specific restaurant.
- **Update**: Edit restaurant details dynamically.
- **Delete**: Remove restaurants from the system.
- **Error Handling**: Robust error handling for smoother operations.
- **Scalable Architecture**: Built using a repository pattern to enhance maintainability and scalability.

---

## Tech Stack

- **Backend**: Node.js, Express.js, Typescript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Architecture**: Repository Pattern

---

## Installation

### Prerequisites

- **Node.js** (>=14.x)
- **PostgreSQL** (>=12.x)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/restaurant-crud-app.git
   cd restaurant-crud-app
   ```

2. **Install Dependencies**
   Install all the required dependencies using `npm` or `yarn`:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root of the project and configure your database connection:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/restaurant_db"
   ```
   Replace `username`, `password`, and `restaurant_db` with your PostgreSQL credentials and database name.

4. **Run Database Migrations**
   Initialize the database and apply migrations using Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**
   Launch the application in development mode:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the Application**
   Open your browser or API client and navigate to `http://localhost:3000` to interact with the application.
