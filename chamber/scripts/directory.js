document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");

    const rootFile = "../../data/members.json";
    let isGridView = true; // Initial view is grid

    async function getMembers() {
        const response = await fetch(rootFile);
        const data = await response.json();
        return data;
    }

    function displayMembers(data) {
        const members = data.members;
        const membersContainer = document.querySelector(".members-container");

        // Clear existing content before displaying new content
        membersContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");

            const name = document.createElement("h2");
            name.textContent = member.name;
            card.appendChild(name);

            const address = document.createElement("p");
            address.textContent = member.address;
            card.appendChild(address);

            const phone = document.createElement("p");
            phone.textContent = member.phoneNumber;
            card.appendChild(phone);

            const website = document.createElement("p");
            website.textContent = member.website;
            card.appendChild(website);

            const img = document.createElement("img");
            img.src = member.img;
            card.appendChild(img);

            membersContainer.appendChild(card);
        });
    }

    function toggleView() {
        isGridView = !isGridView;
        const membersContainer = document.querySelector(".members-container");

        membersContainer.classList.toggle("grid-view", isGridView);
        membersContainer.classList.toggle("list-view", !isGridView);
    }

    getMembers()
        .then(data => {
            displayMembers(data);
            document.getElementById("toggleViewButton").addEventListener("click", toggleView);
        })
        .catch(error => {
            console.error("Error loading members:", error);
        });
});
