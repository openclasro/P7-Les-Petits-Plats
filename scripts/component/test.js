

function handleSearchBar() {
    for(let i=0; i< test.length ; i++){
 const searchQuery = test[i];
       if(searchQuery.length > 2){
           const filtredRecipes = filterRecipesByString(searchQuery);
       }
 }

}

function    searchInTitle (element, data) {
   return element.name.toLowerCase().includes(data);
}

function    searchInIngredients (element, data) {
   return element.ingredients.some(element => {
       return element.ingredient.toLowerCase().includes(data);
   });
}

function    searchInDescription (element, data) {
   return element.description.toLowerCase().includes(data)
}


//looking for a match
function inputMatch (inputData, element) {
const findInTitle = searchInTitle(element, inputData);
const findInDescription = searchInDescription(element, inputData);
const findInIngredients = searchInIngredients(element, inputData);
if (findInTitle || findInDescription || findInIngredients == true) {
   return true;
}
else {
   return false;
}
}
function  filterRecipesByString(str){

  
  const searchedRecipes = recipes.filter(element => {
       const match = inputMatch(str, element);
       if (match == true) {
           return element;
       }
   });

   
  return searchedRecipes;
   
}





handleSearchBar();