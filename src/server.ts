import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/filterImageFromURL/", async ( req, res ) => {

    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
          .send(`image url is required`);
    }

    try {
      let local_path = await filterImageFromURL(image_url);
      return res.status(200).sendFile(local_path, () => {deleteLocalFiles([local_path])});
    } catch (e) {
      return res.status(500).send(e);
    }
  } );
  
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
