const recipes = [
  {
    name: "Pannkakor",
    description: "Klassiska pannkakor, klara på 20 minuter.",
    ingredients: ["mjölk", "ägg", "vetemjöl", "smör", "salt"],
    image: "bilder/pannkakor.jpg",
    alt: "En stapel pannkakor med sylt"
  },
  {
    name: "Omelett",
    description: "Snabb och mättande omelett med ost.",
    ingredients: ["ägg", "mjölk", "smör", "ost", "salt"],
    image: "bilder/omelett.jpg",
    alt: "En gyllene omelett på en tallrik"
  },
  {
    name: "Spaghetti med tomatsås",
    description: "Enkel vardagsmiddag med het tomatsås.",
    ingredients: ["spaghetti", "krossade tomater", "lök", "vitlök", "olivolja", "salt"],
    image: "bilder/spaghetti-med-tomatsas.jpg",
    alt: "Spaghetti med tomatsås i en djup tallrik"
  },
  {
    name: "Stekt ris med ägg",
    description: "Perfekt sätt att använda gårdagens ris.",
    ingredients: ["ris", "ägg", "lök", "vitlök", "soja", "olivolja"],
    image: "bilder/stekt-ris-med-agg.jpg",
    alt: "Stekt ris med ägg i en stekpanna"
  },
  {
    name: "Ostmacka i ugn",
    description: "Krispig macka med smält ost.",
    ingredients: ["bröd", "ost", "smör", "tomat"],
    image: "bilder/ostmacka-i-ugn.jpg",
    alt: "En macka med smält ost"
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

function getSelectedIngredients() {
  const checked = document.querySelectorAll("#ingredient-list input:checked");
  return Array.from(checked).map(function (checkbox) {
    return checkbox.value;
  });
}

function getMatchInfo(recipe, selected) {
  const have = recipe.ingredients.filter(function (ingredient) {
    return selected.includes(ingredient);
  });
  const missing = recipe.ingredients.filter(function (ingredient) {
    return !selected.includes(ingredient);
  });
  return { have: have, missing: missing };
}

function getSortedRecipes(selected) {
  return [...recipes].sort(function (a, b) {
    return getMatchInfo(b, selected).have.length - getMatchInfo(a, selected).have.length;
  });
}

function createRecipeCard(recipe, selected) {
  const match = getMatchInfo(recipe, selected);
  const total = recipe.ingredients.length;

  const card = document.createElement("article");
  card.className = "recipe-card";
  if (match.missing.length === 0) {
    card.classList.add("can-cook");
  }

  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.alt;

  const badge = document.createElement("span");
  badge.className = "match-badge";
  badge.textContent = match.have.length + "/" + total;

  const title = document.createElement("h3");
  title.textContent = recipe.name;

  const status = document.createElement("p");
  status.textContent = "Har " + match.have.length + " av " + total;

  const missing = document.createElement("p");
  if (match.missing.length === 0) {
    missing.textContent = "Du har allt!";
  } else {
    missing.textContent = "Saknas: " + match.missing.join(", ");
  }

  card.append(image, badge, title, status, missing);
  return card;
}

function renderRecipes() {
  const list = document.getElementById("recipe-list");
  const selected = getSelectedIngredients();
  list.innerHTML = "";

  for (const recipe of getSortedRecipes(selected)) {
    list.append(createRecipeCard(recipe, selected));
  }
}

function setupEvents() {
  const ingredientList = document.getElementById("ingredient-list");
  ingredientList.addEventListener("change", renderRecipes);
}

renderIngredients();
renderRecipes();
setupEvents();
