export const createCards = ( products ) => {
    
    console.log(products);

    let cards = products.map(( product ) => {
        
        let { name, price, discount, url_image } = product;

        return `
            <div class="col p-2">
                <div class="card ">
                   ${img(url_image, name)}
                    <div class="card-body">
                        <h5 class="card-title">${ name }</h5>
                        <p class="card-text">
                            Precio: $${ price }
                            Descuento: ${ discount }%
                        </p>
                        <a href="#" class="btn">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </a>
                    </div>
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



}