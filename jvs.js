function showMenu(){
    const menu = document.getElementById("infoAppendixDiv");
    menu.style.right = "0";
    
}

function hideMenu(){
    const menu = document.getElementById("infoAppendixDiv");
    menu.style.right = "-40vw";
}


fetch("template.html")
    fetch("template.html")
    .then(res => res.text())
    .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const Footer = doc.querySelector("footer");
    document.querySelector("footer").replaceWith(Footer);

    const navBar = doc.querySelector(".navBar");
    document.querySelector(".navBar").replaceWith(navBar);

    const banner = doc.querySelector(".banner");
    document.querySelector(".banner").replaceWith(banner);
});


