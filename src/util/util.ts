import fs from 'fs';
import Jimp = require('jimp');
import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {config} from "../config/config";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async (resolve, reject) => {
        try {
            const photo = await Jimp.read(inputURL);
            const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
            await photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(__dirname + outpath, (img) => {
                    resolve(__dirname + outpath);
                });
        } catch (e) {
            reject('Error processing image');
        }
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

// Middleware to check for a valid web token
export function requireAuth(req: Request, res: Response, next: NextFunction) {

    // If there's no headers or no authorization header, return a 401 response
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({message: 'No authorization headers'});
    }

    // If the authorization is not in the format 'Bearer vdewdeuwdew....', return a 401 response
    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length !== 2){
        return res.status(401).send({message: 'Malformed token.'});
    }

    // Grab the token
    const token = token_bearer[1];

    // Verify the token be way on the configuration environment jwt secret. If it's not valid, send a 500 error, otherwise continue
    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({message: 'Failed to authenticate.'});
        }
        return next();
    });
}
