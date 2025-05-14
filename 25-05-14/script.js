//Token
const Token = "a83788b2952e9732e52a089a8ff9e1cf"

//Inputs
let Textbox = document.getElementById("input")
let SearchBTN = document.getElementById("searchBTN")
let Random = document.getElementById("random")
let Textbox2 = document.getElementById("input2")
let Random2 = document.getElementById("random2")
let CompareBTN = document.getElementById("compare")

//Variables
let VisibleHeroes = 0

//Functions
async function CallAPI(ID, WhichHero) {
    let API = `https://superheroapi.com/api/${Token}`
    let test = false

    if(isNaN(ID)){
        API = API + `/search/${ID}`
    } else {
        API = API + `/${ID}`
        test = true
    }

    
    try {
        let Response = await fetch(API)
        let data = await Response.json();
        console.log(data)
        if (!test){
            data = data.results[0]
        }
        
        ChangeData(
            WhichHero,
            data.name,
            data.image.url,
            data.powerstats.power
        )
        CheckIfCanCompare()
        
    } catch (error) {
        console.log("Error:", error);
        console.log(API)
    }
}

function CheckIfCanCompare (){
    let HeroName1 = document.getElementById("name1")
    let HeroName2 = document.getElementById("name2")

    if (HeroName1.innerHTML != "" && HeroName2.innerHTML != ""){
        CompareBTN.classList.remove("Hidden");
    }
}

function ChangeData(Hero, Name, Picture, Power){
    let HeroPicture = document.getElementById(`picture${Hero}`)
    let HeroName = document.getElementById(`name${Hero}`)
    let HeroPower = document.getElementById(`power${Hero}`)

    if (Power == "null"){
        Power = 0;
    }

    HeroPicture.src = Picture
    HeroName.innerHTML = Name
    HeroPower.innerHTML = "Power: " + Power
    
    console.log(Name, Picture, Power)
}

function CompareHeroes(){
    
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

Textbox2.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      CallAPI(Textbox2.value, 2)
    }
});

Random2.addEventListener("click", function(){
    let random = Math.floor(Math.random() * 731);
    CallAPI(random, 2)
})

CompareBTN.addEventListener("click", function(){
    CompareHeroes()
})

SearchBTN.addEventListener("click", function(){
    CallAPI(Textbox.value, 1)
    console.log("Clicked")
})
