window.onscroll = function () {
    const header = document.querySelector('header');
    const category = document.querySelector('.prod');
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

        const id = urlParams.get('id');

        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return data;
    }
    catch (error) {
        return [];
    }
}
const printDetails = async () => {
    try {
        const ele = await getDetails();
        const print = `
<div class="see">
<img src=${ele.image}>
<h2>Name: ${ele.title}</h2>
<h2>Description: ${ele.description}</h2>
<h2>Rating rate: ${ele.rating.rate}</h2>
<h2>Rating Count: ${ele.rating.count}</h2>

</div>
`;

        document.querySelector(".prod .row").innerHTML = print;
    }
    catch (error) {
        document.querySelector(".prod .row").innerHTML = "<p>please try again</p>";
    }
    finally {
        document.querySelector(".loading").classList.add('d-none');
    }
}
printDetails();