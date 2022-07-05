import { RecipeFactory } from "../factory/recipeFactory.js";
import { Filter } from "../component/filter.js";
import { ExtractFilter } from "../utils/extractFilter.js";

export class Search {
  constructor(searchBar, recipes) {
    this.searchBar = searchBar;
    this.recipes = recipes;

    this.handleSearchBar();
    this.filterRecipesByTag();
    this.displayRecipes(this.recipes);
    // this.testAlgoTime();
  }

  handleSearchBar() {
    this.searchBar.addEventListener("input", (e) => {
      const searchQuery = e.target.value;
      if (searchQuery.length > 2) {
        console.time('algo1')
        const filtredRecipes = this.filterRecipesByString(searchQuery);
        console.timeEnd('algo1')
        this.displayRecipes(filtredRecipes);
        this.newFilterList(filtredRecipes);
      } else {
        this.displayRecipes(this.recipes);
        this.newFilterList(this.recipes);
      }
    });
  }

  testAlgoTime(){
     const tests = ['Lait de coco', 'Jus de citron', 'Crème de coco', 'Sucre', 'Glaçons', 'Thon Rouge (ou blanc)', 'Concombre', 'Tomate', 'Carotte', 'Citron Vert', 'Lait de Coco', 'Poulet', 'Coulis de tomate', 'Oignon', 'Poivron rouge', "Huile d'olive", 'Riz blanc', 'Thon en miettes', 'Oeuf dur', 'Maïs', 'Vinaigrette', 'Pâte feuilletée', 'Crème fraiche', 'Gruyère râpé', 'Moutarde de Dijon', 'Pâte brisée', 'Pomme', 'Oeuf', 'Sucre en Poudre', 'Sucre vanillé', 'Pâte sablée', 'Chocolat au lait', 'Crème liquide', 'Beurre', 'Fraise', 'Noix', 'Chocolat noir', 'Farine', 'Olives', 'Fromage de chèvre', 'Vinaigre Balsamic', 'Basilic', 'Roblochon', 'Pommes de terre', 'Jambon fumé', 'Vin blanc sec', 'Tomates cerises', 'Mozzarella', 'Jambon de parme', 'Pommes', 'Salade Verte', 'Rhubarbe', 'Eau', 'Mâche', 'Échalote', 'Vinaigre de cidre', 'Saucisse bretonne ou de toulouse', 'Farine de blé noir', 'Fromage à raclette', 'Lait', 'Beurre salé', 'Banane', 'Pennes', "Huile d'olives", 'Pastèque', 'Menthe', 'Ananas', 'Glace à la vanille', 'Kiwi', 'Citron', 'Sucre glace', 'Tagliatelles', 'Lardons', 'Parmesan', 'Spaghettis', 'Viande hachée 1% de matière grasse', 'Vin rouge', 'Crème Fraiche', 'Crème Fraîche', 'Macaronis', 'Mayonnaise', 'Chocolat noir en pepites', 'Ail', 'Oseille', 'Crème fraîche', 'Vermicelles', 'Poireau', 'Crême fraîche', 'Pois chiches', 'Paprika', 'Pois Cassé', 'Haricots verts', 'Petits poids', 'Pain de mie', 'Blanc de dinde', 'Emmental', 'Gruyère', 'Noix de muscade', 'Saumon Fumé', 'Feuilles de laitue'];
     console.time('algo1')
     for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        const filtredRecipes = this.filterRecipesByString(test); 
     }
     console.timeEnd('algo1')
    
  }

  /**
   *
   * @param {String} str  : la chaine de carectere tapé par l'utilisateur dans la bar de recherche
   * @returns  {List} recipe : la liste des recette corespendante à la recherche de l'utilisateur
   * @version 1.0
   */
  filterRecipesByString(str) {
    const searchedRecipes = this.recipes.filter((element) => {
      const match = this.inputRecipeFinder(str, element);
      if (match == true) {
        return element;
      }
    });

    return searchedRecipes;
  }

  
  inputRecipeFinder(str, element) {
    const findInTitle = this.searchInTitle(element, str);
    const findInDescription = this.searchInDescription(element, str);
    const findInIngredients = this.searchInIngredients(element, str);
    if (findInTitle || findInDescription || findInIngredients == true) {
      return true;
    } else {
      return false;
    }
  }

  searchInTitle(element, str) {
    return element.name.toLowerCase().includes(str);
  }

  searchInIngredients(element, str) {
    return element.ingredients.some((element) => {
      return element.ingredient.toLowerCase().includes(str);
    });

    }
    searchInDescription(element, str) {
    return element.description.toLowerCase().includes(str);
    }



  filterRecipesByStringIngredients(str, recipes) {
    let filtredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      recipe.ingredients.filter((ingredient) => {
        if (
          ingredient.ingredient.toLowerCase().includes(str.toLowerCase().trim())
        ) {
          filtredRecipes.push(recipe);
        }
      });
    }
    return filtredRecipes;
  }

  filterRecipesByStringAppliances(str, recipes) {
    let filtredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.appliance.toLowerCase().includes(str.toLowerCase())) {
        filtredRecipes.push(recipe);
      }
    }

    return filtredRecipes;
  }

  filterRecipesByStringUstensils(str, recipes) {
    let filtredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      recipe.ustensils.filter((ustensil) => {
        if (ustensil.toLowerCase().includes(str.toLowerCase().trim())) {
          filtredRecipes.push(recipe);
        }
      });
    }
    return filtredRecipes;
  }

  filterRecipesByTag() {
    window.addEventListener("filterEvent", (e) => {
      const tags = document.querySelectorAll("#tag_list li");

      let filtredRecipes = this.recipes;

      tags.forEach((tag) => {
        const couleur = tag.className.split("-")[1];

        const tagText = tag.firstElementChild.innerHTML;

        console.log(couleur);
        console.log(tagText);
        switch (couleur) {
          case "bleu":
            filtredRecipes = this.filterRecipesByStringIngredients(
              tagText,
              filtredRecipes
            );

            break;
          case "orange":
            filtredRecipes = this.filterRecipesByStringUstensils(
              tagText,
              filtredRecipes
            );
            break;
          case "vert":
            filtredRecipes = this.filterRecipesByStringAppliances(
              tagText,
              filtredRecipes
            );
            break;

          default:
            break;
        }
      });

      this.displayRecipes(filtredRecipes);
      this.newFilterList(filtredRecipes);
    });
  }


  displayRecipes(recipes) {
    const resultSearch = document.querySelector("#resultSearch");

    resultSearch.innerHTML = "";
    if (recipes.length === 0) {
      resultSearch.innerHTML = `<div class="result-section">Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc...</div>`;
    }
    recipes.forEach((recipe) => {
      const recipeFactory = new RecipeFactory(recipe);
      resultSearch.appendChild(recipeFactory.getDOM());
    });
  }

  newFilterList(recipes) {
    const filtersList = new ExtractFilter(recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();

    const ingredientDiv = document.querySelector("#button_ingredients");
    const appliancesDiv = document.querySelector("#button_appliances");
    const ustensilsDiv = document.querySelector("#button_ustensils");
    new Filter(ingredients, ingredientDiv, "bleu");
    new Filter(appliances, appliancesDiv, "vert");
    new Filter(ustensils, ustensilsDiv, "orange");
  }
}
