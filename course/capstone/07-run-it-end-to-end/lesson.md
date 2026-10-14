This lesson is a checklist for running the whole app and a guide for fixing the first problems you will meet.

Be aware that the course exercises did not build this app for you: the routes ran on an in-memory array, the MongoDB code was a separate script, and the Angular code was only checked as text. To run everything together you need a real MongoDB, and you must do the joining yourself: in your Express project replace the array in each route with calls on the `students` collection (remember `ObjectId` for ids, from lesson 5), and put the Angular service and component into a project created with `ng new`. Treat that as your own project work.

## Start order

Open three terminals, one per tier, and start them from the bottom up.

1. **Database**: start MongoDB (`mongod`, or the MongoDB service that was installed with it). It listens on port 27017. If you use MongoDB Atlas instead, there is nothing to start; just put the Atlas string in `MONGODB_URI`.
2. **API**: in the server folder run `node --env-file=.env server.js`. Your Express app listens on port 3000 and connects using `MONGODB_URI`.
3. **Front end**: in the Angular folder run `ng serve`. It serves the app on port 4200.

If a tier starts before the one it needs, you get a connection error. Read the message: it usually names the port.

## Test the API before the front end

Call the API on its own first, so you know which tier is at fault:

```
curl http://localhost:3000/students
```

Or open that address in the browser. If you see JSON, the server and database work. If the Angular page is still empty, the problem is in Angular.

## CORS

The Angular page lives at `localhost:4200` and the API at `localhost:3000`. A browser treats these as different **origins** (a different port counts) and blocks the response unless the server permits it. This rule is called **CORS**. You will see a red error in the browser console even though the API works with curl.

Fix it on the **server**, not in Angular. In Express, install the `cors` package and add `app.use(cors({ origin: 'http://localhost:4200' }))` before your routes.

## What to learn next

Add login with JSON Web Tokens, put the tracker online, write tests for your routes, and add the Angular forms for adding, editing and deleting students, which call the POST, PUT and DELETE routes.
