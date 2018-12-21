(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
        headers: {
            'Authorization': 'Client-ID 812193ef71ca946e361ed541979a0cfd91e9419a19235fd05f51ea14233f020a'
        }
        }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'));

        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4f3c267e125943d79b0a3e679f608a78&q=${searchedForText}`)
        .then(response => response.json()).then(addArticles).catch(e => requestError(e, 'articles'));
    });  

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
   

    function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];
    
        if (firstImage) {
            htmlContent = `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }
    
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }  

    function addArticles(data) {
        let htmlContent = '';
        const articles = data.response.docs;
    
        if (articles) {
            htmlContent = '<ul>'+ articles.map (article => `<li class="article">
                        <h2>
                            <a href="${article.web_url}"> ${article.headline.main} 
                            </a>
                        </h2>
                        <p>${article.snippet}</p> 
                        </li>`
                        ).join('')+'</ul>';     
            
        } else {
            htmlContent = ' no articles available.'
        }
    
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }  
    



})();
  