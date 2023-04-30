import * as fs from "fs";
import * as readline from "readline";
import { OutputData } from "../data/output.data";

export class ParserModel {
  async parseLogToFile(inputPath: string, outputPath: string): Promise<void> {
    const readStream = fs.createReadStream(inputPath, { encoding: "utf-8" });
    const writeStream = fs.createWriteStream(outputPath, {
      encoding: "utf-8",
    });

    const lineReader = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    let isFirstEntry = true;
    let entriesCount = 0;

    writeStream.write("[");

    for await (const line of lineReader) {
      if (line.trim() === "") {
        continue;
      }

      const splittedLogLine: string[] = line.trim().split(" - ");
      if (splittedLogLine.length > 3) {
        for (let i = 3; i < splittedLogLine.length; ++i) {
          splittedLogLine[2] += " - " + splittedLogLine[i];
        }
      }

      const ISODate = splittedLogLine[0];
      const loglevel = splittedLogLine[1];
      const messageParts = splittedLogLine[2];

      if (messageParts.trim() !== "") {
        const { transactionId, err } = JSON.parse(messageParts);
        const timestamp = new Date(ISODate).getTime();

        const entry: OutputData = {
          timestamp,
          loglevel,
          transactionId,
          err,
        } as any;

        switch (loglevel) {
          case "error":
            if (!isFirstEntry) {
              writeStream.write(",");
            } else {
              isFirstEntry = false;
            }

            writeStream.write(JSON.stringify(entry));
            entriesCount++;
            break;
          default:
            break;
        }
      }
    }

    writeStream.write("] ");
    console.log(
      `From ${inputPath} file ${entriesCount} log entry(ies) was/were written to ${outputPath} file`
    );
  }
}
