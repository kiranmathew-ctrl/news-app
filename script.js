const API_KEY = "912b8f70565c46b0b452cc96fd87459d";
const url = "https://newsapi.org/v2/everything?q=";
let currentPage = 1;
const articlesPerPage = 5;
let currentSort = 'publishedAt'; // Default sorting by date
let totalPages = 1;
let allArticles = [];

// Fetch the news when the page loads with a default query
window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        allArticles = data.articles;
        totalPages = Math.ceil(allArticles.length / articlesPerPage);
        renderNews();
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function renderNews() {
    const sortedArticles = sortArticles(allArticles, currentSort);
    const paginatedArticles = paginateArticles(sortedArticles);
    bindData(paginatedArticles);
    updatePaginationInfo();
}

function sortArticles(articles, sortBy) {
    return articles.sort((a, b) => {
        if (sortBy === 'publishedAt') {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
    });
}

function paginateArticles(articles) {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return articles.slice(start, end);
}

function updatePaginationInfo() {
    document.getElementById('page-info').innerText = `Page ${currentPage} of ${totalPages}`;
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Sorting event listener
document.getElementById('sort-select').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderNews();
});

// Pagination event listeners
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderNews();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderNews();
    }
});

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    currentPage = 1;  // Reset to page 1 when performing a new search
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
