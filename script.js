import { createCards } from "./modules/cards.js";

$(() => {

    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();

        const search = $("#busqueda").val();
        const sort = $("#orden").val();
        
        const url = `http://localhost:3000/api/v1/product/${search}?sort=${sort}`;

        let products = await $.ajax({
            url
        }); 

        let cards = createCards(products);

        $(".resultados").html(cards);
    })
})