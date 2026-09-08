const recipes = [
  { id: 0, title: 'Silky tomato pasta', meta: 'Italian / 30 min', prep: 10, cook: 20, cuisine: 'italian', ingredients: ['340 g spaghetti', '2 tbsp olive oil', '3 garlic cloves, sliced', '800 g crushed tomatoes', '30 g fresh basil', '40 g Parmesan'], steps: ['Boil pasta in salted water and reserve 120 ml pasta water before draining.', 'Cook garlic in oil for 1 minute. Add tomatoes, season, and simmer for 12 minutes.', 'Toss pasta with sauce and enough pasta water to make it glossy.', 'Fold in basil and Parmesan, then serve.'] },
  { id: 1, title: 'Roasted grain bowl', meta: 'Mediterranean / 40 min', prep: 15, cook: 25, cuisine: 'mediterranean', ingredients: ['250 g cooked rice or farro', '2 carrots, sliced', '1 red onion, wedged', '1 can chickpeas', '2 tbsp olive oil', '100 g plain yogurt', '1 lemon'], steps: ['Heat oven to 220 C. Toss vegetables and chickpeas with oil, paprika, salt, and pepper.', 'Roast for 22 to 25 minutes, turning once.', 'Stir lemon zest and juice into yogurt.', 'Layer grains, roasted vegetables, and lemon yogurt in a bowl.'] },
  { id: 2, title: 'Ginger dumplings', meta: 'East Asian / 45 min', prep: 25, cook: 20, cuisine: 'east-asian', ingredients: ['24 dumpling wrappers', '250 g ground pork or mushrooms', '2 scallions', '1 tbsp grated ginger', '1 tbsp soy sauce', '1 tsp sesame oil'], steps: ['Mix filling ingredients in a bowl.', 'Place 1 tbsp filling in each wrapper, fold, and seal.', 'Pan-fry dumplings in oil for 2 minutes.', 'Add 60 ml water, cover, steam for 8 minutes, then uncover and crisp.'] },
  { id: 3, title: 'Weeknight tacos', meta: 'Mexican / 25 min', prep: 15, cook: 10, cuisine: 'mexican', ingredients: ['8 corn tortillas', '400 g black beans or chicken', '1 tsp cumin', '1 lime', '1/2 cabbage, shredded', '1 avocado'], steps: ['Warm filling with cumin, half the lime juice, and salt.', 'Toast tortillas in a dry pan.', 'Toss cabbage with remaining lime juice.', 'Fill tortillas with filling, cabbage, avocado, and herbs.'] },
  { id: 4, title: 'Weeknight dal', meta: 'Indian / 45 min', prep: 10, cook: 35, cuisine: 'indian', ingredients: ['200 g red lentils', '1 onion, diced', '2 garlic cloves', '1 tbsp ginger', '1 tsp cumin', '1 tsp turmeric', '400 ml coconut milk', '600 ml stock'], steps: ['Add all ingredients to a pot and bring to a boil.', 'Simmer uncovered for 25 minutes, stirring occasionally.', 'Add water if needed until creamy.', 'Season with salt and lemon. Serve with rice.'] },
  { id: 5, title: 'Big chopped salad', meta: 'Fresh / 15 min', prep: 15, cook: 0, cuisine: 'any', ingredients: ['1 romaine heart', '1 cucumber', '250 g cherry tomatoes', '1/2 red onion', '100 g chickpeas', '60 g feta', '3 tbsp olive oil', '1 tbsp vinegar'], steps: ['Chop vegetables and add them to a large bowl.', 'Whisk oil, vinegar, salt, and pepper.', 'Toss dressing through the vegetables and chickpeas.', 'Top with feta and serve immediately.'] },
  { id: 6, title: 'Sheet-pan supper', meta: 'One pan / 50 min', prep: 15, cook: 35, cuisine: 'any', ingredients: ['500 g chicken thighs or tofu', '500 g baby potatoes', '2 bell peppers', '2 tbsp olive oil', '1 tsp oregano', '1 lemon'], steps: ['Heat oven to 220 C and roast seasoned potatoes for 15 minutes.', 'Add chicken or tofu and peppers.', 'Roast for 20 minutes, until cooked through.', 'Squeeze lemon over the tray and rest before serving.'] },
  { id: 7, title: 'Garlic butter noodles', meta: 'Italian / 25 min', prep: 5, cook: 20, cuisine: 'italian', ingredients: ['340 g linguine', '75 g butter', '4 garlic cloves', '1/2 tsp chili flakes', '50 g Parmesan', '1/2 lemon'], steps: ['Cook pasta and reserve 120 ml pasta water.', 'Melt butter with garlic and chili flakes.', 'Toss pasta with butter and enough water for a glossy sauce.', 'Finish with Parmesan, lemon, and parsley.'] },
  { id: 8, title: 'Vegetable fried rice', meta: 'Any night / 35 min', prep: 10, cook: 25, cuisine: 'east-asian', ingredients: ['600 g cold cooked rice', '2 eggs', '150 g peas', '1 carrot', '2 scallions', '2 tbsp soy sauce', '1 tbsp sesame oil'], steps: ['Scramble eggs in a hot oiled skillet and set aside.', 'Cook carrot and peas until tender.', 'Add rice and stir-fry until hot.', 'Return eggs and toss with soy, sesame oil, and scallions.'] },
  { id: 9, title: 'Free-form soup', meta: 'Morrow pick / 20 min', prep: 10, cook: 20, cuisine: 'any', ingredients: ['1 tbsp olive oil', '1 onion', '2 garlic cloves', '1 litre vegetable stock', '400 g mixed vegetables', '1 can white beans', '2 handfuls greens'], steps: ['Soften onion in oil, then add garlic.', 'Add stock, vegetables, beans, and herbs.', 'Simmer for 12 to 15 minutes until tender.', 'Fold in greens, season, and serve with bread.'] }
];

const form = document.querySelector('#meal-form');
const output = document.querySelector('#meal-output');
const cuisineButtons = document.querySelectorAll('[data-cuisine]');
const homeButton = document.querySelector('#generate-home');
const homeOutput = document.querySelector('#home-recipe');
const recipeModal = document.querySelector('#recipe-modal');
let lastCuisinePick = {};
let activePantryIngredients = [];

function normalizeIngredient(value) {
  return value.toLowerCase().replace(/\([^)]*\)/g, '').replace(/\d+[\d/\s]*(g|kg|ml|l|tbsp|tsp|can)?/g, '').replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim().replace(/ies$/, 'y').replace(/s$/, '');
}

function ingredientMatches(recipeIngredient, pantryIngredient) {
  const recipe = normalizeIngredient(recipeIngredient);
  const pantry = normalizeIngredient(pantryIngredient);
  const aliases = { tomato: ['tomato', 'tomatoes'], chickpea: ['chickpea', 'chickpeas'], bean: ['bean', 'beans'], onion: ['onion', 'onions'], carrot: ['carrot', 'carrots'], pepper: ['pepper', 'peppers'], garlic: ['garlic'], rice: ['rice'], pasta: ['pasta', 'spaghetti', 'linguine'], chicken: ['chicken'], tofu: ['tofu'] };
  return recipe.includes(pantry) || pantry.includes(recipe) || Object.values(aliases).some((group) => group.some((term) => recipe.includes(term) && pantry.includes(term)));
}

function matchingRecipes(cuisine, pantryIngredients) {
  return recipes.filter((recipe) => (cuisine === 'any' || recipe.cuisine === cuisine || recipe.cuisine === 'any') && recipe.ingredients.some((recipeIngredient) => pantryIngredients.some((pantryIngredient) => ingredientMatches(recipeIngredient, pantryIngredient))));
}

function pickRecipe(cuisine = 'any', pantryIngredients = []) {
  const matches = pantryIngredients.length ? matchingRecipes(cuisine, pantryIngredients) : recipes.filter((recipe) => cuisine === 'any' || recipe.cuisine === cuisine || recipe.cuisine === 'any');
  if (!matches.length) return null;
  const last = lastCuisinePick[cuisine];
  const available = matches.filter((recipe) => recipe.id !== last);
  const choice = (available.length ? available : matches)[Math.floor(Math.random() * (available.length ? available : matches).length)];
  lastCuisinePick[cuisine] = choice.id;
  return choice;
}

function showMeal(cuisine = document.querySelector('#cuisine')?.value || 'any') {
  if (!output) return;
  const ingredients = document.querySelector('#ingredients')?.value.trim() || '';
  activePantryIngredients = ingredients.split(',').map((item) => item.trim()).filter(Boolean);
  if (!activePantryIngredients.length) {
    output.className = 'empty-output';
    output.innerHTML = '<span class="output-glyph">+</span><p>Enter at least one ingredient<br>to find a matching recipe.</p>';
    return;
  }
  const recipe = pickRecipe(cuisine, activePantryIngredients);
  if (!recipe) {
    output.className = 'empty-output';
    output.innerHTML = `<span class="output-glyph">+</span><p>No ${escapeHtml(cuisine === 'any' ? '' : cuisine + ' ')}recipe matches those ingredients yet.<br>Try another cuisine or ingredient.</p>`;
    return;
  }
  output.className = 'meal-result result-' + (recipe.id % 2 ? 'blue' : 'yellow');
  output.innerHTML = `<span class="mono">MATCHED TO ${escapeHtml(ingredients)}</span><h2>${recipe.title}</h2><span class="recipe-tag">${recipe.meta}</span><p>Fresh pick: this recipe is a flexible way to use what you have in a ${cuisine === 'any' ? 'surprising' : cuisine} direction.</p><button class="recipe-result-button" type="button">View the full recipe <span>&#8594;</span></button>`;
  output.querySelector('.recipe-result-button').addEventListener('click', () => openRecipe(recipe, activePantryIngredients));
}

function showHomeRecipe() {
  if (!homeOutput) return;
  const recipe = pickRecipe('any');
  homeOutput.innerHTML = `<span class="mono">RANDOM PICK / ${recipe.meta}</span><h2>${recipe.title}</h2><p>Prep ${recipe.prep} min / Cook ${recipe.cook} min. A reliable idea for the ingredients already at home.</p><button class="recipe-result-button" type="button">Open full recipe <span>&#8594;</span></button>`;
  homeOutput.querySelector('button').addEventListener('click', () => openRecipe(recipe));
}

if (form) form.addEventListener('submit', (event) => { event.preventDefault(); showMeal(); });
cuisineButtons.forEach((button) => button.addEventListener('click', () => { document.querySelector('#cuisine').value = button.dataset.cuisine; showMeal(button.dataset.cuisine); }));
if (homeButton) homeButton.addEventListener('click', showHomeRecipe);

function openRecipe(recipe, pantryIngredients = []) {
  if (!recipeModal) return;
  document.querySelector('#recipe-modal-meta').textContent = recipe.meta;
  document.querySelector('#recipe-modal-title').textContent = recipe.title;
  document.querySelector('#recipe-prep').textContent = `${recipe.prep} min`;
  document.querySelector('#recipe-cook').textContent = `${recipe.cook} min`;
  document.querySelector('#recipe-total').textContent = `${recipe.prep + recipe.cook} min`;
  document.querySelector('#recipe-ingredients').innerHTML = recipe.ingredients.map((item) => `<li${pantryIngredients.length && !pantryIngredients.some((pantryIngredient) => ingredientMatches(item, pantryIngredient)) ? ' style="color:#c63d35;font-weight:700"' : ''}>${item}</li>`).join('');
  document.querySelector('#recipe-steps').innerHTML = recipe.steps.map((item) => `<li>${item}</li>`).join('');
  recipeModal.hidden = false;
  document.body.classList.add('modal-open');
  document.querySelector('.modal-close').focus();
}

document.querySelectorAll('[data-close-recipe]').forEach((element) => element.addEventListener('click', () => { recipeModal.hidden = true; document.body.classList.remove('modal-open'); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && recipeModal) { recipeModal.hidden = true; document.body.classList.remove('modal-open'); } });

if (document.querySelector('#top-list')) {
  document.querySelector('#top-list').innerHTML = recipes.map((recipe) => `<button class="top-recipe" type="button" data-recipe-id="${recipe.id}"><span>${String(recipe.id + 1).padStart(2, '0')}</span><strong>${recipe.title}</strong><small>${recipe.meta}</small><b>&#8599;</b></button>`).join('');
  document.querySelectorAll('[data-recipe-id]').forEach((button) => button.addEventListener('click', () => openRecipe(recipes[Number(button.dataset.recipeId)])));
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
