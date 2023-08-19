const apiKey = "5ec91123bcda434e9c5b9cc04efb6224"; //create your own API key from https://newsapi.org/ and paste it here
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India News"));

fetchNews = async (query)=>{
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    bindData(data.articles);
}

bindData = (articles)=>{
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
};

fillDataInCard = (cardClone, article)=>{
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
};


let selectedNav =null;
onNavItemClick = (id)=>{
    fetchNews(id);
    const navItem = document.getElementById(id);
    selectedNav?.classList.remove("active");
    selectedNav=navItem;
    selectedNav.classList.add("active");
};

const searchBtn = document.querySelector(".search-button");
const searchText = document.querySelector("#search-text");

searchBtn.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedNav?.classList.remove("active");
    selectedNav =null;
});

reload =()=>{
    window.location.reload();
}

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links ul");
const searchBar = document.querySelector(".search-bar");

mobileMenu.addEventListener("click", ()=>{
    if(navLinks.style.display!=="flex"&&
    searchBar.style.display!=="flex"){
        navLinks.style.display="flex";
        searchBar.style.display="flex";
    }else{
        navLinks.style.display="none";
        searchBar.style.display="none";
    }
});
