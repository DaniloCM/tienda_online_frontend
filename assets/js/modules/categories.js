// Crea el código HTML de los checkbox de los filtros por categorias
// cardsHTML(categories: array): string
export const createCategoryFilter = (categories) => {
    let categoriesHTML = "";
    
    categories.forEach(category => {
        
        let { name, id } = category;

        categoriesHTML += `
            <div class="form-check" id="category-${name.replace(/ /g, "-")}">
                <input class="form-check-input" type="checkbox" value="${id}" id="${name.replace(/ /g, "-")}">
                <label class="form-check-label" for="${name.replace(/ /g, "-")}">
                    ${name}
                </label>
                <span class="quantity"></span>
            </div>
        `

    });

    return categoriesHTML;
};


// Consulta las categorias a la API REST y entrega un array de objetos con información de ellos
// getCategories(): array
export const getCategories = async () => {
    let url = `https://api-tienda-online-danilo.herokuapp.com/api/v1/category`;
    
    let categories = await $.ajax({
        url
    });

    return categories;
};

