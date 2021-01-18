
//var inputVal = "https://secure.img1-fg.wfcdn.com/im/98270403/resize-h800-w800%5Ecompr-r85/8470/84707680/Pokemon+Pikachu+Wall+Decal.jpg"

document.getElementById("clickMe").onclick = displayImage();

function displayImage() { 
    var inputVal = document.getElementById("url_image").value;
    var default = "assets/img/unknown_pokemon.jpg";
    if (inputVal != "") {
        document.getElementById("imageid").src=Pic;
    } else {
        document.getElementById("imageid").src= default;
    }
}

