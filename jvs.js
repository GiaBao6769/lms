var menu = document.getElementById("infoAppendixDiv")
function showMenu(){
    menu.style.right = "0";
    
}

function hideMenu(){
    menu.style.right = "-40vw";
}


fetch("template.html")
  .then(res => res.text())
  .then(data => {
    document.querySelector("footer").innerHTML = data;
});
