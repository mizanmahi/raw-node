const fs = require("fs");
const path = require("path");

// scaffolding
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

// writing data to file
lib.create = (dirName, fileNmae, dataToWrite, callback) => {
  // opening file to write
  fs.open(
    lib.baseDir + dirName + "/" + fileNmae + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (err) {
        callback("Error Opening file, it may already exist!");
        console.log(err);
      } else {
        // writing data to file
        const stringData = JSON.stringify(dataToWrite);
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file!");
              }
            });
          } else {
            callback("Error Writing to new file!");
          }
        });
      }
    }
  );
};

// reading the file
lib.read = (dirName, fileNmae, callback) => {
    // reading the file data
    fs.readFile(lib.baseDir + dirName + "/" + fileNmae + ".json", "utf8", (err, data) => {
        if(!err){
            callback(err, data);
        }
    })
}

// updating the file
lib.update = (dirName, fileNmae, dataToWrite, callback) => {
  // opening file to update
  fs.open(lib.baseDir + dirName + "/" + fileNmae + ".json", "r+", (err, fileDescriptor) => {
    if(!err && fileDescriptor) {
          const stringData = JSON.stringify(dataToWrite);
            // truncating file data
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err){
                    // write new data to file
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err){
                            console.log(`File data of ${fileNmae} has been updated!`);
                        }else{
                            callback("error updating data")
                        }
                    })
                }else{
                    callback("Error truncating the file")
                }
            })
        }else{
            callback("Error Opening file for update, it may not exist yet!")
        }
    })
}

// deleting the file
lib.delete = (dirName, fileNmae, callback) => {
    // deleting the file
    fs.unlink(lib.baseDir + dirName + "/" + fileNmae + ".json", (err) => {
        if(!err){
            console.log(`${fileNmae} file has beed deleted!`);
        }else{
            callback("Error deleting the file")
        }
    })
}

module.exports = lib;
