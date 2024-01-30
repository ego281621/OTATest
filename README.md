# Note Taking App API

# Description
This is a simple REST API that allows creating, reading, updating, and deleting notes. Each note has a title and a body.

# Endpoints
- Get all notes
  - GET /notes
    - Returns an array of all note objects.

- Get a single note
  - GET /notes/:id
    - Returns a single note object by its id.
    - Returns 404 if a note with the given id is not found.

- Create a new note
  - POST /notes
    - Creates a new note from the request body and returns the new note object.
    - Request body:
    *{
      "title": "Note title",
      "body": "Note body content" 
    }*
     - Returns 400 if title or body is missing.

- Update an existing note
  - PUT /notes/:id
    - Updates an existing note by id using the request body and returns the updated note object.
    - Request body:
     * {
        "title": "Updated note title",
        "body": "Updated note body"
      }*
    - Returns 404 if a note with the given id is not found.
    - Returns 400 if title or body is missing.

- Delete a note
  - DELETE /notes/:id
    - Deletes an existing note by id.
    - Returns 404 if a note with the given id is not found.

# Data Storage
- The notes are stored in a notes.json file using simple JSON format.

# Error Handling
- 404 Not Found for requests using an invalid note id
- 400 Bad Request for creating/updating a note without a title or body

# Install and Run
- npm install or npm i
- node index.js
- The server will run on http://localhost:3000
