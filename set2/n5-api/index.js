/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N5: REST-style AP
 * Date: November 16, 2026
 */


const http = require("http");

const PORT = 8000;

// In-memory array na may 3 sample books
let books = [
    { id: 1, title: "Noli Me Tangere", author: "Jose Rizal" },
    { id: 2, title: "El Filibusterismo", author: "Jose Rizal" },
    { id: 3, title: "Mga Ibong Mandaragit", author: "Amado V. Hernandez" }
];

const server = http.createServer((req, res) => {
    const urlParts = req.url.split("/").filter(Boolean); // hal. ['api', 'books', '1']

    // 1. GET /api/books - Kunin lahat ng books
    if (req.url === "/api/books" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(books));
    }

    // 2. GET /api/books/:id - Kunin ang isang book gamit ang ID
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "GET") {
        const id = parseInt(urlParts[2]);
        const book = books.find((b) => b.id === id);
        if (!book) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Hindi mahanap ang book." }));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(book));
    }

    // 3. POST /api/books - Magdagdag ng bagong book
    if (req.url === "/api/books" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const parsed = JSON.parse(body);
                const newBook = {
                    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
                    title: parsed.title,
                    author: parsed.author
                };
                books.push(newBook);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(newBook));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid JSON body." }));
            }
        });
        return;
    }

    // 4. PUT /api/books/:id - I-update ang umiiral na book
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "PUT") {
        const id = parseInt(urlParts[2]);
        const bookIndex = books.findIndex((b) => b.id === id);
        if (bookIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Hindi mahanap ang book." }));
        }

        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const parsed = JSON.parse(body);
                books[bookIndex].title = parsed.title || books[bookIndex].title;
                books[bookIndex].author = parsed.author || books[bookIndex].author;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(books[bookIndex]));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid JSON body." }));
            }
        });
        return;
    }

    // 5. DELETE /api/books/:id - Burahin ang isang book
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "DELETE") {
        const id = parseInt(urlParts[2]);
        const bookIndex = books.findIndex((b) => b.id === id);
        if (bookIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Hindi mahanap ang book." }));
        }
        const deleted = books.splice(bookIndex, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Nabura na ang book.", book: deleted[0] }));
    }

    // Fallback para sa ibang route
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () => {
    console.log(`Books REST API tumatakbo sa http://localhost:${PORT}`);
});
