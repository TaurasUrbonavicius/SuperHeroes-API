//This script is used for the search bar at top right

let UserSearchBarInput = document.getElementById("heroSearch")
let DropdownFrame = document.getElementById("dropdowns1")
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
        DropdownFrame.classList.remove("hidden")

        data.forEach(function(array, index) {

            if(index <= 4) {

            let newChild = document.createElement("button")
            let script = document.createElement("script")

            newChild.classList.add("dropdown")
            newChild.setAttribute("id", `option${index}`)
            newChild.innerHTML = data[index].name + `(${data[index].biography["full-name"]})`
            DropdownFrame.appendChild(newChild)

            script.innerHTML = `document.getElementById('option${index}').addEventListener('click', function(){console.log('Clicked'); localStorage.setItem('searching', ${data[index].id}); window.location.href = 'HeroSearch.html';})`
            DropdownFrame.appendChild(script)

            console.log("Adding new child")

        }});
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

function NotFound (){
    alert("Hero not found.")
    loadingIcon.classList.add("hidden")
}

UserSearchBarInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        DropdownFrame.innerHTML = ""
        console.log("Clicked enter")
        Dropdown(UserSearchBarInput.value)
    }
});
