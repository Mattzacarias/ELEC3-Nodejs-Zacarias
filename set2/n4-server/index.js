/*
 * Full Name: [Your Full Name]
 * Section: [IV-BSIT A/B/C]
 * Activity Code: N4 - Basic HTTP Server
 * Date: December 2026
 */

const http = require("http");

const PORT = 8000;

const server = http.createServer((req, res) => {
    // Routing base sa hinihinging URL
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Home Page</h1><p>Pangalan: [Your Full Name]</p><p>Section: [IV-BSIT A/B/C]</p>");
    } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>About Me</h1><p>Ako ay isang 4th year BSIT student na nag-aaral ng Node.js.</p>");
    } else if (req.url === "/contact" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Contact</h1><p>Email: student@example.com</p>");
    } else {
        // 404 para sa hindi kilalang URL
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Page not found</h1><p>Wala ang pahinang hinahanap mo.</p>");
    }
});

server.listen(PORT, () => {
    console.log(`Tumatakbo ang server sa http://localhost:${PORT}`);
});
