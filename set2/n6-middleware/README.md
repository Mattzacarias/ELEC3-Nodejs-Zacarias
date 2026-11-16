# N5: REST-style API

**Full Name:** Benedict Matthew O. Zacarias  
**Section:** IV-BSIT-A  
**Course:** ELEC3 - Node.js Programming

## Description

This project is a simple REST-style API for managing books using Node.js and the built-in HTTP module. It uses an in-memory array to store book records without requiring a database.

## How to Run

1. Open the terminal inside the `n5-api` folder.
2. Run the following command:

```bash
node index.js
```

3. The API will run at:

`http://localhost:8000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Returns all books |
| GET | `/api/books/:id` | Returns one book by ID |
| POST | `/api/books` | Adds a new book |
| PUT | `/api/books/:id` | Updates an existing book |
| DELETE | `/api/books/:id` | Deletes a book |

## Sample Book Data

- Noli Me Tangere – Jose Rizal
- El Filibusterismo – Jose Rizal
- Mga Ibong Mandaragit – Amado V. Hernandez

**Technology Used:** Node.js, HTTP Module, JSON