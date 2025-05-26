const initialStock = { tons: 2, kilograms: 0, grams: 0, milligrams: 0 };

function updateStock(stock, value, action) {
  const newStock = { ...stock };
  if (action === "sell") {
    newStock.tons -= value.tons || 0;
    newStock.kilograms -= value.kilograms || 0;
    newStock.grams -= value.grams || 0;
    newStock.milligrams -= value.milligrams || 0;
  } else if (action === "purchase") {
    newStock.tons += value.tons || 0;
    newStock.kilograms += value.kilograms || 0;
    newStock.grams += value.grams || 0;
    newStock.milligrams += value.milligrams || 0;
  }
  normalizeStock(newStock);
  return newStock;
}

function normalizeStock(stock) {
  stock.grams += Math.floor(stock.milligrams / 1000);
  stock.milligrams = stock.milligrams % 1000;

  stock.kilograms += Math.floor(stock.grams / 1000);
  stock.grams = stock.grams % 1000;

  stock.tons += Math.floor(stock.kilograms / 1000);
  stock.kilograms = stock.kilograms % 1000;
  return stock;
}

const sale = { tons: 0, kilograms: 500, grams: 500, milligrams: 500 };

const result = updateStock(initialStock, sale, "purchase");

console.log("Final Result:", result);
