import { pathChecker } from "../utils/path-checker.js";
import { extensionChecker } from "../utils/extension-checker.js";
import { ParserModel } from "../models/parser.model.js";

export class ParserController {
  pathIn: string;
  pathOut: string;

  constructor(pathIn: string, pathOut: string) {
    this.pathIn = pathIn;
    this.pathOut = pathOut;
  }

  async main() {
    if (pathChecker(this.pathIn)) {
      const ext = extensionChecker(this.pathOut);
      switch (ext) {
        case "json": {
          const parser = new ParserModel();
          await parser.parseLogToFile(this.pathIn, this.pathOut);
          break;
        }
        default: {
          throw new Error("Unknown extension for the output file");
        }
      }
    }
  }
}
