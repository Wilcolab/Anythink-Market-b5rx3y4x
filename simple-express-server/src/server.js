/**
 * @file server.js
 * @module simple-express-server
 * @description Minimal Express server that exposes a health route and a small in-memory "tasks" API.
 *
 * This file creates an Express application, configures JSON body parsing, maintains an in-memory
 * array of task strings, and defines three HTTP endpoints:
 *   - GET  /        -> returns a simple "Hello World" text response
 *   - GET  /tasks   -> returns the current list of tasks as JSON
 *   - POST /tasks   -> accepts a JSON payload to add a new task to the in-memory list
 *
 * Notes:
 *   - The tasks store is in-memory and not persisted; restarting the process will reset it.
 *   - Input validation on POST /tasks ensures the "text" field is present and is a string.
 *
 * @constant {number} PORT - TCP port the server listens on (default: 8001)
 * @constant {import("express").Application} app - Express application instance
 * @constant {string[]} tasks - In-memory array containing task strings
 *
 * @typedef {Object} AddTaskPayload
 * @property {string} text - The task text to add. Required for POST /tasks.
 *
 * @route GET /
 * @summary Health/root endpoint
 * @returns {string} 200 - Plain text "Hello World"
 *
 * @route GET /tasks
 * @summary Retrieve all tasks
 * @returns {{ tasks: string[] }} 200 - JSON object containing the tasks array
 *
 * @route POST /tasks
 * @summary Add a new task to the in-memory list
 * @param {AddTaskPayload} request.body - JSON body with a "text" property
 * @returns {{ message: string }} 200 - On success: { message: "Task added successfully" }
 * @returns {{ message: string }} 400 - On invalid input: { message: "Invalid task payload" }
 *
 * @example
 * // Fetch tasks
 * fetch('/tasks').then(res => res.json()).then(data => console.log(data.tasks));
 *
 * @example
 * // Add a task
 * fetch('/tasks', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ text: 'New task' })
 * }).then(res => res.json()).then(console.log);
 *
 * @see https://expressjs.com/ - Express documentation
 */
const express = require('express');

const app = express();
const PORT = 8001;

app.use(express.json());

const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

// GET /
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ message: 'Invalid task payload' });
  }
  tasks.push(text);
  return res.json({ message: 'Task added successfully' });
});

// GET /tasks
app.get('/tasks', (req, res) => {
  return res.json({ tasks });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});