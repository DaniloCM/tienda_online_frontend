import { createCards as cardsHTML } from "./modules/cards.js";
import { getCategories, createCategoryFilter } from "./modules/categories.js";
import { getProducts } from "./modules/products.js";

$(async () => {

    $(".categorias").html(await createCategoryFilter());
    createCards();


    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();
        createCards();
    })

    $("#menor-1500, #entre-1500-5000, #mayor-5000").on("change", async function (){
        createCards();
    })

    $("#orden").on("change", async function (){  
        createCards();
    })

    $(".categorias input").on("change", async function (){  
        createCards();
    })

})

const createCards = async () => {
    const search = $("#busqueda").val();
    const sort = $("#orden").val();

    let products = await getProducts(search, sort);

    let cards = cardsHTML(products);

    $(".resultados").html(cards);
}