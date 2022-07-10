import { cardsHTML } from "./modules/cards.js";
import { getCategories, createCategoryFilter } from "./modules/categories.js";
import { getProducts } from "./modules/products.js";

$(async () => {

    $(".categorias").html(await createCategoryFilter());
    createCards();
    productsForCategoriesAndPriceRange();


    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();
        createCards();
        productsForCategoriesAndPriceRange();
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

const productsForCategoriesAndPriceRange = async () => {
    const search = $("#busqueda").val();
    const sort = $("#orden").val();

    let products = await getProducts(search, sort);
    let categories = await getCategories();

    categories.forEach((category) => {
        let quantityOfProducts = products
            .filter(product => category.id === product.category)
            .length;

        let categorySectionId = `#category-${category.name.replace(/ /g, "-")}`

        $(`.filtros .categorias ${categorySectionId} .quantity`).html(`
            (${quantityOfProducts})
        `);
    });

    let quantityOfProductsForRangePrice = [0, 0, 0]

    products.forEach(product => {
        let { price, discount } = product
        let priceAfterDiscount = price * (1 - (discount/100))

        if (priceAfterDiscount < 1500)
            quantityOfProductsForRangePrice[0]++;

        if (priceAfterDiscount >= 1500 && priceAfterDiscount <= 5000)
            quantityOfProductsForRangePrice[1]++;

        if (priceAfterDiscount > 5000)
            quantityOfProductsForRangePrice[2]++;
    })

    $("#rango-menor-1500 .quantity").html(`
        (${quantityOfProductsForRangePrice[0]})
    `);
    $("#rango-entre-1500-5000 .quantity").html(`
        (${quantityOfProductsForRangePrice[1]})
    `); 
    $("#rango-mayor-5000 .quantity").html(`
        (${quantityOfProductsForRangePrice[2]})
    `);

    console.log(quantityOfProductsForRangePrice);
}