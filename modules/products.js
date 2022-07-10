
export const getProducts = async (search, sort) => {
    
    let url = `http://localhost:3000/api/v1/product/${search}?sort=${sort}`;
    
    url += getPriceRangeQuery();

    url += getCategoryQuery();
    
    console.log(url);
    
    let products = await $.ajax({
        url
    });

    return products;

}

const getPriceRangeQuery = () => {

    let checkedCheckbox = checkedPriceRange();

    let hasACheckedCheckbox = checkedCheckbox.includes(true);
        
    const priceRangeQuery = hasACheckedCheckbox ? `&priceRange=${checkedCheckbox.join()}` : "";

    return priceRangeQuery;

}

const checkedPriceRange = () => {
    
    const priceRangeIds = ["#menor-1500", "#entre-1500-5000", "#mayor-5000"];
    const areChecked = [false, false, false];

    priceRangeIds.forEach((id, index) => {
        let checkbox = $(id);
        let isChecked = checkbox.is(':checked');
        areChecked[index] = isChecked;
    })

    return areChecked;

};

const getCategoryQuery = () => {

    let checkedCheckbox = checkedCategories();
    console.log({checkedCheckbox});
        
    const categoryQuery = checkedCheckbox.length > 0 ? `&categories=${checkedCheckbox.join()}` : "";

    return categoryQuery;

}

const checkedCategories = () => {

    let areChecked = [];

    $(".categorias input").each(function (index) {
        let isChecked = $( this ).is( ':checked' );
        if ( isChecked ) {
            let categoryId = $(this).val();
            areChecked.push(categoryId)
        }
    });

    console.log({areChecked});

    return areChecked;

};