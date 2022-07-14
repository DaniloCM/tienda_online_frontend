import { cardsHTML } from "./modules/cards.js";
import { getCategories, createCategoryFilter } from "./modules/categories.js";
import { getProducts } from "./modules/products.js";

//Función Ready
$(async () => {

    // Consulta a la API las categorias y todos los productos
    const categories = await getCategories();
    let products = await getProducts();

    // Se crea los filtros de las categorias, las cartas de todos los productos y los números de productos por filtros al cargar la página.
    $(".categorias").html(createCategoryFilter(categories));
    infoResults(products);
    createCards(products);
    productsForCategoriesAndPriceRange(categories, products);
    
    
    // LISTENERS
    
    //// Escucha el evento submit del formulario de búsqueda. Limpia los filtros, realizando una consulta de los productos a la API y muestra los productos en pantalla.
    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();
        cleanFilters();
        
        products = await getProducts();
        infoResults(products);
        createCards(products);
        productsForCategoriesAndPriceRange(categories, products);
    })

    //// Escucha el evento click del botón limpiar filtros. Limpia los filtros, realizando una consulta de los productos a la API y muestra los productos en pantalla.
    $("#cleanFilters").on("click", async function () {
        cleanFilters();

        products = await getProducts();
        infoResults(products);
        createCards(products);
    })

    //// Escucha si hay cambios en los filtros de rango de precios. Realiza una consulta de los productos a la API con los filtros seleccionados y muestra los productos en pantalla.
    $("#menor-1500, #entre-1500-5000, #mayor-5000").on("change", async function (){
        products = await getProducts();
        infoFilters(products);
        createCards(products);
    })

    //// Escucha si hay cambios en el selector de ordenar por. Realiza una consulta de los productos a la API con el orden seleccionado y muestra los productos en pantalla.
    $("#orden").on("change", async function (){  
        products = await getProducts();
        infoFilters(products);
        createCards(products);
    })

    //// Escucha si hay cambios en los filtros de categorias. Realiza una consulta de los productos a la API con los filtros seleccionados y muestra los productos en pantalla.
    $(".categorias input").on("change", async function (){  
        products = await getProducts();
        infoFilters(products);
        createCards(products);
    })

})


// FUNCIONES

//// Crea las cartas de los productos entregados y los inserta en la sección de resultados
//// createCards(products: array): void
const createCards = async (products) => {
    let cards = cardsHTML(products);

    $(".resultados").html(cards);
}


//// Coloca al lado del nombre del filtro el número de productos que pertenecen a esta
//// productsForCategoriesAndPriceRange(categories: array, products: array): void
const productsForCategoriesAndPriceRange = async (categories, products) => {
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


//// Limpia los filtros, deseleccionando los checkbox de los filtros
//// cleanFilters(): void
const cleanFilters = () => {
    $(".categorias .form-check-input").prop("checked", false);
    $(".rango-precios .form-check-input").prop("checked", false);
};


const infoResults = (products) => {

    const search = $("#busqueda").val();
    const quantityOfResults = products.length;

    const resultsTitle = search ? ` de '${search}'` : "";
    const quantityTitle = `${quantityOfResults} productos`;

    $("#titulo-resultados").html(resultsTitle);
    $("#cantidad-resultados").html(quantityTitle);
    $("#filtrados-resultados").html("");

};

const infoFilters = (products) => {

    const quantityOfResults = products.length;

    const filterTitle = quantityOfResults ? ` y ${quantityOfResults} filtrados` : "";

    $("#filtrados-resultados").html(filterTitle);

}