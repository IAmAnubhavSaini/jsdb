function printVersion() {
    console.log("jsdb version 0.0.1");
}

function printLicense() {
    console.log("MIT License");
}

function printAuthor() {
    console.log("Author: Anubhav Saini (@f0c1s)");
}

function printSeparator(rows = 1, cols = 80) {
    console.log();
    for (let r = 0; r < rows; r++) {
        let str = Array(cols).fill("=").join("");
        console.log(str);
    }
    console.log();
}

function printHelp() {
    console.log(".exit : exit the repl");
    console.log(".help : print this help");
    console.log(".version : print version");
    console.log(".license : print license");
    console.log(".author : print author");
}

function startupInfo() {
    printSeparator();
    console.log("Welcome to the jsdb repl!");
    printSeparator();
    printHelp();
    printVersion();
    printLicense();
    printAuthor();
    printSeparator();
}

function prompt() {
    process.stdout.write("db > ");
}

function handleInterrupt() {
    console.log("\nInterrupted. Exiting.\n");
    process.exit(EXIT_SUCCESS);
}

process.on("SIGINT", handleInterrupt);

function handleTerminate() {
    console.log("\nTerminated. Exiting.\n");
    process.exit(EXIT_SUCCESS);
}

process.on("SIGTERM", handleTerminate);

const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;


startupInfo();
prompt();

/**
 * Parse the user input and return the type and value for execution logic
 * @param input {string} the input string from the user
 * @returns {{type: string, value: string}
 */
function parseInput(input) {
    if (input.startsWith("insert ")) {
        return {
            type: "insert", value: input.substring(7)
        }
    }
    if (input.startsWith("select ")) {
        return {
            type: "select", value: input.substring(7)
        }
    }
    if (input.startsWith("update ")) {
        return {
            type: "update", value: input.substring(7)
        }
    }
    if (input.startsWith("delete ")) {
        return {
            type: "delete", value: input.substring(7)
        }
    }
    if (input.startsWith("use ")) {
        return {
            type: "use", value: input.substring(4)
        }
    }
    return {
        type: "unknown", value: input
    }
}

/**
 * Execute the command
 * @param value {{type: string, value: string}} the value to execute
 */
function execute(value) {
    switch (value.type) {
        case "insert":
            console.log("executing [insert]", "[" + value.value + "]");
            break;
        case "select":
            console.log("executing [select]", "[" + value.value + "]");
            break;
        case "update":
            console.log("executing [update]", "[" + value.value + "]");
            break;
        case "delete":
            console.log("executing [delete]", "[" + value.value + "]");
            break;
        case "use":
            console.log("executing [use]", "[" + value.value + "]");
            break;
        case "unknown":
            console.log("unknown command", value.value);
            break;
        default:
            console.log("invalid parse value", value);
    }
}

process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    switch (input) {
        case ".help":
            printHelp();
            break;
        case ".version":
            printVersion();
            break;
        case ".license":
            printLicense();
            break;
        case ".author":
            printAuthor();
            break;
        case ".exit":
            process.exit(EXIT_SUCCESS);
    }
    const value = parseInput(input);
    execute(value);
    prompt();
});
