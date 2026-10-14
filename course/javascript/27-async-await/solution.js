async function addAsync(loadA, loadB) {
  const a = await loadA();
  const b = await loadB();
  return a + b;
}

async function safeLoad(load, fallback) {
  try {
    return await load();
  } catch (error) {
    return fallback;
  }
}

async function loadAll(loaders) {
  return await Promise.all(loaders.map((load) => load()));
}

module.exports = { addAsync, safeLoad, loadAll };
