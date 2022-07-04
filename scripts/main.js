
import {recipes} from '../data/recipes.js';
import {ExtractFilter} from './utils/extractFilter.js';
import {Filter} from './component/filter.js';
import {Search} from './component/search.js';

class App{
    constructor(recipes) {
            this.recipes = recipes;
    }
    async  init(){
       

        this.launchFilters();
        this.lunchSearch();
    }
 
    launchFilters () {
       
        const filtersList = new ExtractFilter(this.recipes);
        const ingredients = filtersList.getIngredients();
        const appliances = filtersList.getAppliances();
        const ustensils = filtersList.getUstensils();

        const ingredientDiv = document.querySelector("#button_ingredients");
        const appliancesDiv = document.querySelector("#button_appliances");
        const ustensilsDiv = document.querySelector("#button_ustensils");
        new Filter(ingredients,ingredientDiv,"bleu");
        new Filter(appliances,appliancesDiv,"vert");
        new Filter(ustensils,ustensilsDiv,"orange");
        
    } 

    lunchSearch(){
        const searchBar_input = document.querySelector('#searchBar_input');
        new  Search(searchBar_input,this.recipes);
    }


  
    
}



const app = new App(recipes);
app.init();


