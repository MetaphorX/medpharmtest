****Description of the Backend Code Workings****


The Consultations API backend is built using Node.js, Express, and MongoDB. It provides endpoints for managing user authentication and consultation records in a health facility. Here's a brief overview of how it works:

1. User Authentication
The authentication system allows users to register, log in, and manage their sessions via JSON Web Tokens (JWT). The authentication flow is handled by the authController.js and routes are defined in authRoutes.js.
Registration: Users can register by providing their name, email, password, and role (either 'officer' or 'patient'). Passwords are hashed before being stored in the database.
Login: Users can log in with their email and password to receive a JWT, which must be included in the header of subsequent requests to access protected endpoints.
Middleware: The authMiddleware.js verifies the JWT and ensures that only authenticated users can access certain routes.

2. Consultation Management
The system allows authorized users (officers) to create, view, and filter consultations. This is managed by the consultationController.js and routes are defined in consultationRoutes.js.
Creating Consultations: Officers can create consultations by providing details such as the patient ID, healthcare provider, consultation type, medical condition, and notes. Each consultation is linked to the officer who created it.
Viewing Consultations: Officers can view all consultations, with the ability to filter results based on criteria like date, patient name, healthcare provider, consultation type, and medical condition.
Consultation Details: Patients can view their specific consultations by ID.

3. Data Models
Two main models are defined using Mongoose:
User Model: Defines the schema for user data, including name, email, password, and role. Passwords are hashed using bcrypt before being stored.
Consultation Model: Defines the schema for consultation records, linking each consultation to a patient and an officer, and including fields for healthcare provider, consultation type, medical condition, and notes.

4. Error Handling
The API uses a consistent error handling mechanism to ensure that clients receive meaningful error messages. Common errors include:
400 Bad Request: Invalid input data.
401 Unauthorized: Missing or invalid authentication token.
403 Forbidden: Access to the resource is forbidden.
404 Not Found: Resource not found.
500 Internal Server Error: Server encountered an unexpected condition.
5. Environment Configuration
Sensitive information and configuration settings, such as the MongoDB URI and JWT secret, are managed using environment variables loaded from a .env file.
