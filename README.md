The goal of this project was to develop a robust backend API for an e-learning platform. The API facilitated user registration, user profile management, and course management (including CRUD operations for superadmin), and, the courses API implemented filtering to enhance user experience. The backend is created using node.js and express.js data is stored in MongoDB

User endpoints

    -POST/user/Registration this endpoint to create a new user and send a token.
    -POST//user/login login endpoint.
    -GET/user this endpoint to fetch data from the database and show.
    -PUT/user this endpoint to update the user profile and this endpoint takes the user ID.

Couser endpoints

    -GET/course this endpoint to fetch data form database and filter option added in this route.
    -POST/course this endpoint to create a new couser and only superadmin access this route.
    -PUT/course this endpoint to update the course data and only superadmin perform this operation.
    -DELETE/course this endpoint to delete the course and only superadmin access this route.

