const exhibitionsList = [
    {
        artiste: "Claude Monet",
        œuvre: "Impression, soleil levant",
        imageUrl:
            "https://www.artistikrezo.com/wp-content/uploads/2017/12/1-impression-soleil-levant-Monet-Les-100-%C5%93uvres-dart-quil-faut-avoir-vues-G%C3%A9rard-Denizeau-Larousse.jpg",
        date: "1840 - 1926",
        id: 1,
    },
    {
        artiste: "Vincent van Gogh",
        œuvre: "La Nuit étoilée",
        imageUrl:
            "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2019/04/tableau-la-nuit-etoilee-vincent-van-gogh-75-x-55-c-1.jpg?fit=1200%2C675&ssl=1",
        date: "1853 - 1890",
        id: 2,
    },
    {
        artiste: "Pablo Picasso",
        œuvre: "Les Demoiselles d'Avignon",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
        date: "1881 - 1973",
        id: 3,
    },
    {
        artiste: "Leonardo da Vinci",
        œuvre: "La Joconde",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        date: "1452 - 1519",
        id: 4,
    },
    {
        artiste: "Edvard Munch",
        œuvre: "Le Cri",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
        date: "1863 - 1944",
        id: 5,
    },
    {
        artiste: "Salvador Dalí",
        œuvre: "La Persistance de la mémoire",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
        date: "1904 - 1989",
        id: 6,
    },
];

function writeDom() {
    exhibitionsList.forEach((exhibition) => {
        const articleContainer = document.querySelector(".row");
        articleContainer.innerHTML += `<article class="col">
            <div class="card shadow-sm">
                <img src="${exhibition.imageUrl}" class="card-img-top" alt="${exhibition.artiste}">
                <div class="card-body">
                    <h3 class="card-title">${exhibition.œuvre}</h3>
                    <p class="card-text">${exhibition.artiste}</p>
                    <p class="card-text text-muted">${exhibition.date}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button"
                                    class="btn btn-sm btn-outline-secondary view"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-edit-id="${exhibition.id}"
                                    >View
                            </button>
                            <button type="button"
                                    class="btn btn-sm btn-outline-secondary edit"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-edit-id="${exhibition.id}"
                                    >Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>`;
    });
}

writeDom();

let editButtons = document.querySelectorAll(".edit");
editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        editModal(e.target.getAttribute("data-edit-id"));
    });
});

let viewButtons = document.querySelectorAll(".view");
viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        viewModal(e.target.getAttribute("data-edit-id"));
    });
});

function modifyModal(modalTitle, modalBody) {
    document.querySelector(".modal-title").textContent = modalTitle;
    document.querySelector(".modal-body").innerHTML = modalBody;
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>`;
}

function viewModal(exhibitionId) {
    const result = exhibitionsList.findIndex(
        (exhibition) => exhibition.id === parseInt(exhibitionId)
    );
    const modalBody = `<img src="${exhibitionsList[result].imageUrl}" alt="${exhibitionsList[result].œuvre}" class="img-fluid" />`;
    modifyModal(exhibitionsList[result].œuvre, modalBody);
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>`;
}

function editModal(exhibitionId) {
    const result = exhibitionsList.findIndex(
        (exhibition) => exhibition.id === parseInt(exhibitionId)
    );
    fetch("./form.html").then((data) => {
        data.text().then((form) => {
            const selectedExhibition = exhibitionsList[result];
            modifyModal("Edit Mode", form);
            modifyFom({
                œuvre: selectedExhibition.œuvre,
                artiste: selectedExhibition.artiste,
                imageUrl: selectedExhibition.imageUrl,
            });
            document
                .querySelector('button[type="submit"]')
                .addEventListener("click", () =>
                    updateExhibitions(
                        œuvre.value,
                        artiste.value,
                        imageUrl.value,
                        exhibitionId
                    )
                );
        });
    });
}

function modifyFom(exhibitionData) {
    const form = document.querySelector("form");
    form.œuvre.value = exhibitionData.œuvre;
    form.artiste.value = exhibitionData.artiste;
    form.imageUrl.value = exhibitionData.imageUrl;
}

function updateExhibitions(œuvre, artiste, imageUrl, exhibitionId) {
    const index = exhibitionsList.findIndex(
        (exhibition) => exhibition.id === parseInt(exhibitionId)
    );

    exhibitionsList[index].œuvre = œuvre;
    exhibitionsList[index].artiste = artiste;
    exhibitionsList[index].imageUrl = imageUrl;
    document.querySelector(".row").innerHTML = "";
    writeDom();
    editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editModal(e.target.getAttribute("data-edit-id"));
        });
    });

    viewButtons = document.querySelectorAll(".view");
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            viewModal(e.target.getAttribute("data-edit-id"));
        });
    });
}
