var q = document.querySelector("#qustion"),
    qTip = document.querySelector("#qustionTip");;

q.addEventListener("mouseover",()=>{
    q.setAttribute("class" , "fa-solid fa-circle-question");
    qTip.style.display = "block";
});

q.addEventListener("mouseout",()=>{
    q.setAttribute("class" , "fa-regular fa-circle-question");
    qTip.style.display = "none";
});