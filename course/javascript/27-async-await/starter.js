// Loaders are functions that return promises, for example () => Promise.resolve(5)

async function addAsync(loadA, loadB) {
  // TODO: await both loaders and return the sum
}

async function safeLoad(load, fallback) {
  // TODO: await load(); if it rejects, return fallback
}

async function loadAll(loaders) {
  // TODO: run every loader at once with Promise.all and return the array of results
}

module.exports = { addAsync, safeLoad, loadAll };
