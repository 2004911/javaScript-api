window.onscroll = function () {
    const header = document.querySelector('header');
    const category = document.querySelector('.details');
    if (window.scrollY > category.offsetTop) {
        header.classList.add('header-scrolled');
    }
    else {
        header.classList.remove('header-scrolled');
    }
}
const getDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const ele = urlParams.get('category');
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${ele}`);
        return data;
    }
    catch (error) {
        return [];
    }
}
const printDetails = async () => {
    try {
        const response = await getDetails();
        const print = response.map((ele) =>
            `<div class=detail>
            <img src=${ele.image} width="200px" height="200px">      
            <h2>${ele.title}</h2>
           <a href='product.html?id=${ele.id}'>Category Details</a>

        </div>`
        ).join('');
        document.querySelector(".details .row").innerHTML = print;
    }
    catch (error) {
        document.querySelector(".details .row").innerHTML = "<p>please try again</p>";
    }
    finally {
        document.querySelector(".loading").classList.add('d-none');
    }

}
printDetails();