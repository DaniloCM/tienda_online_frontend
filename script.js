import { createCards } from "./modules/cards.js";

$(() => {

    $(".form-buscar").on("submit", function (event) {
        event.preventDefault();

        const busqueda = $("#busqueda").val();

        $.ajax({
            url: `http://localhost:3000/api/v1/product/${busqueda}`,
            success: function (products) {
                let cards = createCards(products);

                $(".resultados").html(cards);
            }
        });
    })
})