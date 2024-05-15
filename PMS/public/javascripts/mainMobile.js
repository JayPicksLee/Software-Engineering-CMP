document.addEventListener("DOMContentLoaded", function () {
    var createRequestBtn = document.createElement("button");
    createRequestBtn.innerText = "Create Request";
    createRequestBtn.classList.add("createRequestBtn");
  
    createRequestBtn.addEventListener("click", function () {
      document.querySelector(".sideRequest").classList.toggle("showRequest");
    });
  
    document.querySelector(".main_content").appendChild(createRequestBtn);

    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth > 1000) {
        document.querySelector(".sideRequest").classList.remove("showRequest");
    }
});