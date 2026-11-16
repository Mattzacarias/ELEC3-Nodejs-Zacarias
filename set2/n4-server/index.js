/*
 * Full Name: Benedict Matthew O. Zacarias
 * Section: IV-BSIT-A
 * Activity Code: N4: Basic HTTP Server
 * Date: November 16, 2026
 */


const http = require("http");

const PORT = 8000;

const server = http.createServer((req, res) => {
    // Routing base sa hinihinging URL
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Home Page</h1><p>Pangalan: Benedict Matthew O. Zacarias </p><p>Section: IV-BSIT-A </p>");
    } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>About Me</h1><p>Hello! Ako ay isang 4th year BSIT student na nag-aaral ng Node.js.</p>");
    } else if (req.url === "/contact" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Contact</h1><p>Email: 23ln5100@psu.edu.ph</p>");
    } else {
        // 404 para sa hindi kilalang URL
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Page not found</h1><p>Wala ang pahinang hinahanap mo.</p>");
    }
});

server.listen(PORT, () => {
    console.log(`Tumatakbo ang server sa http://localhost:${PORT}`);
});
