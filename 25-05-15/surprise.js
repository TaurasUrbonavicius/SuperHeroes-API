//For surprise button in homepage

let surpriseBtn = document.getElementById("surprise")

surpriseBtn.addEventListener("click", function(){
    let random = Math.floor(Math.random() * 731);
    localStorage.setItem("searching", random);
})