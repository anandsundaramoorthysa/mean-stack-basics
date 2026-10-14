Real projects use code written by other people. **npm** is the tool that downloads that code, called **packages**, and **package.json** is the file where your project lists what it needs. npm is installed together with Node.js.

## Starting a project

```
npm init -y
```

This creates a `package.json` with default answers. Install a package with:

```
npm install express
```

npm downloads Express into a folder called `node_modules` and adds a line to `package.json`. Never edit `node_modules` by hand, and do not commit it. Anyone with your `package.json` can rebuild it by running `npm install`.

## A package.json

```json
{
  "name": "student-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

- **scripts** are named shortcuts. `npm start` runs the `start` script, and `npm run dev` would run one called `dev`.
- **dependencies** are packages your program needs while it runs.
- **devDependencies** are tools only needed while you develop, such as test helpers. Install one with `npm install --save-dev nodemon`.

## Version ranges

A version has three numbers: `MAJOR.MINOR.PATCH`, for example `5.1.2`. A patch fixes bugs, a minor adds features, and a major may break old code.

| Range | Meaning |
|---|---|
| `5.1.2` | exactly this version |
| `^5.1.2` | any `5.x.x` from 5.1.2 up, never 6.0.0 |
| `~5.1.2` | any `5.1.x` from 5.1.2 up, never 5.2.0 |

npm also writes a `package-lock.json` file that records the exact versions installed, so teammates get identical results. Commit that file.

JSON is strict: keys and strings use double quotes, and the last entry in an object has no trailing comma.
