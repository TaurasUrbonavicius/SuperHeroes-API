//Token
const Token = "a83788b2952e9732e52a089a8ff9e1cf"

//Inputs
let Textbox = document.getElementById("input")
let SearchBTN = document.getElementById("searchBTN")
let Random = document.getElementById("random")

//Variables
let searching = localStorage.getItem("searching")
let card = document.getElementById("card")
let loadingIcon = document.getElementById("loadingIcon")
let comics = document.getElementById("comics")
let realName = document.getElementById("realName")
let heroSearch = document.getElementById("heroSearch")

//Functions
async function CallAPI(ID, WhichHero) {
    let API = `https://superheroapi.com/api/${Token}`
    localStorage.setItem("searching", ID)

    //Checks if ID is a number or not and accordingly gets the link
    if(isNaN(ID)){
        API = API + `/search/${ID}`
    } else {
        API = API + `/${ID}`
    }

    // Hides loading the card/Makes loading icon visible
    card.classList.add("hidden")
    loadingIcon.classList.remove("hidden")

    try {
        let Response = await fetch(API)
        let data = await Response.json();

        //If not found do this
        if (data.response == "error"){
            NotFound()
        } else {

        data = data.results[0]
        
        ChangeData(
            WhichHero,
            data.name,
            data.image.url,
            data.biography.publisher,
            data.biography["full-name"]
        )}

        localStorage.setItem("searching", "");
    } catch (error) {
        console.log("Error:", error);
    }
}

function ChangeData(Hero, Name, Picture, Publisher, FullName){
    let HeroPicture = document.getElementById(`picture${Hero}`)
    let HeroName = document.getElementById(`name${Hero}`)

    //Changes text and photos
    HeroPicture.src = Picture
    HeroName.innerHTML = Name
    comics.innerHTML = Publisher
    realName.innerHTML = FullName

    // Hides loading icon/Makes the card visible
    loadingIcon.classList.add("hidden");
    card.classList.remove("hidden")
}

function NotFound (){
    alert(searching + " hero not found.")
    loadingIcon.classList.add("hidden")
}

//Listeners
Textbox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        CallAPI(Textbox.value, 1)
    }
});

Random.addEventListener("click", function(){
    let random = Math.floor(Math.random() * 731);
    CallAPI(random, 1)
})

SearchBTN.addEventListener("click", function(){
    CallAPI(Textbox.value, 1)
})

if (searching != ""){
    CallAPI(searching, 1)
}