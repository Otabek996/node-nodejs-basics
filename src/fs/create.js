// create.js - implement function that creates new file fresh.txt with 
// content I am fresh and young inside of the files folder (if file already 
// exists Error with message FS operation failed must be thrown)

import { writeFile, access } from "fs/promises";
import { constants } from "fs";

const fileName = "src/fs/files/fresh.txt";
const content = "I am fresh and young";
const errorMessage = "FS operation failed";

const create = async (fileName, fileContent, errorMessage) => {
  try {
    await access(fileName, constants.F_OK);
    console.log(errorMessage);
  } catch {
    try {
      await writeFile(fileName, fileContent);
    } catch {
      console.log(errorMessage);
    }
  }
};

await create(fileName, content, errorMessage);
