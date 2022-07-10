export const createCategoryFilter = async () => {

    let categories = await getCategories();
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

export const getCategories = async () => {

    let url = `https://api-tiendabsale.herokuapp.com/api/v1/category`;
    
    console.log(url);
    
    let categories = await $.ajax({
        url
    });

    console.log(categories);

    return categories;

};

