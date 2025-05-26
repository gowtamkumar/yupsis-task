const initialtsock = { tons: 2, kilograms: 0, grams: 0, milligrams: 0 };
function updateStock(initialtstock, value, salePurchaseValue) {
  const newInitalValue = { ...initialtstock };
  if (salePurchaseValue === "sell") {
    newInitalValue.tons -= value.tons || 0;
    newInitalValue.kilograms -= value.kilograms || 0;

    newInitalValue.grams -= value.grams || 0;
    newInitalValue.milligrams -= value.milligrams || 0;
  } else if (salePurchaseValue === "purchase") {
    newInitalValue.tons += value.tons || 0;
    newInitalValue.kilograms += value.kilograms || 0;
    newInitalValue.grams += value.grams || 0;
    newInitalValue.milligrams += value.milligrams || 0;
  }

  console.log("newInitalValue", newInitalValue);
  normalizeStock(newInitalValue);

  return newInitalValue;
}

function normalizeStock(stock) {
  console.log("dd", stock.grams % 1000);
}

const sale = { tons: 1, kilograms: 500, grams: 10, milligrams: 100 };

const result = updateStock(initialtsock, sale, "sell");

// console.log("re", result);
