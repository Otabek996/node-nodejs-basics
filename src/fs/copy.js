// copy.js
import { access, constants, mkdir, readdir, copyFile } from "fs/promises";
import path from "path";

const sourceDir = "src/fs/files";
const destinationDir = "src/fs/files_copy";
const errorMessage = "FS operation failed";

async function copy(src, dest) {
  try {
    await access(src, constants.F_OK);
  } catch {
    throw new Error(errorMessage);
  }

  try {
    await access(dest, constants.F_OK);
    throw new Error(errorMessage);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw new Error(errorMessage);
    }
  }

  await mkdir(dest, { recursive: true });

  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copy(srcPath, destPath);
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      await copyFile(srcPath, destPath);
    }
  }
}

await copy(sourceDir, destinationDir);
