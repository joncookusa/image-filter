import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, requireAuth} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Filter image endpoint with restricted endpoint
  app.get("/filterImageFromURL/", requireAuth,
      async (req, res) => {

        // Use deconstruction to gran the query parameter for the image
        let {image_url} = req.query;

        // If their is no query parameter, return a 400 http response
        if (!image_url) {
          return res.status(400)
              .send(`image url is required`);
        }

        // Filter the image from the URL. If successful, return a 200 response along with the new image.
        // If for what ever reason, it doesn't work, send a 500 error.
        try {
          let local_path = await filterImageFromURL(image_url);
          return res.status(200).sendFile(local_path, () => {
            // Once the send file has been completed, delete the local copy of the image
            deleteLocalFiles([local_path])
          });
        } catch (e) {
          return res.status(500).send(e);
        }
      }
  );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
