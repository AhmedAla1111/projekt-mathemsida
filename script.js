console.log("script.js loaded");

const recipes = [
  {
    name: "Pannkakor",
    description: "Klassiska pannkakor, klara på 20 minuter.",
    ingredients: ["mjölk", "ägg", "vetemjöl", "smör", "salt"]
  },
  {
    name: "Omelett",
    description: "Snabb och mättande omelett med ost.",
    ingredients: ["ägg", "mjölk", "smör", "ost", "salt"]
  },
  {
    name: "Spaghetti med tomatsås",
    description: "Enkel vardagsmiddag med het tomatsås.",
    ingredients: ["spaghetti", "krossade tomater", "lök", "vitlök", "olivolja", "salt"]
  },
  {
    name: "Stekt ris med ägg",
    description: "Perfekt sätt att använda gårdagens ris.",
    ingredients: ["ris", "ägg", "lök", "vitlök", "soja", "olivolja"]
  },
  {
    name: "Ostmacka i ugn",
    description: "Krispig macka med smält ost.",
    ingredients: ["bröd", "ost", "smör", "tomat"]
  }
];

function getUniqueIngredients() {
  const all = [];
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (!all.includes(ingredient)) {
        all.push(ingredient);
      }
    }
  }
  return all.sort();
}

function renderIngredients() {
  const list = document.getElementById("ingredient-list");
  const ingredients = getUniqueIngredients();

  for (const ingredient of ingredients) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = ingredient;

    label.append(checkbox, " " + ingredient);
    list.append(label);
  }
}

renderIngredients();