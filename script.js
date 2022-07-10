import { createCards } from "./modules/cards.js";
import { getProducts } from "./modules/products.js";

$(() => {

    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();

        const search = $("#busqueda").val();
        const sort = $("#orden").val();

        let products = await getProducts(search, sort);

        let cards = createCards(products);

        $(".resultados").html(cards);
    })

    $("#menor-1500, #entre-1500-5000, #mayor-5000").on("change", async function (){

        
        const search = $("#busqueda").val();
        const sort = $("#orden").val();

        let products = await getProducts(search, sort);

        let cards = createCards(products);

        $(".resultados").html(cards);

    })

    $("#orden").on("change", async function (){
        
        const search = $("#busqueda").val();
        const sort = $("#orden").val();

        let products = await getProducts(search, sort);

        let cards = createCards(products);

        $(".resultados").html(cards);

    })
})

