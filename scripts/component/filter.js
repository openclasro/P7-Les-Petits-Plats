import { filterEvent } from "../utils/events.js";

export class Filter {
  constructor(listFilters, filterUl, couleur) {
    this.listFilters = listFilters;
    this.filterUl = filterUl;
    this.filtersListDOM = [];
    this.couleur = couleur;
    this.remplirFilter(this.listFilters);
    this.filterHandler();
    this.filterFilters();
  }
  closeAutherFilter() {
    const filterButtons = document.querySelectorAll(".filterButton");
    filterButtons.forEach((filter) => {
      if (filter.id != this.filterUl.id) {
        const otherulFilters = filter.querySelector("ul");
        const iconFilter = filter.querySelector(".angle");
        otherulFilters.classList.remove("active");
        iconFilter.style.transform = "none";
      }
    });
  }

  openFilter() {
    const ulFilters = this.filterUl.querySelector("ul");
    const iconFilter = this.filterUl.querySelector(".angle");

    ulFilters.classList.add("active");

    iconFilter.style.transform = "rotate(180deg)";

    for (let i = 0; i < this.filtersListDOM.length; i++) {
      const element = this.filtersListDOM[i];

      element.style.display = "block";
      switch (this.couleur) {
        case "bleu":
          this.filterUl.querySelector(
            "div > input:first-of-type "
          ).placeholder = "Rechercher un ingredient";
          break;
        case "vert":
          this.filterUl.querySelector(
            "div > input:first-of-type "
          ).placeholder = "Rechercher un Appareil";
          break;
        case "orange":
          this.filterUl.querySelector(
            "div > input:first-of-type "
          ).placeholder = "Rechercher un Ustensile";
          break;
      }
    }
  }
  filterHandler() {
    const filterButton = this.filterUl.querySelector(".filters input");
    const ulFilters = this.filterUl.querySelector("ul");
    const iconFilter = this.filterUl.querySelector(".angle");

    filterButton.addEventListener("click", () => {
      this.closeAutherFilter();
      this.openFilter();
    });

    iconFilter.addEventListener("click", () => {
      ulFilters.classList.remove("active");
      iconFilter.style.transform = "none";

      for (let i = 0; i < this.filtersListDOM.length; i++) {
        const element = this.filtersListDOM[i];
        element.style.display = "none";
        switch (this.couleur) {
          case "bleu":
            this.filterUl.querySelector(
              "div > input:first-of-type "
            ).placeholder = "ingredients";
            break;
          case "vert":
            this.filterUl.querySelector(
              "div > input:first-of-type "
            ).placeholder = "Appareils";
            break;
          case "orange":
            this.filterUl.querySelector(
              "div > input:first-of-type "
            ).placeholder = "Ustensiles";
            break;
        }
      }
    });
  }

  filterFilters() {
    const input = this.filterUl.querySelector("input");
    input.addEventListener("keyup", (e) => {
      const key = e.target.value;
      const listFiltredFilter = this.listFilters.filter((filter) =>
        filter.toLowerCase().includes(key.toLowerCase())
      );
      this.remplirFilter(listFiltredFilter);
    });
  }

  remplirFilter(listFilters) {
    const ulFilters = this.filterUl.querySelector("ul");
    ulFilters.innerHTML = "";
    listFilters.forEach((filter) => {
      const liFilter = document.createElement("li");
      liFilter.innerHTML = filter;
      ulFilters.appendChild(liFilter);
      this.filtersListDOM.push(liFilter);
      liFilter.addEventListener("click", (e) =>
        this.createTag(liFilter.innerHTML)
      );
    });
  }

  createTag(text) {
    const tag_list = document.querySelector("#tag_list");

    const liTag = document.createElement("li");

    liTag.className = "ingredient-" + this.couleur;
    const spanTag = document.createElement("span");
    spanTag.innerHTML = text;
    const iTag = document.createElement("i");
    iTag.className = "fa-regular fa-circle-xmark";
    iTag.addEventListener("click", (e) => {
      let element = e.target;
      element.parentNode.parentNode.removeChild(element.parentNode);
      window.dispatchEvent(filterEvent);
    });

    liTag.appendChild(spanTag);
    liTag.appendChild(iTag);
    tag_list.appendChild(liTag);

    window.dispatchEvent(filterEvent);
  }
}
