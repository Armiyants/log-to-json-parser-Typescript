import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers"; //a shorthand for process.argv.slice(2)

import { ParserController } from "./controllers/parser.controller.js";

function main(): void {
    const asyncArgv = yargs(hideBin(process.argv)).options({
        input: {
            type: "string",
            description: "Provide input filepath",
            demandOption: true,
        },
        output: {
            type: "string",
            description: "Provide output filepath",
            demandOption: true,
        },
    });

    (async () => {
        const argv = await asyncArgv.argv;
        const parser = new ParserController(argv.input, argv.output);
        await parser.main();
    })();
}

main();
