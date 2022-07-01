export class ExtractFilter {
    constructor(recipes) {
        this.recipes = recipes;
    }
    toCapitalize(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    getIngredients () {
        let ingredients = [];
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                ingredients.push(this.toCapitalize(element.ingredient));
            });
        });
        ingredients = this.removeDuplicates(ingredients);
        return ingredients
    }
    getAppliances () {
        let appliances = [];
        this.recipes.forEach(recipe => {
            appliances.push(this.toCapitalize(recipe.appliance));
        });
        appliances = this.removeDuplicates(appliances);
        return appliances
    }
    getUstensils () {
        let ustensils = [];
        this.recipes.forEach(recipe => {
            recipe.ustensils.forEach(element => {
                ustensils.push(this.toCapitalize(element));
            });
        });
        ustensils = this.removeDuplicates(ustensils);
        return ustensils;
    }
    removeDuplicates (tags) {
        const result = tags.filter((element , position) => {
            return tags.indexOf(element) == position;
        })
        return result;
    }

    
   
}

