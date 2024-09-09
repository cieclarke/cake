const assert = require("assert");

/**
1.get all ingredients for a cake recipe
2.check how many recipe's ingredients can be taken from the stock
3.return the lowest in the array

returns a number for how many recipes/portions can be made
for the given ingredients from the stock.
*/
function cakes(recipe, available) {
  const ingredients = Object.keys(recipe);

  const availabilityCountList = ingredients.map((i) => {
    const res = Math.floor(available[i] / recipe[i]);
    return Number.isNaN(res) ? 0 : res;
  });

  return Math.min(...availabilityCountList);
}

const recipeOne = cakes({ flour: 300 }, { flour: 300 });

assert.equal(recipeOne, 1);

function store(stock) {
  return function (ingredientAmounts) {
    const ingredients = Object.keys(ingredientAmounts);
    const allInstock = ingredients.every(
      (i) => stock[i] >= ingredientAmounts[i]
    );

    if (!allInstock) throw new Error("not enough in the cupboard");

    return Object.keys(stock).reduce((s, k) => {
      s[k] = s[k] - ingredientAmounts[k];
      return s;
    }, stock);
  };
}
/*
const store1 = store({ flour: 34, eggs: 10 });
const cakeRecipe = store1({ flour: 10, eggs: 3 });
console.log(cakeRecipe);
const pancakeRecipe = store1({ flour: 10, eggs: 3 });
console.log(pancakeRecipe);
const waffleRecipe = store1({ flour: 10, eggs: 6 });
console.log(waffleRecipe);
*/
const store2 = store({ flour: 80, eggs: 100, sugar: 400 });

const recipeOrder = Array(6).fill({
  flour: 30,
  eggs: 4,
  sugar: 20,
  salt: 1,
});

const orderCount = recipeOrder.reduce((curr, prev) => {
  try {
    store2(prev);
  } catch {
    return curr;
  }
  return curr + 1;
}, 0);

assert.equal(orderCount, 0);
