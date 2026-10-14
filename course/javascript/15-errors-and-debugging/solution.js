function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function withdraw(balance, amount) {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }
  if (amount > balance) {
    throw new Error('Insufficient funds');
  }
  return balance - amount;
}

module.exports = { safeParse, withdraw };
