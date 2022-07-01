export class RecipeFactory {
    constructor (recipe) {
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }
  
    getDOM () {
        const article = document.createElement("article");

        const imgTag = document.createElement("img");


        const recipe__description = document.createElement("div");
        recipe__description.classList = "recipe_description";

        const h1 = document.createElement('h1');
        h1.className = "recipe_description_title";
        h1.innerHTML = this.name;

        const recipe_description_time = document.createElement("div");
        recipe_description_time.classList = "recipe_description_time";
                
        recipe_description_time.innerHTML = `<i class="fa-regular fa-clock"></i>
        <span>${this.time} min</span>`;
        recipe__description.appendChild(h1);
        recipe__description.appendChild(recipe_description_time);


        const recipe_description_centent = document.createElement("div");
        recipe_description_centent.classList = "recipe_description_centent";
        
        const recipe_description_centent_ingredients = document.createElement("div");
        recipe_description_centent_ingredients.classList = "recipe_description_centent_ingredients";
        

        this.ingredients.forEach(ingredient =>{
            if(ingredient.unit && ingredient.quantity != undefined){
                recipe_description_centent_ingredients.innerHTML += `<p class="">${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}</p>`
            // }else if(ingredient.unit !=undefined && ingredient.quantity == undefined){
            //     recipe_description_centent_ingredients.innerHTML += `<p class="">${ingredient.ingredient}: ${ingredient.unit}</p>`
            }else if(ingredient.quantity !=undefined && ingredient.unit == undefined){
                recipe_description_centent_ingredients.innerHTML += `<p class="">${ingredient.ingredient}: ${ingredient.quantity}</p>`
            }else{
                recipe_description_centent_ingredients.innerHTML += `<p class="">${ingredient.ingredient}</p>`

            }
          
        })

        const description = document.createElement("p");
        description.className = 'recipe_description_centent_description';
        description.innerHTML = this.description;

        recipe_description_centent.appendChild(recipe_description_centent_ingredients);
        recipe_description_centent.appendChild(description);

        article.appendChild(imgTag);
        article.appendChild(recipe__description);
        article.appendChild(recipe_description_centent);

        return article;
        
    }
}