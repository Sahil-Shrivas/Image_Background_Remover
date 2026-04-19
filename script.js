let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let downloadCard = document.getElementById("downloadCard");
let fileInput = document.getElementById("fileInput");
let imageBefore = document.getElementById("display-img");
let startBtn = document.getElementById("startBtn");
let imageAfter = document.querySelector(".image-after");
let imageBeforeSM = document.querySelector(".image-before");
let downloadHref = document.getElementById("downloadHref");

const reader = new FileReader();
const formData = new FormData();
let file = null;
const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "MKcutZL9EBkjFmhEEtjkggqP";

const activeScreen = (screen) => {
    addCard.style.display = "none";
    displayCard.style.display = "none";
    downloadCard.style.display = "none";
    screen.style.display = "flex";
};

activeScreen(addCard);


fileInput.addEventListener("input", () => {
    file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        imageBefore.src = reader.result;
        imageBeforeSM.src = reader.result;
    };
    activeScreen(displayCard);
});

startBtn.addEventListener("click", () => {
    formData.append("image_file", file);
    fetch(API_URL, {
        method: "POST",
        headers: {
            "X-Api-key": API_KEY,
        },
       body: formData,
    })
    .then((res) => res.blob())
    .then((blob) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            imageAfter.src = reader.result;
            downloadHref.setAttribute("href", reader.result);
        };
        activeScreen(downloadCard);
    });
});