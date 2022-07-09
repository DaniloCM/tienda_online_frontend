$(() => {

    $(".form-buscar").on("submit", function (event) {
        event.preventDefault();

        const busqueda = $("#busqueda").val();
        let results;

        $.ajax({
            url: `http://localhost:3000/api/v1/product/${busqueda}`,
            success: function (response) {
                results = response;

                let cards = results.map((result) => {
                    return `
                        <div class="col p-2">
                            <div class="card">
                                <img src="${result.url_image}" class="card-img-top" alt="Imagen de ${result.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${result.name}</h5>
                                    <p class="card-text">
                                        Precio: $${result.price}
                                        Descuento: ${result.discount}%
                                    </p>
                                    <a href="#" class="btn">
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });

                $(".resultados").html(cards.join(""));
            }
        });
    })
})