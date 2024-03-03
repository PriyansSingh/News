const API_KEY="da733ee5ae254a39ac1fcb7d419246ed";
const URL="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));


function reload(){
    window.location.reload();
}

//${URL}${query}&apikey=${API_KEY}

async function fetchNews(query){
    const res=await fetch(`https://akash-akp.github.io/api-test/newsapi.js`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} ·${date}`;

    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url, "_blank");
    })

}

let currentSelectedNav=null;
function onnavitems(id){
    fetchNews(id);
    const navItems=document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav=navItems;
    currentSelectedNav.classList.add("active");

}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search");

searchButton.addEventListener("click", ()=> {
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
});



