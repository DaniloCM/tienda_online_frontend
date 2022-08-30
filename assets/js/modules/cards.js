// Crea el código HTML de las cartas de los productos
// cardsHTML(products: array): string
export const cardsHTML = ( products ) => {

    let cards = products.map(( product ) => {
        
        let { name, price, discount, url_image } = product;

        return `
            <div class="col p-2 d-flex justify-content-center">
                <div class="card ">
                    <div class="img">
                        ${ img( url_image, name ) }
                    </div>
                    <div class="card-body">
                        <h5 class="card-title mb-3">${ name }</h5>
                        <p class="card-text">
                            ${ priceAndDiscount( price, discount ) }
                        </p>
                    </div>
                    <buttom class="btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </buttom>
                </div>
            </div>
        `;
    });

    if(cards.join("") === "") return "<div>Sin resultados</div>";

    return cards.join("");
}


// Crear la etiqueta HTML de la imagen de los productos que estan en la cartas
// img(url: string, name: string): string
const img = (url, name) => {

    if (!url) url = "./assets/img/not_available.png";

    let imgTag = `
        <img src="${ url }" class="card-img-top" alt="Imagen de ${ name }">
    `
    return imgTag;
}


// Crea el contenido dentro del parrafo de los precios y descuentos del producto
// priceAndDiscount(price: number, discount:number): string
const priceAndDiscount = (price, discount) => {

    let discountString = "";
    let priceString = `Precio: $${price}`
    
    if (discount > 0){
        
        let priceWithDiscount = price * (1 - discount / 100);
        
        discountString = `Descuento: <span class="discount">${discount}%</span>`;
        priceString = `Precio: <span class="oldPrice">$${price}</span> <span class="newPrice">$${priceWithDiscount}</span>`
    }


    return `
        ${priceString}<br>
        ${discountString}
    `

}