let images = [];

function loadPrimaryImageUrl(index) {
  fetch("http://www.splashbase.co/api/v1/images/search?query=beach")
    .then((response) => response.json())
    .then((data) => {
      images = data.images;
      console.log(images);
      loadCards();
    })
    .catch((err) => {
      console.error(err);
    });
}

function loadSecondaryImageUrl(index) {
  fetch("http://www.splashbase.co/api/v1/images/search?query=forest")
    .then((response) => response.json())
    .then((data) => {
      images = data.images;
      console.log(images);
      loadCards();
    })
    .catch((err) => {
      console.error(err);
    });
}

const primaryButton = document.getElementById("load-primary");
const secondaryButton = document.getElementById("load-secondary");

primaryButton.onclick = loadPrimaryImageUrl;
secondaryButton.onclick = loadSecondaryImageUrl;
const mainRow = document.getElementById("main-row");
function loadCards() {
  alertUser();
  mainRow.innerHTML = "";
  images.map((elem) => {
    const column = document.createElement("div");
    column.classList.add("col-md-4");
    mainRow.appendChild(column);
    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow");
    column.appendChild(card);
    const cardImage = document.createElement("img");
    card.appendChild(cardImage);
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("src", elem.url);
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("d-flex", "justify-content-between", "p-4");
    card.appendChild(buttonsDiv);
    const viewButton = document.createElement("button");
    viewButton.innerText = "View";
    viewButton.classList.add("btn", "btn-primary");
    viewButton.setAttribute("data-toggle", "modal");
    viewButton.setAttribute("data-target", "#exampleModal");
    viewButton.onclick = showModal;
    buttonsDiv.appendChild(viewButton);
    const hideButton = document.createElement("button");
    hideButton.classList.add("btn", "btn-danger");
    buttonsDiv.appendChild(hideButton);
    hideButton.innerText = "Hide";
    hideButton.onclick = hideCard;
    const imageID = document.createElement("h5");
    imageID.innerText = `ID: ${elem.id}`;
    card.appendChild(imageID);
    imageID.classList.add("text-center", "my-2");
  });
}

function showModal(event) {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  const modalImg = document.createElement("img");
  modalBody.appendChild(modalImg);
  modalImg.classList.add("img-fluid");
  modalImg.setAttribute("src", event.target.parentNode.parentNode.childNodes[0].src);
}

function hideCard(event) {
  event.target.parentNode.parentNode.classList.add("d-none");
}
const mainAlert = document.getElementById("main-alert");
function alertUser() {
  mainAlert.classList.toggle("d-none");
  mainAlert.innerHTML = `${images.length} pictures loaded`;
  setTimeout(() => {
    mainAlert.classList.toggle("d-none");
  }, 6000);
}
