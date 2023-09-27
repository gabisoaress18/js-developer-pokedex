const modalOpen = document.getElementById('janela-modal');
const buttonClose = document.getElementById('btn-close-modal');

pokemonList.onclick = function (event) {
    const pokemonNumber = event.target.closest('.pokemon').querySelector('.number').textContent.replace('#', '');
    loadAndPopulateModal(pokemonNumber);
    modalOpen.showModal();
}




function loadAndPopulateModal(pokemonNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
        .then(response => response.json())
        .then(data => {
            populateModal(data);
            const closeButton = document.getElementById('btn-close-modal');
            closeButton.onclick = function () {
                modalOpen.close();
            };
        })
        .catch(error => {
            console.error('Erro ao carregar dados da API:', error);
        });
}

function populateModal(data) {
    const modalContent = document.querySelector('.content-card');
    
    modalContent.innerHTML = `
        <div class=menu-card>
            <button id="btn-close-modal" type="button" class="btn-close" aria-label="Close"></button>
            <div class="cardName">        
                <h5 class="card-title">${data.name}</h5>
                <span class="number">#${data.id.toString().padStart(4, '0')}</span>
            </div>
        </div>
        <div class="card-head">
            <div class="card ${data.types[0].type.name}" style="width: 18rem">
                <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                <div class="card-head-body">
                    
                    <div class="detail-card">
                        <div class="types">
                            ${data.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">About</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Status</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">forms</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <ol class="about-list">
                        <li>
                            <h5>Weight</h5>
                            <p>${data.weight}kg</p>
                        </li>
                        <li>
                            <h5>Height</h5>
                            <p>${data.height}cm</p>
                        </li>
                    </ol>
                </div>
                <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <ol class="about-list">
                        ${data.stats.map(stat => `
                            <li>${stat.stat.name}: 
                                <div class="progress" role="progressbar" aria-label="${stat.stat.name}" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-danger" style="width: ${stat.base_stat}%">${stat.base_stat}</div>
                                </div>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>   
        </div>
    `;
}

const pokemonItems = document.querySelectorAll('.pokemon');
pokemonItems.forEach(item => {
    item.addEventListener('click', () => {
        const pokemonId = parseInt(item.querySelector('.number').textContent.replace('#', ''), 10);
        loadAndPopulateModal(pokemonId);
    });
});