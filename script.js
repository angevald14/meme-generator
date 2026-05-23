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

    if (file) {
        memeImage.src = URL.createObjectURL(file);
    }

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


// =====================
// CHARGER GALERIE
// =====================

function loadGallery() {

    let gallery = document.getElementById("gallery");

    if (!gallery) return;

    let memes = JSON.parse(localStorage.getItem("memes")) || [];

    gallery.innerHTML = "";

    if (memes.length === 0) {
        gallery.innerHTML = "<p>Aucun mème encore </p>";
        return;
    }

    memes.forEach(function (img) {

        let image = document.createElement("img");

        image.src = img;

        image.style.width = "120px";
        image.style.margin = "5px";
        image.style.borderRadius = "10px";
        image.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

        gallery.appendChild(image);

    });
}




// =====================
// TELECHARGEMENT
// =====================

const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {

    downloadBtn.addEventListener("click", function () {

        html2canvas(document.querySelector(".meme-container"))
        .then(canvas => {

            const imageURL = canvas.toDataURL("image/png");

            // sauvegarde galerie
            saveMeme(imageURL);
            loadGallery();

            // ALERTES AVANT téléchargement
            alert(
            ` Snapchat :
            Le mème va être téléchargé.

            Ouvre Snapchat
            Va dans Story ou Chat
            Ajoute l’image depuis ta galerie

             TikTok :
             Utilise l’image en commentaire ou publication`
                );

            // téléchargement
            const link = document.createElement("a");

            link.download = "meme.png";
            link.href = imageURL;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        });

    });

}

// =====================
// PARTAGE (Snap / Insta / FB via mobile)
// =====================

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.addEventListener("click", async function () {

        const canvas = await html2canvas(document.querySelector(".meme-container"));

        canvas.toBlob(async function (blob) {

            const file = new File([blob], "meme.png", { type: "image/png" });

            const url = URL.createObjectURL(file);

            if (navigator.share) {

                try {
                    await navigator.share({
                        title: "Mon mème",
                        text: "Regarde mon mème",
                        files: [file]
                    });
                } catch (err) {
                    console.log("Partage annulé");
                }

            } else {

                alert("Télécharge le mème puis partage-le sur Snapchat, TikTok, Instagram ou Facebook");

                const link = document.createElement("a");
                link.href = url;
                link.download = "meme.png";
                link.click();
            }

        });

    });

}


// =====================
// INIT GALERIE
// =====================

loadGallery();

