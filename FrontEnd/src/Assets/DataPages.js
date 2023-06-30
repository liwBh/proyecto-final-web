const cocktailMeasures = [
  "Dash",
  "Glass",
  "Jigger Measure",
  "Ounce (oz)",
  "Shot",
  "Tablespoon (tbsp)",
  "Teaspoon (tsp)",
  "To your liking",
  "Zest",
];

const categories = [
  "Beer",
  "Cocktail",
  "Coffee / Tea",
  "Cocoa",
  "Homemade Liqueur",
  "Ordinary Drink",
  "Other / Unknown",
  "Punch / Party Drink",
  "Shake",
  "Shot",
  "Soft Drink",
];

const contentAlcoholic = [
  "Alcoholic",
  "Optional alcohol",
  "Non alcoholic",
];

const ingredientsList = [
  "7-Up",
  "Absolut Citron",
  "Ale",
  "Amaretto",
  "Angelica root",
  "Apple brandy",
  "Apple cider",
  "Apple juice",
  "Apricot brandy",
  "Añejo rum",
  "Bitters",
  "Blackberry brandy",
  "Blended whiskey",
  "Bourbon",
  "Brandy",
  "Berries",
  "Carbonated water",
  "Cantaloupe",
  "Champagne",
  "Cola drink",
  "Cherry brandy",
  "Chocolate",
  "Chocolate liqueur",
  "Chocolate syrup",
  "Cider",
  "Cocoa powder",
  "Coffee",
  "Coffee brandy",
  "Coffee liqueur",
  "Cognac",
  "Coffee liqueur",
  "Coffee",
  "Cranberries",
  "Cranberry juice",
  "Creme de Cacao",
  "Creme de Cassis",
  "Dark rum",
  "Demerara Sugar",
  "Dry Vermouth",
  "Dubonnet Rouge",
  "Espresso",
  "Egg",
  "Egg yolk",
  "Everclear",
  "Firewater",
  "Galliano",
  "Gin",
  "Ginger",
  "Grapes",
  "Grapefruit juice",
  "Grape juice",
  "Grenadine",
  "Heavy cream",
  "Irish cream",
  "Irish whiskey",
  "Johnnie Walker",
  "Kahlua",
  "Kiwi",
  "Lager",
  "Lemon",
  "Lemonade",
  "Lemon juice",
  "Lemon vodka",
  "Light rum",
  "Lime",
  "Lime juice",
  "Mango",
  "Milk",
  "Mint",
  "Midori melon liqueur",
  "Ouzo",
  "Orange",
  "Orange bitters",
  "Peach Vodka",
  "Peach nectar",
  "Peppermint schnapps",
  "Pineapple juice",
  "Pisco",
  "Port",
  "Red wine",
  "Ricard",
  "Rum",
  "Sambuca",
  "Scotch",
  "Sherry",
  "Sloe gin",
  "Southern Comfort",
  "Spiced rum",
  "Sprite",
  "Strawberry schnapps",
  "Strawberries",
  "Sugar",
  "Sugar syrup",
  "Sweet Vermouth",
  "Tea",
  "Tequila",
  "Tomato juice",
  "Triple sec",
  "Vodka",
  "Water",
  "Watermelon",
  "wears good",
  "Whiskey",
  "Yoghurt",
];

const glassName = [
  "Balloon Glass",
  "Beer Glass",
  "Beer mug",
  "Beer pilsner",
  "Brandy snifter",
  "Champagne flute",
  "Cocktail glass",
  "Coffee mug",
  "Collins glass",
  "Copper Mug",
  "Cordial glass",
  "Coupe Glass",
  "Highball glass",
  "Hurricane glass",
  "Irish coffee cup",
  "Jar",
  "Margarita glass",
  "Margarita/Coupette glass",
  "Martini Glass",
  "Mason jar",
  "Nick and Nora Glass",
  "Old-fashioned glass",
  "Parfait glass",
  "Pitcher",
  "Pint glass",
  "Pousse cafe glass",
  "Punch bowl",
  "Shot glass",
  "Whiskey Glass",
  "Whiskey sour glass",
  "White wine glass",
  "Wine Glass",
];

const setMeasureQuantitys =()=>{
  const measureQuantitys = [];
  for (let i = 1; i < 101; i++) {
    measureQuantitys.push(i);
  }
  return measureQuantitys;
}

const measureQuantitys = setMeasureQuantitys();

export {
  cocktailMeasures,
  categories,
  contentAlcoholic,
  ingredientsList,
  glassName,
  measureQuantitys,
}