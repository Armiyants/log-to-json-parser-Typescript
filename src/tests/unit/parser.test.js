const fs = require("fs");
const { ParserModel } = require("../../models/parser.model");
const parser = new ParserModel();

describe("parseLogToFile function", () => {
  const inputPath = "src/tests/unit/mocks/mock-input.log";
  const outputPath = "src/tests/unit/mocks/mock-output.json";

  it("should parse log file and write error entries to output file", async () => {
    await parser.parseLogToFile(inputPath, outputPath);

    let outputData = fs.readFileSync(outputPath, { encoding: "utf-8" });

    if (outputData.length === 0) {
      console.log(`The file ${outputPath} is empty`);
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(outputData + "]");
    } catch (error) {
      console.error("Error parsing JSON string:", error);
    }

    expect(jsonData).toHaveLength(1);
    expect(jsonData[0]).toHaveProperty("timestamp");
    expect(jsonData[0]).toHaveProperty("loglevel", "error");
    expect(jsonData[0]).toHaveProperty("transactionId");
    expect(jsonData[0]).toHaveProperty("err", "Not found");
  });

  it("should skip empty lines and non-error log entries", async () => {
    const emptyLogFilePath = "src/tests/unit/mocks/mock-empty-input.log";
    const emptyOutputPath = "src/tests/unit/mocks/mock-empty-output.json";
    fs.writeFileSync(emptyLogFilePath, "\n\n\n");

    await parser.parseLogToFile(emptyLogFilePath, emptyOutputPath);

    const outputData = fs.readFileSync(emptyOutputPath, { encoding: "utf-8" });
    if (outputData.length === 0) {
      console.log(`The file ${emptyOutputPath} is empty`);
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(outputData + "]");
    } catch (error) {
      console.error("Error parsing JSON string:", error);
    }

    expect(jsonData).toHaveLength(0);
  });

  it("should log the number of entries written to the console", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await parser.parseLogToFile(inputPath, outputPath);

    expect(consoleSpy).toHaveBeenCalledWith(
      `From ${inputPath} file 1 log entry(ies) was/were written to ${outputPath} file`
    );
  });
});
