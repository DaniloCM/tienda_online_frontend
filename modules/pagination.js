// Crea la paginación en la pantalla con los productos entregados. Se entrega la página que se selecciono (pageClicked) y si es una nueva consulta de los productos (isNewQuery) se crea toda la paginación, si no, solo se cambia el número de la página seleccionada.
// pagination(products: array, pageClicked=1: number, isNewQuery=true: boolean)
export const pagination = (products, pageClicked = 1, isNewQuery = true) => {

    let productsLength = products.length;
    let numberOfPages = Math.ceil(productsLength / 8);
    
    if (isNewQuery) {
        let pages = "";
    
        for (let i = 1; i <= numberOfPages; i++) {
            pages += `
                <li class="page-item" id="page-${i}">
                    <button class="page-link">${i}</button>
                </li>
            `
        }
    
        $(".pagination").html(pages);
    }


    $(`.pagination li`).removeClass("active");
    $(`.pagination #page-${pageClicked}`).addClass("active");
};

// Divide los productos de 8 en 8 y entrega los correspondiente a la página seleccionada
// pageProducts = (products: array, pageClicked=1: number)
export const pageProducts = (products, pageClicked = 1) => {

    let start = (pageClicked - 1) * 8;
    let newProducts = products.splice(start, 8)
    return newProducts;
    
} 