const baseURL = "https://github.com/EthanNielsen1143/wdd230";
const linksURL = "https://raw.githubusercontent.com/EthanNielsen1143/wdd230/main/data/links.json";


async function getLinks() {
    const response = await fetch(linksURL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    else {
        console.log('Hello from the else statement')
        const data = await response.json();
        displayLinks(data);
    }
}

const displayLinks = (data) => {
    const lessons = data.lessons;

    const linkList = document.createElement('ul');

    lessons.forEach(lesson => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a'); 

        linkElement.href = lesson.links.url;
        linkElement.textContent = lesson.links.week + " | " + lesson.links.title;
        linkElement.target = "_blank";

        listItem.appendChild(linkElement);
        linkList.appendChild(listItem);
    });

    const cardContainer = document.querySelector('.card');
    cardContainer.appendChild(linkList);
}


getLinks();
