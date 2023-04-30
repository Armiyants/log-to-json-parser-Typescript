import fs from "fs";

export function pathChecker(filePath): boolean {
    if (fs.existsSync(filePath)) {
        return true;
    } else {
        throw new Error("Filepath do not exist");
    }
}
