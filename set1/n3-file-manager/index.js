/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N3: File Manager with fs and path
 * Date: November 16, 2026
 */




const fs = require("fs");
const path = require("path");

// Laging itatago ang mga file sa 'files' subfolder gamit ang path.join()
const filesDir = path.join(__dirname, "files");

// Siguraduhing umiiral ang files folder
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

const command = process.argv[2];
const fileName = process.argv[3];
const textContent = process.argv.slice(4).join(" ");

// Helper para buuin ang path ng target file
function getFilePath(name) {
    return path.join(filesDir, name);
}

if (command === "create") {
    if (!fileName) {
        console.log("Error: Maglagay ng file name.");
        process.exit(1);
    }
    const targetPath = getFilePath(fileName);
    fs.writeFileSync(targetPath, textContent || "", "utf-8");
    console.log(`Nagawa na ang file: ${fileName}`);

} else if (command === "read") {
    if (!fileName) {
        console.log("Error: Maglagay ng file name.");
        process.exit(1);
    }
    const targetPath = getFilePath(fileName);
    if (!fs.existsSync(targetPath)) {
        console.error(`Error: Hindi mahanap ang file na '${fileName}'.`);
    } else {
        const data = fs.readFileSync(targetPath, "utf-8");
        console.log(`--- Laman ng ${fileName} ---`);
        console.log(data);
    }

} else if (command === "update") {
    if (!fileName) {
        console.log("Error: Maglagay ng file name.");
        process.exit(1);
    }
    const targetPath = getFilePath(fileName);
    if (!fs.existsSync(targetPath)) {
        console.error(`Error: Hindi mahanap ang file na '${fileName}' para ma-update.`);
    } else {
        fs.appendFileSync(targetPath, "\n" + (textContent || ""), "utf-8");
        console.log(`Na-update na ang file: ${fileName}`);
    }

} else if (command === "delete") {
    if (!fileName) {
        console.log("Error: Maglagay ng file name.");
        process.exit(1);
    }
    const targetPath = getFilePath(fileName);
    if (!fs.existsSync(targetPath)) {
        console.error(`Error: Hindi mahanap ang file na '${fileName}' para mabura.`);
    } else {
        fs.unlinkSync(targetPath);
        console.log(`Nabura na ang file: ${fileName}`);
    }

} else if (command === "list") {
    const items = fs.readdirSync(filesDir);
    if (items.length === 0) {
        console.log("Walang laman ang files folder.");
    } else {
        console.log("--- MGA FILE SA LOOB NG 'files' FOLDER ---");
        items.forEach((item) => {
            const fullPath = getFilePath(item);
            const base = path.basename(fullPath);
            const ext = path.extname(fullPath);
            const content = fs.readFileSync(fullPath, "utf-8");
            console.log(`Full Path: ${fullPath}`);
            console.log(`File Name: ${base} | Extension: ${ext}`);
            console.log(`Contents : ${content}`);
            console.log("------------------------------------------");
        });
    }

} else {
    console.log("Mga Command:");
    console.log("  node index.js create <file.txt> <text>");
    console.log("  node index.js read <file.txt>");
    console.log("  node index.js update <file.txt> <text>");
    console.log("  node index.js delete <file.txt>");
    console.log("  node index.js list");
}
