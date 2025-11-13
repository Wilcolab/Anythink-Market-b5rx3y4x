# Simple Express Server

This project is a simple Express server scaffolded to listen on port 8001. It is configured to use Nodemon for automatic code reloading during development.

## Project Structure

```
simple-express-server
├── src
│   └── server.js         # Entry point of the application
├── .dockerignore          # Files to ignore when building the Docker image
├── .gitignore             # Files to ignore in Git
├── Dockerfile             # Instructions to build the Docker image
├── package.json           # Project dependencies and scripts
├── nodemon.json           # Configuration for Nodemon
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm (or Yarn) installed on your machine.
- Docker installed for containerization.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd simple-express-server
   ```

2. Install dependencies:
   ```
   yarn install
   ```

### Running the Server

To start the server with automatic reloading, use the following command:

```
yarn start
```

The server will be running on `http://localhost:8001`.

### Docker

To build and run the Docker container, use the following commands:

1. Build the Docker image:
   ```
   docker build -t simple-express-server .
   ```
   3. API Endpoints (new)

   The server now exposes a small tasks API in addition to the root health route.

   - GET /  
      - Response: 200 plain text "Hello World"

   - GET /tasks  
      - Response: 200 JSON: { "tasks": [ "task1", ... ] }  
      - Example:
         ```
         curl http://localhost:8001/tasks
         ```

   - POST /tasks  
      - Accepts JSON body: { "text": "New task" }  
      - Validation: "text" is required and must be a string.  
      - Responses:
         - 200 { "message": "Task added successfully" } on success
         - 400 { "message": "Invalid task payload" } on invalid input  
      - Examples:
         ```
         curl -X POST http://localhost:8001/tasks \
            -H "Content-Type: application/json" \
            -d '{"text":"Buy milk"}'
         ```
         or in browser JS:
         ```js
         fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: 'New task' })
         }).then(r => r.json()).then(console.log);
         ```

   Notes:
   - The tasks store is in-memory and will reset when the server restarts.
   - Input is validated on POST /tasks to ensure a non-empty string "text".
2. Run the Docker container:
   ```
   docker run -p 8001:8001 simple-express-server
   ```

The server will be accessible at `http://localhost:8001` from your host machine.

### License

This project is licensed under the MIT License.