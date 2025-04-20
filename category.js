
window.onscroll = function () {
    const header = document.querySelector('header');
    const category = document.querySelector('.category');
    if (window.scrollY > category.offsetTop) {
        header.classList.add('header-scrolled');
    }
    else {
        header.classList.remove('header-scrolled');
    }
}
const getGategories = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/categories`);
        return data;
    }
    catch (error) {
        return [];
    }
}
const printcategories = async () => {
    try {
        const resp = await getGategories();
        const print = resp.map((ele) =>
            `<div class="response">
     <h2>${ele}</h2>
     <a href="details.html?category=${ele}">Details</a>
    </div>`
        ).join(' ');

        document.querySelector(".category .row").innerHTML = print;

    }
    catch (error) {
        document.querySelector(".category .row").innerHTML = "<p>please try again</p>";
    }
    finally {
        document.querySelector(".loading").classList.add('d-none');
    }
}
printcategories();