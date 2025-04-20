window.onscroll = function () {
    const header = document.querySelector('header');
    const category = document.querySelector('.categories');
    if (window.scrollY > category.offsetTop) {
        header.classList.add('header-scrolled');
    }
    else {
        header.classList.remove('header-scrolled');
    }
}
const getProducts = async (page) => {
    try {
        const skip = (page - 1) * 10;
        const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
        return data;
    }
    catch (error) {
        return [];
    }
}
const printProducts = async (page = 1) => {
    try {
        const data = await getProducts(page);
        const numOfPages = Math.ceil(data.total / 10);
        console.log(numOfPages);
        const response = data.products;
        const print = response.map((ele) =>

            `<div class="pro">
       <h2>${ele.title}</h2>
       <img src=${ele.thumbnail} class="product-img">
    </div>`


        ).join(' ');
        document.querySelector(".categories .row").innerHTML = print;




        customModal();
        let paginationLink = ` `;
        if (page > 1) {
            paginationLink = `<li><button onclick=printProducts(${page - 1})>&lt;</button></li>`;

        }
        else {
            paginationLink = `<li><button disabled>&lt;</button></li>`;

        }

        for (let i = 1; i < numOfPages; i++) {
            paginationLink += `<li><button class="${i === page ? 'active' : ''}" onclick="printProducts(${i})">${i}</button></li>`;
        }
        if (page < numOfPages) {
            paginationLink += `<li><button onclick=printProducts(${parseInt(page) + 1})>&gt;</button></li>`;

        }
        else {
            paginationLink += `<li><button disabled>&gt;</button></li>`;

        }
        document.querySelector(".pag .pagination").innerHTML = paginationLink;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>please try again</p>";
    }
    finally {
        document.querySelector(".loading").classList.add('d-none');
    }

}
printProducts();

function customModal() {
    const modal = document.querySelector('.my-modal');
    const closeBtn = document.querySelector('.close-btn');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const images = Array.from(document.querySelectorAll('.product-img'));
    let currentIndex = 0;
    images.forEach(function (img) {
        img.addEventListener('click', (e) => {
            console.log(e.target);
            modal.classList.remove('d-none');
            modal.querySelector('img').setAttribute("src", e.target.src);

            const currentImg = e.target;
            currentIndex = images.indexOf(currentImg);
            console.log(currentIndex);

        });

    });
    closeBtn.addEventListener("click", (e) => {
        modal.classList.add('d-none');
    });
    rightBtn.addEventListener('click', (e) => {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        const src = images[currentIndex].getAttribute("src");
        modal.querySelector('img').setAttribute('src', src);

    });
    leftBtn.addEventListener('click', (e) => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        const src = images[currentIndex].getAttribute("src");
        modal.querySelector('img').setAttribute('src', src);

    });
    document.addEventListener('keydown', (e) => {
        if (e.code == "ArrowRight") {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector('img').setAttribute('src', src);
        }
        else if (e.code == "ArrowLeft") {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector('img').setAttribute('src', src);
        }
        else if (e.code == "Escape") {
            modal.classList.add("d-none");
        }
    })
}
