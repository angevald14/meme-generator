// =====================
// IMAGE + TEXTE
// =====================

const imageInput = document.getElementById("imageInput");

const memeImage = document.getElementById("memeImage");

const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");

const textTop = document.getElementById("textTop");
const textBottom = document.getElementById("textBottom");

// image upload
imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    memeImage.src = URL.createObjectURL(file);

});

// texte haut
topText.addEventListener("input", function () {
    textTop.innerText = topText.value;
});

// texte bas
bottomText.addEventListener("input", function () {
    textBottom.innerText = bottomText.value;
});


// =====================
// SAUVEGARDE GALERIE
// =====================

function saveMeme(imageURL) {

    let memes = JSON.parse(localStorage.getItem("memes")) || [];

    memes.push(imageURL);

    localStorage.setItem("memes", JSON.stringify(memes));
}


// charger galerie
function loadGallery() {

    let gallery = document.getElementById("gallery");

    let memes = JSON.parse(localStorage.getItem("memes")) || [];

    gallery.innerHTML = "";

    memes.forEach(function (img) {

        let image = document.createElement("img");

        image.src = img;

        image.style.width = "120px";
        image.style.margin = "5px";

        gallery.appendChild(image);

    });
}


// =====================
// TELECHARGEMENT
// =====================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {

    html2canvas(document.querySelector(".meme-container"))
    .then(canvas => {

        const imageURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = imageURL;
        link.click();

        // sauvegarde galerie
        saveMeme(imageURL);

        loadGallery();

    });

});


// =====================
// PARTAGE
// =====================

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async function () {

    const canvas = await html2canvas(document.querySelector(".meme-container"));

    canvas.toBlob(async function (blob) {

        const file = new File([blob], "meme.png", { type: "image/png" });

        if (navigator.share) {

            navigator.share({
                title: "Mon meme",
                text: "Regarde mon meme 😂",
                files: [file]
            });

        } else {
            alert("Partage non supporté sur cet appareil");
        }

    });

});


// =====================
// INIT GALERIE
// =====================

loadGallery();