/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N6: Middleware and API Testing
 * Date: November 16, 2026
 */



const http = require("http");

const PORT = 8000;

let books = [
    { id: 1, title: "Noli Me Tangere", author: "Jose Rizal" },
    { id: 2, title: "El Filibusterismo", author: "Jose Rizal" },
    { id: 3, title: "Mga Ibong Mandaragit", author: "Amado V. Hernandez" }
];

// Middleware 1: Logger (nagla-log ng method, URL, at date/time sa terminal)
function loggerMiddleware(req, res, next) {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // Ituloy sa susunod na middleware
}

// Middleware 2: JSON Header (nagtatakda ng Content-Type: application/json)
function jsonHeaderMiddleware(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next(); // Ituloy sa route handler
}

// Function para patakbuhin ang listahan ng middlewares nang sunod-sunod
function runMiddlewares(req, res, middlewares, finalHandler) {
    let index = 0;
    function next() {
        if (index < middlewares.length) {
            const current = middlewares[index++];
            current(req, res, next);
        } else {
            finalHandler(req, res);
        }
    }
    next();
}

// Route Handler (hindi na inuulit ang setHeader("Content-Type", "application/json"))
function handleRoutes(req, res) {
    const urlParts = req.url.split("/").filter(Boolean);

    // 1. GET /api/books
    if (req.url === "/api/books" && req.method === "GET") {
        res.statusCode = 200;
        return res.end(JSON.stringify(books));
    }

    // 2. GET /api/books/:id
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "GET") {
        const id = parseInt(urlParts[2]);
        const book = books.find((b) => b.id === id);
        if (!book) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "Hindi mahanap ang book." }));
        }
        res.statusCode = 200;
        return res.end(JSON.stringify(book));
    }

    // 3. POST /api/books
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
                res.statusCode = 201;
                res.end(JSON.stringify(newBook));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Invalid JSON body." }));
            }
        });
        return;
    }

    // 4. PUT /api/books/:id
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "PUT") {
        const id = parseInt(urlParts[2]);
        const bookIndex = books.findIndex((b) => b.id === id);
        if (bookIndex === -1) {
            res.statusCode = 404;
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
                res.statusCode = 200;
                res.end(JSON.stringify(books[bookIndex]));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Invalid JSON body." }));
            }
        });
        return;
    }

    // 5. DELETE /api/books/:id
    if (urlParts[0] === "api" && urlParts[1] === "books" && urlParts[2] && req.method === "DELETE") {
        const id = parseInt(urlParts[2]);
        const bookIndex = books.findIndex((b) => b.id === id);
        if (bookIndex === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "Hindi mahanap ang book." }));
        }
        const deleted = books.splice(bookIndex, 1);
        res.statusCode = 200;
        return res.end(JSON.stringify({ message: "Nabura na ang book.", book: deleted[0] }));
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
}

const server = http.createServer((req, res) => {
    runMiddlewares(req, res, [loggerMiddleware, jsonHeaderMiddleware], handleRoutes);
});

server.listen(PORT, () => {
    console.log(`Books API with Middleware tumatakbo sa http://localhost:${PORT}`);
});
