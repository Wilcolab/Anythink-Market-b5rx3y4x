# Python Server

This project contains a FastAPI server implemented in Python. It provides two routes for managing a task list.
### Simple Express Server (workspace: simple-express-server)

Recent changes
- Initial lightweight Express.js scaffold added under `src/server.js`.
- Project files:
  - `package.json` — npm scripts and dependency metadata.
  - `nodemon.json` — development auto-reload config.
  - `Dockerfile`, `.dockerignore` — containerization.
  - `README.md` — basic project notes.

Endpoints (see `src/server.js`)
- GET / — Root endpoint, returns a welcome message and basic server status.
- GET /health — Health/liveness check (e.g., `{ "status": "ok" }`).
- Other routes follow standard REST conventions and will be defined in `src/server.js` as needed:
  - GET /resource
  - GET /resource/:id
  - POST /resource
  - PUT/PATCH /resource/:id
  - DELETE /resource/:id

Running locally
1. Install dependencies:
  ```sh
  npm install
  ```
2. Development (auto-reload):
  ```sh
  npm run dev
  ```
3. Production / normal run:
  ```sh
  npm start
  ```
The server listens on the port configured by the `PORT` environment variable. For the `simple-express-server` workspace the app is scaffolded to use port `8001` by default (you can override this with `PORT`).

Running with Docker
1. Build the image:
  ```sh
  docker build -t simple-express-server .
  ```
2. Run the container (example for the `simple-express-server` on port `8001`):
  ```sh
  docker run -p 8001:8001 --env PORT=8001 simple-express-server
  ```

Quick tests (replace :port with actual port)
- Health check (Express example):
  ```sh
  curl -i http://localhost:8001/health
  ```
- Root (Express example):
  ```sh
  curl -i http://localhost:8001/
  ```

Notes
- If a route is not responding, verify the server is running, the `PORT` matches, and container port mappings are correct.
- To extend documentation or generate OpenAPI/Swagger, provide `src/server.js` and specific endpoints to document.
## Project Structure
/**
 * Simple Express Server - Documentation (workspace: simple-express-server)
 *
 * Recent changes (workspace summary)
 * - Initial lightweight Express.js application scaffold added under src/server.js.
 * - Project tooling and runtime files included:
 *     - package.json: npm scripts to run the server (start/dev) and dependency metadata.
 *     - nodemon.json: configuration for local development auto-reload.
 *     - Dockerfile and .dockerignore: containerization setup for building a production image.
 *     - README.md: (basic) project description and usage notes.
 * - Purpose: small HTTP API used for local development and as an example microservice for demos/learning.
 *
 * Endpoints (location: src/server.js)
 * - GET /            -> Root endpoint. Returns a simple welcome message and basic server status.
 * - GET /health      -> Health/liveness check. Returns status (e.g., { status: "ok" }) and optional minimal runtime info.
 * - Additional routes
 *     - Any application-specific API routes will be defined in src/server.js (e.g., /api/*).
 *     - If the project includes further CRUD endpoints, they will follow standard REST conventions:
 *         - GET /resource       -> list resources
 *         - GET /resource/:id   -> get a single resource
 *         - POST /resource      -> create a resource
 *         - PUT/PATCH /resource/:id -> update a resource
 *         - DELETE /resource/:id -> delete a resource
 *
 * Notes:
 * - Check src/server.js to see the exact route paths, request/response payloads, and any middleware (CORS, body-parser, logging).
 * - If you need precise contract docs (parameters, JSON schemas, response codes), provide the contents of src/server.js or indicate which endpoints require full documentation.
 *
 * Running the server (local development)
 * 1. Install dependencies
 *      - npm install
 *
 * 2. Development (auto-reload with nodemon)
 *      - npm run dev
 *      - nodemon will watch files and restart the server on changes (configured via nodemon.json).
 *
 * 3. Production / normal run
 *      - npm start
 *      - The server listens on the port configured by environment variable PORT or a default port defined in src/server.js (commonly 3000).
 *
 * Running the server with Docker
 * 1. Build the image
 *      - docker build -t simple-express-server .
 *
 * 2. Run the container
 *      - docker run -p 3000:3000 --env PORT=3000 simple-express-server
 *    (Adjust port mapping and env variables as needed)
 *
 * Quick test examples (replace :port with actual port, default 3000)
 * - Health check:
 *      curl -i http://localhost:3000/health
 *
 * - Root:
 *      curl -i http://localhost:3000/
 *
 * Troubleshooting / tips
 * - If a route is not responding, verify:
 *     - Server process is running and not crashing (check logs printed to console).
 *     - PORT environment variable matches the port you target with curl/browser.
 *     - Any firewall or container port mappings are correct when running in Docker.
 * - For detailed route behavior, open src/server.js and inspect:
 *     - middleware usage (e.g., express.json())
 *     - route handlers and response shapes
 *
 * How to extend documentation further
 * - Provide the current src/server.js contents and I will generate:
 *     - Exact endpoint signatures (methods, paths)
 *     - Request payload examples and validation rules
 *     - Response examples and status codes
 *     - OpenAPI/Swagger YAML or JSON if requested
 *
 */
The project has the following files and directories:

- `python-server/src/main.py`: This file contains the implementation of the FastAPI server with two routes. It handles adding a task to a list and retrieving the list.

- `python-server/src/__init__.py`: This file is an empty file that marks the `src` directory as a Python package.

- `python-server/requirements.txt`: This file lists the dependencies required for the FastAPI server and other dependencies.

- `python-server/Dockerfile`: This file is used to build a Docker image for the FastAPI server. It specifies the base image, copies the source code into the image, installs the dependencies, and sets the command to run the server.

- `docker-compose.yml`: This file is used to define and run multi-container Docker applications. It specifies the services to run, their configurations, and any dependencies between them.

## Getting Started

To run the FastAPI server using Docker, follow these steps:

- Build and start the Docker containers by running the following command:

  ```shell
  docker compose up
  ```

  This command will build the Docker image for the FastAPI server and start the containers defined in the `docker-compose.yml` file.

- The FastAPI server should now be running. You can access at port `8000`.

## API Routes

The FastAPI server provides the following API routes:

- `POST /tasks`: Adds a task to the task list. The request body should contain the task details.

- `GET /tasks`: Retrieves the task list.
