# N5: Books REST API

Simpleng REST API gamit ang built-in `http` module ng Node.js.

## Endpoints

- `GET /api/books` — Ibinabalik ang listahan ng lahat ng libro.
- `GET /api/books/:id` — Ibinabalik ang detalye ng isang libro base sa ID (404 kung wala).
- `POST /api/books` — Nagdadagdag ng bagong libro mula sa JSON body (`title`, `author`) at nagbabalik ng status `201`.
- `PUT /api/books/:id` — Ina-update ang `title` o `author` ng isang libro base sa ID.
- `DELETE /api/books/:id` — Binubura ang isang libro base sa ID.
