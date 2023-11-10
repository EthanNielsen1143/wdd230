const baseURL = "https://github.com/EthanNielsen1143/wdd230";
const linksURL = "https://github.com/EthanNielsen1143/wdd230/blob/main/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayLinks(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const displayLinks = (links) => {
    const linkList = document.createElement('ul');

    links.forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');

        linkElement.href = link.url;
        linkElement.textContent = link.name;
        linkElement.target = "_blank";

        listItem.appendChild(linkElement);
        linkList.appendChild(listItem);
    });

    const cardContainer = document.querySelector('.card');
    cardContainer.appendChild(linkList);
}

getLinks();
