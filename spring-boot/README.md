# Christmas App - Spring Boot Backend

A Spring Boot backend application for the Christmas monorepo.

## Prerequisites

- Java 17 or higher
- Gradle (included via wrapper)

## Project Structure

```
spring-boot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/christmas/app/
│   │   │       ├── ChristmasApplication.java
│   │   │       └── controller/
│   │   │           └── HealthController.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/christmas/app/
│               └── ChristmasApplicationTests.java
├── build.gradle
├── settings.gradle
└── gradlew
```

## Running the Application

### Development Mode

```bash
./gradlew bootRun
```

The application will start on `http://localhost:8080`

### Build

```bash
./gradlew build
```

### Run Tests

```bash
./gradlew test
```

## Available Endpoints

- `GET /api/health` - Health check endpoint
- `GET /h2-console` - H2 database console (development only)

## Database

The application uses an in-memory H2 database for development. You can access the H2 console at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:christmasdb`
- Username: `sa`
- Password: (leave empty)

## Technology Stack

- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- H2 Database
- Gradle 8.5
- Java 17
