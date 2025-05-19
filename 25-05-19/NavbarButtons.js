//This script is used for navbar buttons

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

document.getElementById("News").addEventListener("click", function(){
    if (!document.URL.includes("News.html")){
        MoveDown("News.html")
    }
})

document.getElementById("SuperGuideBTN").addEventListener("click", function(){
    if (!document.URL.includes("Home.html")){
        MoveDown("Home.html")
    }
})
