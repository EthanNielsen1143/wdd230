document.addEventListener('DOMContentLoaded', function() {
    const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json".trim();
    const cards = document.querySelector("#cards");

    async function getProphetData() {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data.prophets);
        displayProphets(data.prophets);
    }

    const displayProphets = (prophets) => {
        prophets.forEach((prophet) => {
            const card = document.createElement('section');
            const fullName = document.createElement('h2');
            const portrait = document.createElement('img');
            const dob = document.createElement('h3');
            const pob = document.createElement('h3');

            fullName.textContent = `${prophet.lastname}, ${prophet.name}`;
            dob.textContent = `${prophet.birthdate}`;
            pob.textContent = `${prophet.birthplace}`;

            portrait.setAttribute('src', prophet.imageurl);
            portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
            portrait.setAttribute('loading', 'lazy');
            portrait.setAttribute('width', '340');
            portrait.setAttribute('length', '440');


            card.appendChild(fullName);
            card.appendChild(dob);
            card.appendChild(pob);
            card.appendChild(portrait);

            cards.appendChild(card);
        });
    }

    getProphetData();
});