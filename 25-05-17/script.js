let UserSearchBarInput = document.getElementById("heroSearch")
let DropdownFrame = document.getElementById("dropdowns1")
let dropdownVisible = false
let SearchingFor =  localStorage.getItem("searching");
let Card = document.getElementById("card")
let RandomHeroButton = document.getElementById("random")
let loadingIcon = document.getElementById("loadingIcon")
const API_Token = "a83788b2952e9732e52a089a8ff9e1cf"

async function Dropdown(SearchingInput) {
    console.log("Function running...")
    let API_Link = `https://superheroapi.com/api/${API_Token}/search/${SearchingInput}`

    try {
        let Response = await fetch(API_Link)
        let data = await Response.json();

        if (data.response == "error"){
            NotFound()
        } else {

        data = data.results

        console.log("Printing data...")
        console.log(data)

        if (data.length != 1){


        data.forEach(function(array, index) {

            if(index <= 4) {

            let newChild = document.createElement("button")
            let script = document.createElement("script")

            newChild.classList.add("dropdown")
            newChild.setAttribute("id", `option${index}`)
            newChild.innerHTML = data[index].name + `(${data[index].biography["full-name"]})`
            DropdownFrame.appendChild(newChild)

            script.innerHTML = `document.getElementById('option${index}').addEventListener('click', function(){console.log('Clicked');DropdownFrame.classList.toggle("show");dropdownVisible = false;localStorage.setItem('searching', ${data[index].id});GetInfo(${data[index].id})})`
            DropdownFrame.appendChild(script)

            console.log("Adding new child")

        }});
        
        dropdownVisible = true
        DropdownFrame.classList.toggle('show')

        } else {
            localStorage.setItem('searching', data[0].id);
            window.location.href = 'HeroSearch.html';
        }
        console.log("Finished.")
        }   
    } catch (error) {
        console.log("Error:", error);
    }
}

async function GetInfo(SearchingInput) {
    console.log("Function running...")
    console.log(SearchingInput)
    
    Card.classList.add("hidden")
    loadingIcon.classList.remove("hidden")

    let API_Link = `https://www.superheroapi.com/api.php/${API_Token}/${SearchingInput}`
    console.log(API_Link)

    try {
        let Response = await fetch(API_Link)
        let data = await Response.json();

        if (data.response == "error"){
            NotFound()
        } else {

        console.log("Printing data...")
        console.log(data)
        localStorage.setItem('searching', "")

        SetInfo(
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
        )
        console.log("Done")
        }   
    } catch (error) {
        console.log("Error:", error);
    }
}

function SetInfo (HeroName, FullName, Comics, Picture, Combat, Durability, Intel, Power, Speed, Strength){
    console.log(HeroName, FullName, Comics)

    loadingIcon.classList.add("hidden")
    Card.classList.remove("hidden")

    document.getElementById("picture1").src = Picture;
    document.getElementById("comics").innerHTML = Comics;
    document.getElementById("name1").innerHTML = HeroName;
    document.getElementById("realName").innerHTML = FullName;

    Card.classList.remove("hidden")
}

function NotFound (){
    alert("Hero not found.")
    loadingIcon.classList.add("hidden")
}

// Listeners
UserSearchBarInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        DropdownFrame.innerHTML = ""
        console.log("Clicked enter")
        Dropdown(UserSearchBarInput.value)
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
    GetInfo(Math.floor(Math.random() * 731))
})

if (SearchingFor != ""){
    GetInfo(SearchingFor)
}

