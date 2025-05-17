let Middle = document.getElementById("middle")

function MoveDown(newTab){
    Middle.classList.add("slide-in-bottom-reverse")
    setTimeout(() => {
        window.location.href = newTab
    }, 1000);
}

document.getElementById("Home").addEventListener("click", function(){
    if (!document.URL.includes("Home.html")){
        MoveDown("Home.html")
    }
})

document.getElementById("Search").addEventListener("click", function(){
    if (!document.URL.includes("HeroSearch.html")){
        MoveDown("HeroSearch.html")
    }
})

document.getElementById("About").addEventListener("click", function(){
    if (!document.URL.includes("About.html")){
        MoveDown("About.html")
    }
})

document.getElementById("SuperGuideBTN").addEventListener("click", function(){
    if (!document.URL.includes("Home.html")){
        MoveDown("Home.html")
    }
})
