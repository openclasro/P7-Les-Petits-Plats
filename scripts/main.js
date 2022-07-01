
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



    // const buttonIngredients = document.querySelectorAll('.filters input');
    // const buttonIngredient= document.querySelector("#iconIngredient");
    // const buttonAppliances= document.querySelector("#iconAppliances");
    // const buttonUstensils =document.querySelector("iconUstensils");
        
    //         const iconIngredients = document.querySelectorAll('.angle');
    //         const filtersList = document.querySelectorAll('.filterList');
    //         const input = document.querySelector('#filterIngredients');


    //         // input.addEventListener('click',()=>{
    //         //      iconIngredients.style.transform = "rotate(180deg)";
    //         //      filtersList.classList.add('active');
    //         //      buttonIngredients.style.width ="340px";
                


    //         // })

    //         // iconIngredients.addEventListener('click',()=>{
    //         //     iconIngredients.style.transform = "none";
    //         //     filtersList.classList.remove('active');
    //         //     buttonIngredients.style.width ="250px";

    //         // })


    //         for(let i=0; i< buttonIngredients.length; i++){
    //             buttonIngredients[i].addEventListener("click", () =>{
    //                 console.log("click button");
    //                 filtersList[i].classList.add('active');
    //                 buttonIngredient.style.width ="340px";
    //                 //  iconIngredients.style.transform = "rotate(180deg)";

    //             })
    //         }

    //         for( let i = 0; i<iconIngredients.length; i++){
    //             iconIngredients[i].addEventListener("click", () =>{
    //                 console.log("click icon");
    //                 filtersList[i].classList.remove('active');
    //                 buttonIngredient.style.width ="250px";
    //                 //  iconIngredients.style.transform = "none";
                    

    //             })
    //         }