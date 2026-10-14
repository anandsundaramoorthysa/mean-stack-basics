Over the next seven lessons you will build one small project: a **Student Marks Tracker**. Before writing code, good developers plan. A short plan stops you from building the wrong thing.

## Requirements

The app should let a teacher:

- see a list of students with their department and marks,
- add a new student,
- change a student's marks,
- delete a student,
- see who scored highest and the average marks of each department.

## Three tiers

A MEAN app splits its work into three **tiers** (layers), and each tier talks only to its neighbour.

| Tier | Tool | Job |
|---|---|---|
| Browser | Angular | Shows pages and sends requests |
| Server | Express on Node.js | Checks the data and exposes an **API** |
| Database | MongoDB | Stores the data permanently |

An **API** is a set of addresses the browser can call to ask the server for work. Angular never touches the database directly.

## The data shape

Every student is one JSON object:

```json
{ "id": 1, "name": "Asha", "department": "CSE", "marks": 91 }
```

In MongoDB the `id` will become the automatic `_id` field. Deciding the shape early means all three tiers agree on the same field names.

## REST routes

**REST** is a habit for naming API addresses: the path names the thing (`/students`) and the HTTP method names the action.

| Method and path | Action | Success status |
|---|---|---|
| `GET /students` | list all students | 200 |
| `POST /students` | add one | 201 |
| `PUT /students/:id` | change one | 200 |
| `DELETE /students/:id` | remove one | 204 |

If the `:id` does not exist the server answers **404**. If the data sent is invalid it answers **400**.

## What the course runs for you, and what you run yourself

The exercises in this course are checked inside the extension. They do **not** start a real database or a real Angular project:

- Lessons 2 and 3 run your Express routes against an in-memory array.
- Lesson 4 runs your MongoDB queries against a small simulated shell.
- Lessons 5 and 6 only check your code as text (a pattern match). Nothing connects to MongoDB or runs Angular.

To see the whole app working you need a real MongoDB (installed locally or on MongoDB Atlas), Node.js, and an Angular project made with `ng new`. Lesson 7 shows how to start them together.
