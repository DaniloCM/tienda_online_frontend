<!-- # Prueba técnica: Desafío Bsale Producto -->
# Tienda Online

<!-- La prueba consiste en realizar una tienda online que despliegue los productos agrupados por categorías que pertenecen. -->
El proyecto consiste en realizar una tienda online que despliegue los productos agrupados por categorías que pertenecen.

Este repositorio corresponde a la parte frontend del proyecto.

El proyecto frontend tiene deploy en github-pages:
https://danilocm.github.io/tienda_online_frontend/
## Partes del frontend ##

El frontend tiene varias partes para ayudar a la búsqueda, filtro y experiencia del usuario.
Las partes son:

* Logo
* Barra de búsqueda
* Barra de despliegue
* Sección de filtros
* Sección de resultados
* Cartas de los productos
* Paginación

Veamos cada una de las partes y sus sub-partes

### Logo ###

El logo permite, además de mostrar el logo de la empresa, volver a recargar la página, volviendo a mostrar todos los productos sin filtros, ni búsqueda y con el orden predeterminado que es alfabético de la A a la Z.

### Barra de búsqueda ###

El buscador es donde se puede escribir el nombre o una parte del producto que se quiere buscar. Al apretar enter o click en la lupa, se realiza la búsqueda, mostrando los resultados en la sección de resultados.

### Barra de despliegue ###

Desde pantallas menores a los 768px de ancho se esconde la barra de búsqueda y aparece la barra de despliegue, que al clickarla se vuelve a mostrar la barra de búsqueda.

### Sección de filtros ###

Aquí se muestran los filtros con los que se puede acotar las búsquedas. Tenemos dos filtros:

* Categorías
* Precios

#### Categorías

Las categorías se obtiene de las registradas de la base de datos. Por ahora hay 7 categorías que son bebidas energética, pisco, ron, bebida, snack, cerveza y vodka.

#### Precios

Aquí es posible acotar los productos por 3 rangos de precios que son hasta $1500, entre $1500 a $5000 y más de $5000:

Cada filtro al lado de su nombre sale la cantidad de productos que coinciden con este. Este se refresca por cada búsqueda que se hace.

### Sección de resultados

Aquí hay dos partes: 

* Orden de búsqueda
* Cartas de los productos

Veamos aquí el orden de búsqueda, ya que las cartas la vemos luego y aparte porque contiene más componentes.

El orden de búsqueda es un desplegable que tiene cuatro formas de ordenar los productos buscados que son de forma alfabética A-Z, también de Z-A, de forma creciente y decreciente según el precio.

### Cartas de los productos

Cada Producto encontrado con las búsquedas están representados por una carta, que se muestran debajo del orden de búsqueda. La carta muestra del producto una imagen, el nombre, precio, el precio descontado si hay descuento, descuento si es que tiene y un botón de compra.

### Paginación

Los productos encontrados se dividen en varias páginas, donde cada página puede tener 8 productos como máximo. Al final de la sección de resultados se encuentra la paginación donde se puede seleccionar la página que se quiere ver.

## Funciones

Las funciones de la parte frontend se dividieron en un archivo principal:

* script.js

Y Tres módulos de este que son:

* cards.js
* categories.js
* pagination.js
* products.js

### script.js

Este es el archivo javascript principal, el cual contiene todas las escuchas de eventos y dos funciones principales.

#### Listens

Los eventos que se están escuchando son el submit de la barra de búsqueda, el cambio de los checkbox de las categorías como los del rango de precios, el cambio de la barra del orden de búsqueda y los clicks en uno de los números de la paginación.

#### Funciones

`createCards(products: array): void` Crea las cartas de los productos y los inserta en la sección resultados.

`productsForCategoriesAndPriceRange(categories: array, products: array): void` Agrega al lado del nombre del filtro el número de productos que coincide con cada uno, respecto a la búsqueda realizada.

`cleanFilters(): void` Limpia los filtros, deseleccionando los checkbox de los filtros.

`infoResults(products: array): void` Crea los detalles del resultado de la consulta a los productos, los cuales se muestran en el encabezadeza de la sección de resultados.

`infoFilters(products: array): void` Crea los detalles de los productos filtrados, los cuales se muestran en el encabezadeza de la sección de resultados.



### cards.js

Este módulo corresponde a la creación de código HTML de las cartas. Hay tres funciones que son:

`cardsHTML(products: array): string` Crea el código de las tarjetas con la información obtenida de la consulta a la API, que corresponde al parámetro products.

`img(url: string, name: string): string` Genera el tag img con la url de la imagen del producto (url) y con el nombre del producto (name) agrega un alt describiendo la imagen.

`priceAndDiscount(price: number, discount: number): string` Crea el párrafo con el precio y si hay descuento, se agrega el precio con descuento y el porcentaje de descuento.

### categories.js

Este módulo corresponde a la creación del código HTML de los filtros para las categorías y la consulta de las categorías a la API. Hay dos funciones que son:

`createCategoryFilter(categories: array): string` Crea el código HTML de los filtros de las categorías que están en la sección filtros. Este los realiza con la información obtenida de la API con la función getCategories().

`getCategories(): array` Obtiene las categorías de los productos con una consulta a la API.

### pagination.js

Este módulo corresponde a la creación de la paginación que se mostrara en pantalla. Hay dos funciones que son:

`pagination(products: array, pageClicked=1: number, isNewQuery=true: boolean): void` // Crea la paginación en la pantalla con los productos entregados. Se entrega la página que se selecciono (pageClicked) y si es una nueva consulta de los productos (isNewQuery) se crea toda la paginación, si no, solo se cambia el número de la página seleccionada.

`pageProducts = (products: array, pageClicked=1: number): array` Divide los productos de 8 en 8 y entrega los correspondiente a la página seleccionada.

### products.js

Este módulo corresponde a la consulta de los productos a la API. Hay cinco funciones que son:

`getProducts(): array` Obtiene los productos correspondientes a la búsqueda con los filtros aplicados y el orden seleccionado.

`getPriceRangeQuery(): string` Retorna el query de la url de la API correspondiente a el o los rangos de precios seleccionados.

`checkedPriceRange(): array` Retorna una array de booleano que indican si los checkboxs de los rangos de precios están seleccionados.

`getCategoryQuery(): string` Retorna el query de la url de la API correspondiente a él o las categorías seleccionadas.

`checkedPriceRange(): array` Retorna una array de booleano que indican si los checkboxs de las categorías están seleccionados.