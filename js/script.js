const apiKey = '112e033b0371825ea9104e0cc8468490';  
const baseUrl = 'https://api.themoviedb.org/3';

async function getPopularSeries() {
    const response = await fetch(`${baseUrl}/tv/popular?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    return data.results; 
}

function createCarouselItem(serie, isActive) {
    const imageUrl = `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`;
    return `
        <div class="carousel-item ${isActive ? 'active' : ''}">
            <a href="serie.html">
                <img src="${imageUrl}" class="d-block w-100" alt="${serie.name}">
            </a>
            <div class="carousel-caption d-none d-md-block">
                <h5>${serie.name}</h5>
                <p>${serie.overview ? serie.overview : 'Descrição não disponível.'}</p>
            </div>
        </div>
    `;
}

function displayCarousel(series) {
    const carouselContent = document.getElementById('carousel-content');
    carouselContent.innerHTML = series.map((serie, index) => createCarouselItem(serie, index === 0)).join('');
}

getPopularSeries().then(displayCarousel);




async function fetchSeries() {
    try {
        const response = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language=pt-BR`);
        const series = response.data.results;
        
        createCards(series);
    } catch (error) {
        console.error("Erro ao buscar séries: ", error);
    }
}

function createCards(series) {
    const novasSeriesContainer = document.getElementById('novas-series');
    const minhasSeriesContainer = document.getElementById('minhas-series');

    series.forEach(serie => {

        novasSeriesContainer.innerHTML += `
            <div class="col">
                <div class="card">
                    <a href="serie.html?id=${serie.id}">
                        <img src="https://image.tmdb.org/t/p/w780/${serie.poster_path}" class="card-img-top" alt="${serie.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${serie.name}</h5>
                        <p class="card-text">${serie.overview ? serie.overview : 'Descrição não disponível.'}</p>
                    </div>
                </div>
            </div>
        `;

        
        minhasSeriesContainer.innerHTML += `
            <div class="col">
                <div class="card">
                    <a href="serie.html?id=${serie.id}">
                        <img src="https://image.tmdb.org/t/p/w780/${serie.poster_path}" class="card-img-top" alt="${serie.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${serie.name}</h5>
                        <p class="card-text">${serie.overview ? serie.overview : 'Descrição não disponível.'}</p>
                    </div>
                </div>
            </div>
            
        `;
    });
}

document.addEventListener('DOMContentLoaded', fetchSeries);
