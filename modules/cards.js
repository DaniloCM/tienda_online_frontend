export const cardsHTML = ( products ) => {

    let cards = products.map(( product ) => {
        
        let { name, price, discount, url_image } = product;

        return `
            <div class="col p-2 d-flex justify-content-center">
                <div class="card ">
                   ${ img( url_image, name ) }
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

    return cards.join("");
}

const img = (url, name) => {

    if (!url) url = "../imgs/not_available.png"

    let imgTag = `
        <img src="${ url }" class="card-img-top" alt="Imagen de ${ name }">
    `
    return imgTag;
}

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