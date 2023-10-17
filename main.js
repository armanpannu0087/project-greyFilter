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


// const path = require("path");
// const IOhandler = require("./IOhandler");

// const zipFilePath = path.join(__dirname, "myfile.zip");
// const pathUnzipped = path.join(__dirname, "unzipped");
// const pathProcessed = path.join(__dirname, "grayscaled");

// IOhandler
//   .processImages(zipFilePath, pathUnzipped, pathProcessed)
//   .then(() => {
//     console.log('Extraction and processing complete');
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });




// const path = require("path");
// const IOhandler = require("./IOhandler");
// const zipFilePath = path.join( "myfile.zip");
// const pathUnzipped = path.join( "unzipped");
// const pathProcessed = path.join( "grayscaled");


// IOhandler.unzip(zipFilePath, pathUnzipped)
//   .then(() => {
//     console.log("ZIP file unzipped successfully.");
//     return IOhandler.readDir(pathUnzipped);
//   })
//   .then((pngFiles) => {
//     console.log("List of PNG files:", pngFiles);
//     pngFiles.forEach((file) => {
//       const inputPath = path.join(pathUnzipped, file);
//       const outputPath = path.join(pathProcessed, file);
//       return IOhandler.grayScale(inputPath, outputPath);
//     });
//   })
//   .then(() => {
//     console.log("Grayscale processing completed for all PNG files.");
//   })
//   .catch((err) => {
//     console.error("An error occurred:", err);
//   });



const path = require("path");
const IOhandler = require("./IOhandler");

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => {
    console.log("ZIP file unzipped successfully.");
    return IOhandler.readDir(pathUnzipped);
  })
  .then((pngFiles) => {
    console.log("List of PNG files:", pngFiles);

    // Create an array of Promises to process each PNG file
    const processingPromises = pngFiles.map((file) => {
      const inputPath = path.join(pathUnzipped, file);
      const outputPath = path.join(pathProcessed, path.basename(file));
      return IOhandler.grayScale(inputPath, outputPath);
    });

    // Use Promise.all to ensure all files are processed before proceeding
    return Promise.all(processingPromises);
  })
  .then(() => {
    console.log("Grayscale processing completed for all PNG files.");
  })
  .catch((err) => {
    console.error("An error occurred:", err);
  });
