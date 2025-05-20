//Variable
let UserSearchBarInput = document.getElementById("heroSearch")
let DropdownFrame = document.getElementById("dropdowns1")
let dropdownVisible = false
let SearchingFor =  localStorage.getItem("searching");
let RandomHeroButton = document.getElementById("random")
let loadingIcon = document.getElementById("loadingIcon")
const API_Token = "a83788b2952e9732e52a089a8ff9e1cf"

//Functions
async function Dropdown(SearchingInput, Card) {
    if (dropdownVisible){
        DropdownFrame.classList.toggle("show");
        dropdownVisible = false
    }

    let API_Link = `https://superheroapi.com/api/${API_Token}/search/${SearchingInput}`

    try {
        let Response = await fetch(API_Link)
        let data = await Response.json();

        if (data.response == "error"){
            NotFound()
        } else {
        data = data.results
        if (data.length != 1){
        data.forEach(function(array, index) {
            if(index <= 4) {
            let newChild = document.createElement("button")
            let script = document.createElement("script")

            newChild.classList.add("dropdown")
            newChild.setAttribute("id", `option${index}`)
            newChild.innerHTML = data[index].name + `(${data[index].biography["full-name"]})`
            DropdownFrame.appendChild(newChild)

            script.innerHTML = `document.getElementById('option${index}').addEventListener('click', function(){DropdownFrame.classList.toggle("show");dropdownVisible = false;localStorage.setItem('searching', ${data[index].id});GetInfo(${data[index].id}, 1)})`
            DropdownFrame.appendChild(script)
        }});
        
        dropdownVisible = true
        DropdownFrame.classList.toggle('show')
        } else {
            localStorage.setItem('searching', data[0].id);
            window.location.href = 'HeroSearch.html';
        }}   
    } catch (error) {
        console.log("Error:", error);
    }
}

async function GetInfo(SearchingInput, Card) {
    document.getElementById(`card${Card}`).classList.add("hidden")
    loadingIcon.classList.remove("hidden")

    let API_Link = `https://www.superheroapi.com/api.php/${API_Token}/${SearchingInput}`

    try {
        let Response = await fetch(API_Link)
        let data = await Response.json();
        if (data.response == "error"){
            NotFound()
        } else {
        localStorage.setItem('searching', "")
        document.getElementById(`card${Card}`).setAttribute("name", data.id)
        SetInfo(
            Card,
            data.name,
            data.biography["full-name"],
            data.biography.publisher,
            data.image.url,
            data.powerstats.combat,
            data.powerstats.durability,
            data.powerstats.intelligence,
            data.powerstats.power,
            data.powerstats.speed,
            data.powerstats.strength
        )}   
    } catch (error) {
        console.log("Error:", error);
    }
}

function SetInfo (Card, HeroName, FullName, Comics, Picture, Combat, Durability, Intel, Power, Speed, Strength){
    let CardElement = document.getElementById(`card${Card}`)

    loadingIcon.classList.add("hidden")
    CardElement.classList.remove("hidden")

    document.getElementById(`picture${Card}`).src = Picture;
    document.getElementById(`comics${Card}`).innerHTML = Comics;
    document.getElementById(`name${Card}`).innerHTML = HeroName;
    document.getElementById(`realName${Card}`).innerHTML = FullName;

    document.getElementById(`amountIntel${Card}`).innerHTML = Intel;
    document.getElementById(`statsIntel${Card}`).style.width = `${Intel}%`

    document.getElementById(`amountPower${Card}`).innerHTML = Power;
    document.getElementById(`statsPower${Card}`).style.width = `${Power}%`

    document.getElementById(`amountStrength${Card}`).innerHTML = Strength;
    document.getElementById(`statsStrength${Card}`).style.width = `${Strength}%`

    document.getElementById(`amountSpeed${Card}`).innerHTML = Speed;
    document.getElementById(`statsSpeed${Card}`).style.width = `${Speed}%`

    document.getElementById(`amountDefense${Card}`).innerHTML = Durability;
    document.getElementById(`statsDefense${Card}`).style.width = `${Durability}%`

    document.getElementById(`amountCombat${Card}`).innerHTML = Combat;
    document.getElementById(`statsCombat${Card}`).style.width = `${Combat}%`

}

function NotFound (){
    alert("Hero not found.")
    loadingIcon.classList.add("hidden")
}

function CheckForFavorites(){
    let foundFavorites = 0;
    for (let i = 3; i >= 1; i--){
        let star = document.getElementById(`star${i}`)
        let localStorageFavorite = localStorage.getItem(`favorite${i}`);
        if (localStorageFavorite != "" && localStorageFavorite != null){
            star.innerHTML = "&#9733;"
            foundFavorites++
            GetInfo(localStorageFavorite, i)
        }
    }
    if (foundFavorites == 2){
        document.getElementById("star1").classList.add("hidden")
    }
}

function NewFavorited(ID){
    for (let i = 3; i >= 1; i--){
        if (document.getElementById(`card${i}`).getAttribute("name") == ""){
            document.getElementById(`card${i}`).setAttribute("name", ID)
            document.getElementById(`card${i}`).classList.remove("hidden")
            document.getElementById(`star${i}`).innerHTML = "&#9733;";
            localStorage.setItem(`favorite${i}`, document.getElementById(`card${i}`).getAttribute("name"));
            GetInfo(ID, i)
            break;
        }    
    }   
}

function RemoveFavorite(which){
    document.getElementById(`star${which}`).innerHTML = "&#9734;";
    localStorage.setItem(`favorite${which}`, "");
    document.getElementById(`card${which}`).classList.add("hidden");
    document.getElementById(`card${which}`).setAttribute("name", "")
    document.getElementById("star1").classList.remove("hidden")
}

// Listeners
UserSearchBarInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        DropdownFrame.innerHTML = ""
        Dropdown(UserSearchBarInput.value, 1)
    }
});

addEventListener("mousedown", (event) => { 
    if (event.target.classList.value != "dropdown"){
        if (dropdownVisible){
            DropdownFrame.classList.toggle("show");
            dropdownVisible = false;
        }
    }
})

RandomHeroButton.addEventListener("click", function(){
    GetInfo(Math.floor(Math.random() * 731), 1)
})

if (SearchingFor != "" && SearchingFor != undefined && SearchingFor != null){
    GetInfo(SearchingFor, 1)
}

document.getElementById("star1").addEventListener("click", function(){
    if (localStorage.getItem(`favorite2`) == "" || localStorage.getItem(`favorite2`) == null){
        NewFavorited(document.getElementById("card1").getAttribute("name"))
        document.getElementById("card1").classList.add("hidden")
        CheckForFavorites()
    } else if (localStorage.getItem(`favorite3`) == "" || localStorage.getItem(`favorite3`) == null){
        NewFavorited(document.getElementById("card1").getAttribute("name"))
        document.getElementById("card1").classList.add("hidden")
        document.getElementById("star1").classList.add("hidden")
    }

})
document.getElementById("star2").addEventListener("click", function(){
    RemoveFavorite("2")
})
document.getElementById("star3").addEventListener("click", function(){
    RemoveFavorite("3")
})  

//When page is loaded checks for favorites
CheckForFavorites()