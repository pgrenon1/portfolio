document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            await loadContent(section);
            updateTitle(section);
        });
    });

    // Handle initial load and browser navigation
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});

async function handleHashChange() {
    let hash = window.location.hash.slice(1) || 'home';
    if (hash === 'home') {
        document.getElementById('dynamic-content').innerHTML = '';
        updateTitle('');
        return;
    }
    
    const link = document.querySelector(`nav a[data-section="${hash}"]`);
    if (link) {
        await loadContent(hash);
        updateTitle(hash);
    }
}

function updateTitle(section) {
    const titleElement = document.querySelector('#title a');
    if (section && section !== 'home') {
        titleElement.textContent = `phil_grenon.${section}`;
    } else {
        titleElement.textContent = 'phil_grenon';
    }
}

async function loadContent(section) {
    try {
        if (section === 'games') {
            await loadGamesContent();
            return;
        }

        const response = await fetch(`content/${section}.html`);
        if (!response.ok) throw new Error('Content not found');
        const content = await response.text();
        document.getElementById('dynamic-content').innerHTML = content;
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('dynamic-content').innerHTML = '<p>Content not found</p>';
    }
}

async function loadGamesContent() {
    try {
        const response = await fetch('games.json');
        if (!response.ok) throw new Error('Games data not found');
        const data = await response.json();
        
        const gamesHtml = await fetch('content/games.html');
        const gamesTemplate = await gamesHtml.text();
        document.getElementById('dynamic-content').innerHTML = gamesTemplate;

        const gamesGrid = document.querySelector('.games-grid');
        
        data.games.forEach(game => {
            const gameCard = document.createElement('article');
            gameCard.className = 'game-card';
            
            let linksHtml = '';
            if (game.links) {
                linksHtml = '<div class="game-links">';
                for (const [key, url] of Object.entries(game.links)) {
                    linksHtml += `<a href="${url}" target="_blank">+ ${key}</a>`;
                }
                linksHtml += '</div>';
            }
            
            gameCard.innerHTML = `
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                ${linksHtml}
            `;
            
            gamesGrid.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Error loading games:', error);
        document.getElementById('dynamic-content').innerHTML = '<p>Failed to load games</p>';
    }
} 