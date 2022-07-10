export const createCategoryFilter = async () => {

    let categories = await getCategories();
    let categoriesHTML = "";
    
    categories.forEach(category => {
        
        let { name, id } = category;

        categoriesHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${id}" id="category-${name}">
                <label class="form-check-label" for="category-${name}">
                    ${name}
                </label>
            </div>
        `

    });

    return categoriesHTML;

};

export const getCategories = async () => {

    let url = `http://localhost:3000/api/v1/category`;
    
    console.log(url);
    
    let categories = await $.ajax({
        url
    });

    console.log(categories);

    return categories;

};

