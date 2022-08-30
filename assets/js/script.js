import { cardsHTML } from "./modules/cards.js";
import { getCategories, createCategoryFilter } from "./modules/categories.js";
import { getProducts } from "./modules/products.js";
import { pagination, pageProducts } from "./modules/pagination.js";

//Función Ready
$(async () => {

    // Consulta a la API las categorias y todos los productos
    const categories = await getCategories();
    let products = await getProducts();

    // Se crea los filtros de las categorias, las cartas de todos los productos y los números de productos por filtros al cargar la página.
    pagination(products);
    $(".categorias").html(createCategoryFilter(categories));
    productsForCategoriesAndPriceRange(categories, products);
    infoResults(products);
    products = pageProducts(products);
    createCards(products);
    
    
    // LISTENERS
    
    //// Escucha el evento submit del formulario de búsqueda. Limpia los filtros, realizando una consulta de los productos a la API, crea la paginación comenzando en la primera página y muestra los productos en pantalla.
    $(".form-buscar").on("submit", async function (event) {
        event.preventDefault();
        cleanFilters();
        
        products = await getProducts();
        infoResults(products);
        productsForCategoriesAndPriceRange(categories, products);
        pagination(products);
        products = pageProducts(products);
        createCards(products);
    })

    //// Escucha el evento click del botón limpiar filtros. Limpia los filtros, realizando una consulta de los productos a la API, crea la paginación comenzando en la primera página y muestra los productos en pantalla.
    $("#cleanFilters").on("click", async function () {
        cleanFilters();

        products = await getProducts();
        infoResults(products);
        pagination(products);
        products = pageProducts(products);
        createCards(products);
    })

    //// Escucha si hay cambios en los filtros de rango de precios. Realiza una consulta de los productos a la API con los filtros seleccionados, crea la paginación comenzando en la primera página y muestra los productos en pantalla.
    $("#menor-1500, #entre-1500-5000, #mayor-5000").on("change", async function (){
        products = await getProducts();
        infoFilters(products);
        pagination(products);
        products = pageProducts(products);
        createCards(products);
    })

    //// Escucha si hay cambios en el selector de ordenar por. Realiza una consulta de los productos a la API con el orden seleccionado, crea la paginación comenzando en la primera página y muestra los productos en pantalla.
    $("#orden").on("change", async function (){  
        products = await getProducts();
        infoFilters(products);
        pagination(products);
        products = pageProducts(products);
        createCards(products);
    })

    //// Escucha si hay cambios en los filtros de categorias. Realiza una consulta de los productos a la API con los filtros seleccionados, crea la paginación comenzando en la primera página y muestra los productos en pantalla.
    $(".categorias input").on("change", async function (){  
        products = await getProducts();
        infoFilters(products);
        pagination(products);
        products = pageProducts(products);
        createCards(products);
    })

    //// Escucha si se hace click en uno de los botones de la paginación. Se selecciona la pagína y se muestran los productos que estan en ella.
    $(document).on("click", ".pagination button", async function(){
        // Consulta los productos en la sessionStorage
        products = JSON.parse(sessionStorage.getItem("products"));
        
        // Se consulta que número de página se selecciono
        let pageClicked = Number($(this).html());
        
        // Activa la página que se selecciono, se limitan los productos que son de la página y se muestran los productos en la pantalla
        pagination(products, pageClicked, false);
        products = pageProducts(products, pageClicked);
        createCards(products);
    });

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


//// Crea los detalles del resultado de la consulta a los productos, los cuales se muestran en el encabezadeza de la sección de resultados
//// infoResults(products: array): void
const infoResults = (products) => {

    const search = $("#busqueda").val();
    const quantityOfResults = products.length;

    const resultsTitle = search ? ` de '${search}'` : "";
    const quantityTitle = `${quantityOfResults} productos`;

    $("#titulo-resultados").html(resultsTitle);
    $("#cantidad-resultados").html(quantityTitle);
    $("#filtrados-resultados").html("");

};


//// Crea los detalles de los productos filtrados, los cuales se muestran en el encabezadeza de la sección de resultados
//// infoFilters(products: array): void
const infoFilters = (products) => {

    const quantityOfResults = products.length;

    const filterTitle = quantityOfResults ? ` y ${quantityOfResults} filtrados` : "";

    $("#filtrados-resultados").html(filterTitle);

}