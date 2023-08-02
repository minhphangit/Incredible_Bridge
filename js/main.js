(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 100, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// photo library
$(".portfolio-menu ul li").click(function () {
  $(".portfolio-menu ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".portfolio-item").isotope({
    filter: selector,
  });
  return false;
});
$(document).ready(function () {
  var popup_btn = $(".popup-btn");
  popup_btn.magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
});

// visitors
var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;
// contact
$(document).ready(function () {
  $("#callButton").on("click", function () {
    var phoneNumber = "0346713864";
    window.location.href = "tel:" + phoneNumber;
  });
});

// login & register
const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});
// js check login and register
// Function to set a cookie
function setCookie(name, value, expirationDays) {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length)
      );
    }
  }
  return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function registerUser() {
  const name = document.getElementById("Name").value;
  const email = document.getElementById("registerEmail").value;
  const mobile = document.getElementById("Mobile").value;
  const password = document.getElementById("registerPassword").value;

  // Check if the user already exists in localStorage
  if (localStorage.getItem(email)) {
    alert("User already exists. Please use a different email address.");
    return;
  }

  // Create a user object and store it in cookies
  const user = {
    name,
    email,
    mobile,
    password,
  };

  setCookie(email, JSON.stringify(user), 30); // Cookie will expire in 30 days
  alert("Registration successful.You will be automatically logged in.");
  // Hide the login link
  document.getElementById("loginLink").style.display = "none";
  // Show the dropdown
  document.getElementById("accountDropdown").style.display = "block";
  // Set the user's name in the dropdown button
  document.querySelector(".account-drop").innerText = user.name;
}
function loginUser() {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  // Check if the user exists in cookies
  const userCookie = getCookie(loginEmail);
  if (userCookie) {
    const user = JSON.parse(userCookie);
    if (user.password === loginPassword) {
      alert("Login successful. Welcome, " + user.name + "!");
      setCookie("loggedInUser", loginEmail, 30); // Cookie will expire in 30 days
      // Hide the login link
      document.getElementById("loginLink").style.display = "none";
      // Show the dropdown
      document.getElementById("accountDropdown").style.display = "block";
      // Set the user's name in the dropdown button
      document.querySelector(".account-drop").innerText = user.name;
    } else {
      alert("Invalid email address or password. Please try again.");
    }
  } else {
    alert("User not found. Please register or check your credentials.");
  }
}
// Function to handle the logout action
function logoutUser() {
  // Show a confirmation message
  const isConfirmed = window.confirm("Are you sure you want to log out?");
  if (isConfirmed) {
    deleteCookie("loggedInUser");
    // Show the login link
    document.getElementById("loginLink").style.display = "block";
    // Hide the dropdown
    document.getElementById("accountDropdown").style.display = "none";
  } else {
    // If the user cancels, do nothing
  }
}

// Event listener for the "Log out" link
document.getElementById("logoutLink").addEventListener("click", logoutUser);

// Function to check if the user is already logged in when the page loads
function checkLoggedInOnLoad() {
  const loggedInEmail = getCookie("loggedInUser");

  if (loggedInEmail) {
    const userCookie = getCookie(loggedInEmail);
    if (userCookie) {
      const user = JSON.parse(userCookie);
      // Hide the login link
      document.getElementById("loginLink").style.display = "none";
      // Show the dropdown
      document.getElementById("accountDropdown").style.display = "block";
      // Set the user's name in the dropdown button
      document.querySelector(".account-drop").innerText = user.name;
    }
  } else {
    // If the user is not logged in, show the login link and hide the dropdown
    document.getElementById("loginLink").style.display = "block";
    document.getElementById("accountDropdown").style.display = "none";
  }
}

// Call the checkLoggedInOnLoad function when the page loads
document.addEventListener("DOMContentLoaded", checkLoggedInOnLoad);
