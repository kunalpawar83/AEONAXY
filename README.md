User endpoints

    -POST/user/Registration this endpoint to create a new user and send a token.
    -POST//user/login login endpoint.
    -GET/user this endpoint to fetch data from the database and show.
    -PUT/user this endpoint to update the user profile and this endpoint takes the user ID.
    -PUT/user/buy/<courseID> This endpoint takes the course ID and checks it if the user has already not bought it then it buys it. 


Couser endpoints

    -GET/course this endpoint to fetch data from the database and filter option added in this route.
    -POST/course this endpoint to create a new course and only superadmin access this route.
    -PUT/course this endpoint to update the course data and only superadmin performs this operation.
    -DELETE/course this endpoint to delete the course and only superadmin access this route.

