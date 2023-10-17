/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const { dir } = require("console");

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve,reject)=> {
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({path:pathOut}))
    .on("close", () => resolve())
    .on("error", (err) => reject(err));
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
// const readDir = (dir) => {
//   return new Promise((resolve,reject)=>{
//     fs.readdir(dir,(err,files)=>{
//       if(err){
//         reject(err);
//       } else{
//         const pngFiles = files.filter((file)=> path.extname(file).toLowerCase() === '.png');
//         resolve (pngFiles.map((file) => path.join(dir,file)));
//       }
//     });
//   });
// };

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === '.png');
        resolve(pngFiles.map((file) => path.join(dir, file)));
      }
    });
  });
};



// {
//   const pngFiles = files.filter((file)=> path.extname(file).toLowerCase() === '.png');
//   resolve (pngFiles.map((file) => path.join(dir,file)));
// }
/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve,reject)=>{
    const inputStream = fs.createReadStream(pathIn);
    const outputStream = fs.createWriteStream(pathOut);

    inputStream
    .pipe(new PNG())
    .on('parsed' , function(){
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const gray = Math.round(
            0.2989 * this.data[idx] +
            0.5870 * this.data[idx + 1] +
            0.1140 * this.data[idx + 2]
          );
          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray;
        }
      }
      this.pack().pipe(outputStream);
    })
    .on('end', ()=>resolve())
    .on('error', (err)=>reject(err));
  })
};

/**
//  * Description: Process images in the zip file, extracting and applying the grayscale filter to each image, then display a success message
//  *
//  * @param {string} zipPath
//  * @param {string} outputPathUnzipped
//  * @param {string} outputPathProcessed
//  * @return {promise}
//  */


module.exports = {
  unzip,
  readDir,
  grayScale,
};
// const processImages = (zipPath, outputPathUnzipped, outputPathProcessed) => {
//   return unzip(zipPath, outputPathUnzipped)
//     .then(() => readDir(outputPathUnzipped))
//     .then((pngFiles) => {
//       const processingPromises = pngFiles.map((filePath) => {
//         const outputFilePath = path.join(outputPathProcessed, path.basename(filePath));
//         return grayScale(filePath, outputFilePath);
//       });
//       return Promise.all(processingPromises);
//     });
// };


// module.exports = {
//   processImages
//   grayScale

// };


// /**
//  * Description: Read in png file by given pathIn,
//  * convert to grayscale, and write to given pathOut
//  *
//  * @param {string} pathIn
//  * @param {string} pathOut
//  */
// const grayScale = (pathIn, pathOut) => {


//   const readStream = createReadStream(pathIn);
//   const writeStream = createWriteStream(pathOut);

//   readStream
//     .pipe(new PNG())
//     .on("parsed", function () {
//       handleGrayScale(this); 
//       this.pack().pipe(writeStream);
//     })
//     .on("error", (err) => {
//       console.error("An error occurred:", err);
//       throw err; // Re-throw the error for downstream handling
//     });

// };




// module.exports = {
//   unzip,
//   readDir,
//   grayScale,
// };
