//script to auto copy dist folder to angularjs app!

const fse = require("fs-extra");

const srcDir = `./dist`;
const destDir = `../app//js/dist`;

try {
  fse.rmdirSync(destDir, { recursive: true });

  console.log(`${destDir} is deleted!`);
} catch (err) {
  console.error(`Error while deleting ${destDir}.`);
}

// To copy a folder or file
fse.copy(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Success copied build files to angularjs app!!");
  }
});
