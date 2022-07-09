$(() => {

    $(".form-buscar").on("submit", function (event) {
        event.preventDefault();

        const busqueda = $("#busqueda").val();
        let results;

        $.ajax({
            url: `http://localhost:3000/api/v1/product/${busqueda}`,
            success: function (response) {
                results = response;
            }
        });
    })

})