let UserSearchBarInput = document.getElementById("heroSearch")
let DropdownFrame = document.getElementById("dropdowns1")
let MiddleDiv = document.getElementById("middle")
let dropdownVisible = false
const API_Token = "a83788b2952e9732e52a089a8ff9e1cf"

async function Dropdown(SearchingInput) {
    console.log("Function running...")

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

            script.innerHTML = `document.getElementById('option${index}').addEventListener('click', function(){console.log('Clicked');DropdownFrame.classList.toggle("show");dropdownVisible = false;localStorage.setItem('searching', ${data[index].id});MiddleDiv.classList.add("slide-in-bottom-reverse");setTimeout(() => {window.location.href = 'HeroSearch.html'; }, 1000);})`
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

addEventListener("mousedown", (event) => { 
    if (event.target.classList.value != "dropdown"){
        if (dropdownVisible){
            DropdownFrame.classList.toggle("show");
            dropdownVisible = false;
        }
    }
})

