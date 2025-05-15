//This script is used for the search bar at top right

let SearchingInput = document.getElementById("heroSearch")

SearchingInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        localStorage.setItem("searching", heroSearch.value);
        if (window.location !== "HeroSearch.html"){
            window.location.replace("HeroSearch.html");
        }
    }
});
