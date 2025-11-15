# Christmas Gift Request Manager

A full-stack web application for managing Christmas gift requests. Built with React and Spring Boot in a monorepo structure.

## Features

- **Add Gift Requests**: Create new gift requests with person name, item description, and shopping link
- **Edit Requests**: Modify existing gift requests
- **Delete Requests**: Remove gift requests with confirmation
- **Purchase Tracking**: Mark items as purchased with persistent state
- **Shopping Links**: Direct links to shopping sites for easy access

## Tech Stack

### Frontend (React)
- React 19.2
- TypeScript
- Material-UI (Joy UI)
- Vite
- Emotion (CSS-in-JS)

### Backend (Spring Boot)
- Spring Boot 3.2.0
- Spring Web (REST API)
- Spring Data JPA
- H2 Database (in-memory)
- Java 17

## Project Structure

```
christmas/
├── react/              # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── home/
│   │   │       ├── HomePage.tsx
│   │   │       ├── AddItemModal.tsx
│   │   │       ├── EditItemModal.tsx
│   │   │       └── RequestTable.tsx
│   │   └── services/
│   │       └── giftRequestApi.ts
│   └── package.json
└── spring-boot/        # Spring Boot backend
    ├── src/
    │   └── main/
    │       ├── java/com/christmas/app/
    │       │   ├── controller/
    │       │   ├── service/
    │       │   ├── repository/
    │       │   ├── entity/
    │       │   ├── dto/
    │       │   └── exception/
    │       └── resources/
    │           └── application.properties
    └── build.gradle
```

## Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18+** and npm
- Git

### Running the Backend

1. Navigate to the Spring Boot directory:
```bash
cd spring-boot
```

2. Start the Spring Boot application:
```bash
./gradlew bootRun
```

The backend will start on `http://localhost:8080`

**Available Endpoints:**
- `GET /api/gift-requests` - Get all gift requests
- `POST /api/gift-requests` - Create a new gift request
- `PUT /api/gift-requests/{id}` - Update a gift request
- `DELETE /api/gift-requests/{id}` - Delete a gift request
- `PATCH /api/gift-requests/{id}/purchased` - Toggle purchase status
- `GET /h2-console` - H2 Database console (dev only)

### Running the Frontend

1. Navigate to the React directory:
```bash
cd react
```

2. Install dependencies (first time only):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. **Start both servers** (backend and frontend in separate terminals)
2. **Open your browser** to `http://localhost:5173`
3. **Add a gift request** by clicking the "Add" button
4. **Edit requests** by clicking the edit icon in each row
5. **Delete requests** by clicking the delete icon (with confirmation)
6. **Mark as purchased** by checking the checkbox in each row

## Database

The application uses an H2 in-memory database for development. Data will be reset when the backend restarts.

To view the database:
1. Navigate to `http://localhost:8080/h2-console`
2. Use these credentials:
   - JDBC URL: `jdbc:h2:mem:christmasdb`
   - Username: `sa`
   - Password: (leave empty)

## Building for Production

### Backend
```bash
cd spring-boot
./gradlew build
```

The JAR file will be in `build/libs/`

### Frontend
```bash
cd react
npm run build
```

The build output will be in `dist/`

## API Documentation

### GiftRequest Model
```json
{
  "id": 1,
  "personName": "John",
  "itemDescription": "Wireless headphones",
  "shoppingLink": "https://example.com/product",
  "purchased": false,
  "createdAt": "2025-11-14T20:00:00",
  "updatedAt": "2025-11-14T20:00:00"
}
```

### Create/Update Request Body
```json
{
  "personName": "John",
  "itemDescription": "Wireless headphones",
  "shoppingLink": "https://example.com/product"
}
```

## Development

### Backend Development
- Hot reload enabled with Spring Boot DevTools
- H2 console for database inspection
- Proper exception handling with custom error responses
- CORS configured for local development

### Frontend Development
- Vite for fast hot module replacement
- TypeScript for type safety
- Material-UI components for consistent design
- RESTful API integration

## License

This project is for personal/educational use.
