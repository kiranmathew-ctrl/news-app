document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://raw.githubusercontent.com/kiranmathew-ctrl/news-app/main/news.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');
                newsCard.innerHTML = `
                    <h2>${news.title}</h2>
                    <img src="${news.urlToImage}" alt="${news.title}" />
                    <p><strong>Author:</strong> ${news.author}</p>
                    <p><strong>Description:</strong> ${news.description}</p>
                    <p><strong>Published At:</strong> ${new Date(news.publishedAt).toLocaleDateString()}</p>
                    <a href="${news.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
