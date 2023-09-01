document.addEventListener("DOMContentLoaded", function () {
    var checkboxAll = document.getElementById("flexCheckDefaultAll");
    var checkboxAsia = document.getElementById("flexCheckDefaultAsia");
    var checkboxEurope = document.getElementById("flexCheckDefaultEurope");
    // Thêm các biến checkbox cho các lục địa khác

    var allDivs = document.querySelectorAll(".Asia, .Europe, .Americas, .Africa, .Oceania, .SouthPole");

    checkboxAll.addEventListener("change", function () {
        updateFilteredDivs();
    });

    checkboxAsia.addEventListener("change", function () {
        updateFilteredDivs();
    });

    checkboxEurope.addEventListener("change", function () {
        updateFilteredDivs();
    });

    // Thêm sự kiện change cho các checkbox khác tương tự

    function updateFilteredDivs() {
        allDivs.forEach(function (div) {
            if (checkboxAll.checked || 
                (checkboxAsia.checked && div.classList.contains("Asia")) ||
                (checkboxEurope.checked && div.classList.contains("Europe")) ||
                (checkboxEurope.checked && div.classList.contains("Oceania")) ||
                (checkboxEurope.checked && div.classList.contains("Americas")) ||
                (checkboxEurope.checked && div.classList.contains("TheSouth")) ||
                (checkboxEurope.checked && div.classList.contains("Africa")) 
                // Thêm điều kiện cho các lục địa khác tương tự
                ) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        });
    }


});




//link


var divConElements = document.querySelectorAll(".right_bridge .col");

divConElements.forEach(function(divCon) {
    divCon.addEventListener("click", function() {
        window.location.href = "details.html"; // Chuyển đến trang details.html khi click vào div con
    });
});
