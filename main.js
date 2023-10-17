// const path = require("path");
// /*
//  * Project: Milestone 1
//  * File Name: main.js
//  * Description:
//  *
//  * Created Date:
//  * Author:
//  *
//  */

// const IOhandler = require("./IOhandler");
// const zipFilePath = path.join(__dirname, "myfile.zip");
// const pathUnzipped = path.join(__dirname, "unzipped");
// const pathProcessed = path.join(__dirname, "grayscaled");
// const unzipper = require("unzipper");
// const fs = require ("fs");


// //step1 read the zip file
// //step2 unzip the zip file
// //step3 read allthe png images from unzipped folder
// // step4 send them to the grayscale filter function
// //step5 after all images have successfully been
//         // grayscaled, show a success message.
// // ALL ERRORS MUST SHOW IN .catch in PROMISES


const path = require("path");
const IOhandler = require("./IOhandler");

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler
  .processImages(zipFilePath, pathUnzipped, pathProcessed)
  .then(() => {
    console.log('Extraction and processing complete');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
