
function showMenu(){
    const menu = document.getElementById("infoAppendixDiv");
    menu.style.right = "0";
    
}

function hideMenu(){
    const menu = document.getElementById("infoAppendixDiv");
    menu.style.right = "-40vw";
}

function loadTemplateElements (){
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
}



async function generateCard(journalPath){
    try{
        const response = await fetch(journalPath);
        const data = await response.text();
        const lines = data.split("\n");

        fetch("template.html")
            .then(res => res.text())
            .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");

            const journalLink = doc.querySelector(".journalLink");
            const journalTemplate = journalLink.querySelector(".journalTemplate");
            journalLink.href = `artical_template.html?journal=${journalPath}`;
            document.querySelector("section").appendChild(journalLink);

            let haveThumbnail = false;

            lines.forEach(line =>{
                if (line.startsWith("[title]")){
                    journalTemplate.querySelector(".journalTitle").textContent = line.slice(7);
                }
                else if (line.startsWith("[description]")){
                    journalTemplate.querySelector(".journalDescription").textContent = line.slice(13);
                }
                else if (line.startsWith("[tags]")){
                    let tagsList = line.slice(6, -1).split(" ");
                    for (let i = 0; i < tagsList.length; i++){
                        let newTag = document.createElement("div");
                        newTag.classList.add("journalTag");
                        newTag.classList.add(tagsList[i]);
                        journalTemplate.querySelector(".journalTagsDiv").appendChild(newTag);
                        
                    }
                }
                else if (line.startsWith("[img]") && !haveThumbnail){
                    journalTemplate.querySelector(".journalThumbnail").src = "journalPic/" + line.slice(5);
                    haveThumbnail = true;
                }
            })
        });

    }
    catch (err){
        console.log(err);
    }
}

function generateLatestArticles(){
    let journalList = ["j1.md", "j2.md", "j3.md"];
    journalList.forEach(journalPath =>{
        generateCard("journal/" + journalPath);
    })
}



async function generateContentForTemplate(journalPath) {
try {
    const response = await fetch(journalPath); 
    const data = await response.text();      
    const lines = data.split("\n");      
    
    let makingLi = false;
    let liElements = null;
    let newElement = null;

    lines.forEach(line => {
        
        if (makingLi){
            if (line.startsWith("[li]")){
                document.querySelector(".content").appendChild(liElements);
                makingLi = false;      
            }      
            else{
                newElement = document.createElement("li");
                newElement.textContent = line;
                liElements.appendChild(newElement);  
            }
        }

        else if (line.startsWith("[li]")){
            makingLi = true;
            liElements = document.createElement("ul");
        }
        else if (line.startsWith("[title]")){
            document.querySelector("#title").textContent = line.slice(7);
        }
        else if (line.startsWith("[description]")){
            
        }
        else if (line.startsWith("[tags]")){

        }
        else if (line.startsWith("[end]")){

        }
        else if (line.startsWith("[author]")){
            document.querySelector('#author').textContent = "Author: " + line.slice(8);
        }
        else if (line.startsWith("[date]")){
            document.querySelector("#date").textContent = "Date: " + line.slice(6);
        }
        else if (line.startsWith("[source]")){
            newElement = document.createElement('a');
            newElement.href = line.slice(8);
            newElement.textContent = line.slice(8);
            document.querySelector("#source").textContent = "Source: ";
            document.querySelector("#source").appendChild(newElement);
        }
        else if (line.startsWith("[img]")){
            newElement = document.createElement("img");
            newElement.src = "journalPic/" + line.slice(5);
            document.querySelector(".content").appendChild(newElement);
        }
        else if(line.startsWith("[h2]")){
            newElement = document.createElement("h2");
            newElement.textContent = line.slice(4);
            document.querySelector(".content").appendChild(newElement);
        }
        else{
            newElement = document.createElement("p");
            newElement.textContent = line;
            document.querySelector(".content").appendChild(newElement);
        }
    });
} 
catch (err) {
    console.error("Error loading file:", err);
}}

loadTemplateElements()