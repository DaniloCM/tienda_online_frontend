// Consulta los productos a la API REST, entrega un array de objetos con información de ellos y tambien los guarda en la sessionStorage para ocuparlo para la paginación
// getProducts(): array
export const getProducts = async () => {
    const search = $("#busqueda").val();
    const sort = $("#orden").val();
    
    let url = `https://api-tiendabsale.herokuapp.com/api/v1/product/${search}?sort=${sort}`;
    
    url += getPriceRangeQuery();

    url += getCategoryQuery();
    
    let products = await $.ajax({
        url
    });

    sessionStorage.setItem("products", JSON.stringify(products));

    return products;

}


// Crea una query string para los filtros de los rangos de precios, para utilizarlo en la URL de la consulta de los productos
// getPriceRangeQuery(): string
const getPriceRangeQuery = () => {

    let checkedCheckbox = checkedPriceRange();

    let hasACheckedCheckbox = checkedCheckbox.includes(true);
        
    const priceRangeQuery = hasACheckedCheckbox ? `&priceRange=${checkedCheckbox.join()}` : "";

    return priceRangeQuery;

}


// Comprueba los rangos de precios seleccionados y entrega un array con booleanos. Si el primer elemento es verdadero, el filtro de productos menores que $1500 esta seleccionado, el segundo para entre $1500 a $5000 y el último para los mayores de $5000
// checkedPriceRange(): array
const checkedPriceRange = () => {
    
    const priceRangeIds = ["#menor-1500", "#entre-1500-5000", "#mayor-5000"];
    const areChecked = [false, false, false];

    priceRangeIds.forEach((id, index) => {
        let checkbox = $(id);
        let isChecked = checkbox.is(':checked');
        areChecked[index] = isChecked;
    })

    return areChecked;

};


// Crea una query string para los filtros de las categorias, para utilizarlo en  URL de la consulta de los productos
// getCategoryQuery(): string
const getCategoryQuery = () => {

    let checkedCheckbox = checkedCategories();
        
    const categoryQuery = checkedCheckbox.length > 0 ? `&categories=${checkedCheckbox.join()}` : "";

    return categoryQuery;

}


// Comprueba las categorias seleccionadas y entrega un array con booleanos, donde si la categoria esta seleccionada, su elemendo del array sera verdadero, sino falso
// checkedCategories(): array
const checkedCategories = () => {

    let areChecked = [];

    $(".categorias input").each(function (index) {
        let isChecked = $( this ).is( ':checked' );
        if ( isChecked ) {
            let categoryId = $(this).val();
            areChecked.push(categoryId)
        }
    });

    return areChecked;

};