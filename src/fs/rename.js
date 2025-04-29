// rename.js - implement function that renames file wrongFilename.txt
// to properFilename with extension .md (if there's no file
// wrongFilename.txt or properFilename.md already exists Error
// with message FS operation failed must be thrown)

import { rename as fsRename, access } from "fs/promises";
import { constants } from "fs";
import { join } from "path";

const sourceDir = "src/fs";
const errorMessage = "FS operation failed";
const renameFileName = "wrongFilename.txt";
const correctFileName = "properFilename.md";

const rename = async (fileSrc, correctName) => {
  const wrongFilePath = join(fileSrc, renameFileName);
  const correctFilePath = join(fileSrc, correctName);

  try {
    await access(wrongFilePath, constants.F_OK);

    try {
      await access(correctFilePath, constants.F_OK);
      throw new Error(errorMessage);
    } catch (err) {}

    await fsRename(wrongFilePath, correctFilePath);
  } catch (err) {
    throw new Error(errorMessage);
  }
};

await rename(sourceDir, correctFileName);
