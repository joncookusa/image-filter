# Image Filtering Microservice

### Functionality

This project is a service that contains an endpoint which accepts a URL that includes a query parameter referencing a publicly
available image. The service will take the image and process it into black and white and resize it to 256px x 256px.

### Installing

To install the Microservice, you will need to ensure that git is installed on your computer. If you don't have git, follow the instructions at...

    https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Once git is installed, open a command line or terminal window and navigate to a folder where you want to install the project. Then clone the project by entering...

    https://github.com/joncookusa/image-filter.git

Once the project has been copied to your install folder, run ...

    npm install
    
You will also need to configure an environment variable for the web token. On a MAC, this can be done by entering ...

    export SECRET=MyS3cret
    
... and then run ...

    npm run dev
    
... to start the server locally. 

### Postman Requests

Once the server is running, you can try out the microservice by sending a request to ...

    http://localhost:8082/filterImageFromURL?image_url=[PUBLIC IMAGE URL]
    
IMPORTANT: Public requests have been prohibited which was done as a part of a learning exercise on how to use
web tokens. Therefore, included in your request headers, you will need to send the following web token in the AUTHORIZATION
header.
    
    AUTHORIZATION : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gQ29vayIsImlhdCI6MTUxNjIzOTAyMn0.bp7nQ5Wi1CxfC-NmyfGIAUR7awMW1U8OmTZNAH-Q8bQ
    
Sending the request should return your filtered image in the body of the response.

### Dependencies

The microservice is built using Node / NPM with Express.

### Credits

The starter code was provided by Udacity as a learning project to show how to use Express endpoints, and the use of web tokens
along with deployment to AWS Elastic Beanstalk. Code for the requireAuth web token auth check was largely lifted
straight from the accompanying course material.
    


