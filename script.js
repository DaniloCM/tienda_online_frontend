import { cardsHTML } from "./modules/cards.js";
import { getCategories, createCategoryFilter } from "./modules/categories.js";
import { getProducts } from "./modules/products.js";

$(async () => {

    const categories = await getCategories();
    let products = await getProducts();

    $(".categorias").html(createCategoryFilter(categories));
    createCards(products);
    productsForCategoriesAndPriceRange(categories, products);


    $(".form-buscar, #cleanFilters").on("submit", async function (event) {
        event.preventDefault();
        cleanFilters();

        products = await getProducts();
        createCards(products);
        productsForCategoriesAndPriceRange(categories, products);
    })

    $("#cleanFilters").on("click", async function () {
        cleanFilters();

        products = await getProducts();
        createCards(products);
    })

    $("#menor-1500, #entre-1500-5000, #mayor-5000").on("change", async function (){
        products = await getProducts();
        createCards(products);
    })

    $("#orden").on("change", async function (){  
        products = await getProducts();
        createCards(products);
    })

    $(".categorias input").on("change", async function (){  
        products = await getProducts();
        createCards(products);
    })

})

const createCards = async (products) => {
    // const search = $("#busqueda").val();
    // const sort = $("#orden").val();

    // let products = await getProducts(search, sort);

    let cards = cardsHTML(products);

    $(".resultados").html(cards);
}

const productsForCategoriesAndPriceRange = async (categories, products) => {
    // const search = $("#busqueda").val();
    // const sort = $("#orden").val();

    // let products = await getProducts(search, sort);

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
}

var cleanFilters = () => {

    $(".categorias .form-check-input").prop("checked", false);
    $(".rango-precios .form-check-input").prop("checked", false);

};