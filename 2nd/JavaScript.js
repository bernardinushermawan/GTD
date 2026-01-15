let count = 0;
let counter = document.getElementById("number");
let message = document.getElementById("warning");

function increase(){
    count++;
    counter.innerText = count;
    message.style.display = "none";
}

function decrease(){
    if(count>0){
        count--;
        counter.innerText = count;
        message.style.display = "none";
    }
    else{
        message.style.display = "block";
    }
}

function reset(){
    count = 0;
    counter.innerText = count;
    message.style.display = "none";
}

function validateForm(){
    const email = document.getElementById("email").value.trim();
    const comment = document.getElementById("comment").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    if(!emailPattern.test(email)){
        document.getElementById("warning2").style.display = "block";
        isValid = false;
    }
    if(comment === ""){
        document.getElementById("warning3").style.display = "block";
        isValid = false;
    } 
    return isValid;
}