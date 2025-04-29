// delete.js - implement function that deletes file fileToRemove.txt
// (if there's no file fileToRemove.txt Error with message FS
// operation failed must be thrown)

import { access, unlink } from "fs/promises";
import { constants } from "fs";
import { join } from "path";

const sourceDir = "src/fs";
const deleteFileName = "fileToRemove.txt";
const errorMessage = "FS operation failed";

const remove = async (src, fileName) => {
  const filePath = join(sourceDir, deleteFileName);

  try {
    await access(filePath, constants.F_OK);
  } catch (err) {
    throw new Error(errorMessage);
  }

  try {
    await unlink(filePath);

    throw new Error(errorMessage);
  } catch (err) {}
};

await remove(sourceDir, deleteFileName);
