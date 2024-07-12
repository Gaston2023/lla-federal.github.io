// BIENVENIDA

document.addEventListener('DOMContentLoaded', function () {
    Swal.fire({
        title: 'Bienvenido a la web de LLA - Federal',
        text: 'by Gastón Monzón ',
        icon: 'success',
        backdrop: `#1f132d`,
        showConfirmButton: true,
        confirmButtonColor: 'rgba(66, 10, 99, 0.8)',
        confirmButtonText: 'OK',
    });
});



// NOTICIAS
window.addEventListener("load", function () {
    buscarInformacion();
    buscarImagenes();
});

function buscarImagenes() {
    const apiKey = 'ad05f78e18b94343a15dd5231ca7eceb';

    fetch('https://api.unsplash.com/search/photos?query=futbol+argentina&w=740&h=500', {
        headers: {
            'Authorization': 'Client-ID ' + apiKey,
            'Accept-Version': 'v1'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            const imagenes = data.results;
            for (let i = 0; i < 4; i++) {
                const img = document.getElementById('img' + i);
                img.setAttribute('src', imagenes[i].urls.regular);
            }
        })
        .catch((error) => {
            console.log('error', error);
        });
}

async function buscarInformacion() {
    const temaBuscar = 'Milei 2024';
    const apiKey = 'ad05f78e18b94343a15dd5231ca7eceb';

    await fetch(`https://newsapi.org/v2/everything?q=${temaBuscar}&sortBy=publishedAt&apiKey=${apiKey}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            const featuresSection = document.querySelector('.features');
            const limiteMostrar = 4;
            let elementosMostrados = 0;

            for (let i = 0; i < data.articles.length; i++) {
                if (elementosMostrados >= limiteMostrar) {
                    break;
                }

                const article = document.createElement('article');

                const aImage = document.createElement('a');
                aImage.href = '#';
                aImage.classList.add('image');

                const img = document.createElement('img');
                img.setAttribute('src', data.articles[i].urlToImage);
                img.setAttribute('alt', data.articles[i].title);
                aImage.appendChild(img);

                const h3 = document.createElement('h3');
                h3.classList.add('major');
                h3.textContent = data.articles[i].title;

                const p = document.createElement('p');
                let content = data.articles[i].content;
                if (content && content.length > 200) {
                    content = content.slice(0, 200) + '...';
                }
                p.textContent = content;

                const aLink = document.createElement('a');
                aLink.href = data.articles[i].url;
                aLink.classList.add('special');
                aLink.textContent = 'Leer +';

                article.appendChild(aImage);
                article.appendChild(h3);
                article.appendChild(p);
                article.appendChild(aLink);
                featuresSection.appendChild(article);

                elementosMostrados++;
            }

            const verMasBtn = document.createElement('button');

            verMasBtn.classList.add('ver-mas-btn');
            verMasBtn.textContent = 'Ver más noticias';

            verMasBtn.addEventListener('click', function () {
                for (let i = elementosMostrados; i < data.articles.length; i++) {
                    const article = document.createElement('article');

                    const aImage = document.createElement('a');
                    aImage.href = '#';
                    aImage.classList.add('image');

                    const img = document.createElement('img');
                    img.setAttribute('src', data.articles[i].urlToImage);
                    img.setAttribute('alt', data.articles[i].title);
                    aImage.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.classList.add('major');
                    h3.textContent = data.articles[i].title;

                    const p = document.createElement('p');
                    let content = data.articles[i].content;
                    if (content && content.length > 200) {
                        content = content.slice(0, 200) + '...';
                    }
                    p.textContent = content;

                    const aLink = document.createElement('a');
                    aLink.href = data.articles[i].url;
                    aLink.classList.add('special');
                    aLink.textContent = 'Learn more';

                    article.appendChild(aImage);
                    article.appendChild(h3);
                    article.appendChild(p);
                    article.appendChild(aLink);
                    featuresSection.appendChild(article);
                }

                verMasBtn.style.display = 'none';
            });


        })
        .catch((error) => {
            console.log('Error', error);
        });
}

// +INFO GOBIERNO

window.addEventListener("load", function () {
    buscarInformacionGobierno();
});

async function buscarInformacionGobierno() {
    const temaBuscar = 'Gobierno Milei';
    const apiKey = 'ad05f78e18b94343a15dd5231ca7eceb';

    await fetch(`https://newsapi.org/v2/everything?q=${temaBuscar}&sortBy=publishedAt&apiKey=${apiKey}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            const features2 = document.querySelector('.features2');

            const limiteMostrarInicial = 3;
            const limiteTotal = 6;
            let elementosMostrados = 0;

            function crearArticulo(articleData) {
                const article = document.createElement('article');

                const aImage = document.createElement('a');
                aImage.href = articleData.url;
                aImage.target = '_blank';
                aImage.classList.add('image');

                const img = document.createElement('img');
                img.setAttribute('src', articleData.urlToImage);
                img.alt = articleData.title;
                aImage.appendChild(img);

                const h3 = document.createElement('h3');
                h3.classList.add('major');
                h3.appendChild(document.createTextNode(articleData.title));

                const p = document.createElement('p');
                let content = articleData.content;
                if (content && content.length > 200) {
                    content = content.slice(0, 200) + '...';
                }
                p.appendChild(document.createTextNode(content));

                const aLink = document.createElement('a');
                aLink.classList.add('special');
                aLink.href = articleData.url;
                aLink.target = '_blank';
                aLink.appendChild(document.createTextNode('Leer +'));

                article.appendChild(aImage);
                article.appendChild(h3);
                article.appendChild(p);
                article.appendChild(aLink);

                features2.appendChild(article);
            }

            // Mostrar los primeros 3 artículos
            for (let i = 0; i < limiteMostrarInicial && i < data.articles.length; i++) {
                crearArticulo(data.articles[i]);
                elementosMostrados++;
            }

            // Crear el botón "Ver más noticias"
            const verMasBtn = document.createElement('button');

            verMasBtn.classList.add('ver-mas-btn');
            verMasBtn.appendChild(document.createTextNode('Ver más noticias'));

            verMasBtn.addEventListener('click', function () {
                const limiteMostrarAdicional = limiteTotal - elementosMostrados;
                for (let i = elementosMostrados; i < data.articles.length && i < elementosMostrados + limiteMostrarAdicional; i++) {
                    crearArticulo(data.articles[i]);
                }
                elementosMostrados += limiteMostrarAdicional;

                if (elementosMostrados >= limiteTotal) {
                    verMasBtn.style.display = 'none';
                }
            });

            if (data.articles.length > limiteMostrarInicial) {
                features2.appendChild(verMasBtn);
            }
        })
        .catch((error) => {
            console.log('Error', error);
        });
}

