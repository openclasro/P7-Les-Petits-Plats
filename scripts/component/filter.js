import {filterEvent} from '../utils/events.js';

export class Filter {

    constructor(listFilters, filterUl,couleur) {
        this.listFilters = listFilters;
        this.filterUl = filterUl;
        this.filtersListDOM = []
        this.couleur = couleur;
        this.remplirFilter( this.listFilters);
        this.filterHandler();
        this.filterFilters();
        
        
    }

    filterHandler(){

        const filterButton =  this.filterUl.querySelector('.filters input');
        const ulFilters = this.filterUl.querySelector('ul');
        const iconFilter =  this.filterUl.querySelector('.angle');
        
        
        
        filterButton.addEventListener("click", () =>{
            ulFilters.classList.add('active');
            this.filterUl.firstElementChild.style.width ="340px";
            iconFilter.style.transform ="rotate(180deg)";
        
            for (let i = 0; i <  this.filtersListDOM.length; i++) {
                const element =  this.filtersListDOM[i];

                element.style.display = 'block';

                
            }

        })
        


        iconFilter.addEventListener("click", () =>{
            ulFilters.classList.remove('active');
            iconFilter.style.transform ="none";
         
            this.filterUl.firstElementChild.style.width ="250px";
            for (let i = 0; i <  this.filtersListDOM.length; i++) {
                const element =  this.filtersListDOM[i];
                element.style.display = 'none';
                
            }
            

        })
    }

    filterFilters(){
        const input = this.filterUl.querySelector('input');
        input.addEventListener('keyup',(e)=>{
          
            const key = e.target.value;
           
            const listFiltredFilter = this.listFilters.filter(filter => filter.toLowerCase().includes(key.toLowerCase()))
            this.remplirFilter(listFiltredFilter)

        });


    }


    remplirFilter(listFilters){
        const ulFilters = this.filterUl.querySelector('ul');
        ulFilters.innerHTML = "";
        listFilters.forEach(filter => {
            const liFilter = document.createElement('li');
            liFilter.innerHTML = filter;
            // liFilter.style.display = 'none';
           
            ulFilters.appendChild(liFilter);
            this.filtersListDOM.push(liFilter);
            liFilter.addEventListener('click',e => this.createTag(liFilter.innerHTML));
        
        });
    }

    createTag(text){

        const tag_list = document.querySelector('#tag_list');
        
        const liTag = document.createElement('li');
        
        liTag.className = "ingredient-"+this.couleur;
        const spanTag = document.createElement('span');
        spanTag.innerHTML = text;
        const iTag = document.createElement('i');
        iTag.className = "fa-regular fa-circle-xmark";
        iTag.addEventListener('click',(e)=>{
            let element =e.target;
            element.parentNode.parentNode.removeChild(element.parentNode);
            window.dispatchEvent(filterEvent);
        })

        liTag.appendChild(spanTag);
        liTag.appendChild(iTag);
        tag_list.appendChild(liTag);

        window.dispatchEvent(filterEvent);

        

// Listen for the event.


// Dispatch the event.

        
       

    }

}