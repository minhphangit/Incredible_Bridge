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
  setCookie("loggedInUser", email, 30);
  alert("Registration successful.You will be automatically logged in.");
  // Hide the login link
  document.getElementById("loginLink").style.display = "none";
  // Show the dropdown
  document.getElementById("accountDropdown").style.display = "block";
  // Set the user's name in the dropdown button
  document.querySelector(".account-drop").innerText = user.name;
  // Redirect to index.html after successful registration
  window.location.href = "index.html";
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
      // Redirect to index.html after successful registration
      window.location.href = "index.html";
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
      document.getElementById("loginLink").style.display = "none";
      // Show the dropdown smoothly
      document.getElementById("accountDropdown").style.display = "block";
      // Set the user's name in the dropdown button
      document.querySelector(".account-drop").innerText = user.name;
    }
  } else {
    // If the user is not logged in, show the login link smoothly
    document.getElementById("loginLink").style.display = "block";
  }
}

// Call the checkLoggedInOnLoad function when the page loads
document.addEventListener("DOMContentLoaded", checkLoggedInOnLoad);

// Lấy thông tin người dùng từ cookie và hiển thị trong các input chỉ đọc
function displayUserInfoFromCookie() {
  const loggedInUserEmail = getCookie("loggedInUser");
  const userJson = getCookie(loggedInUserEmail);

  if (userJson) {
    const user = JSON.parse(userJson);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("mobile").value = user.mobile;
  } else {
    // Xử lý khi không tìm thấy thông tin người dùng
  }
}

// Khi trang tải xong, gọi hàm để hiển thị thông tin người dùng từ cookie
window.onload = function () {
  displayUserInfoFromCookie();
};

function toggleEditSave() {
  const editSaveBtn = document.querySelector(".editSaveBtn");
  const inputElements = document.querySelectorAll("#name, #email, #mobile");
  const saveBtn = document.getElementById("saveBtn");

  if (inputElements[0].readOnly) {
    // Entering edit mode
    inputElements.forEach((input) => (input.readOnly = false));
    editSaveBtn.textContent = "Save";
    } else {
    // Saving changes and exiting edit mode
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    // Get the user's email from the logged-in state
    const loggedInUserEmail = getCookie("loggedInUser");

    // Get the user's information from the cookie
    const userJson = getCookie(loggedInUserEmail);

    // Parse the user's information JSON
    const user = JSON.parse(userJson);

    // Update the user's information with the new values
    user.name = name;
    user.email = email;
    user.mobile = mobile;

    // Save the updated user's information back to the cookie
    setCookie(loggedInUserEmail, JSON.stringify(user), 30);

    // Vô hiệu hóa chế độ chỉnh sửa bằng cách thêm lại thuộc tính "readonly" vào các input
    inputElements.forEach((input) => (input.readOnly = true));
    editSaveBtn.textContent = "Edit";

    // Show success message and reload the page
    alert("Changes saved successfully.");
    location.reload();
  }
}

function toggleChangePassword() {
  var frameDoiMatKhau = document.getElementById("frameDoiMatKhau");
  if (frameDoiMatKhau.style.display === "none") {
    frameDoiMatKhau.style.display = "inline-block";
  } else {
    frameDoiMatKhau.style.display = "none";
  }
}
function changePass() {
  var oldPassInput = document.getElementById("oldPass");
  var newPassInput = document.getElementById("newPass");
  var confirmPassInput = document.getElementById("confirmPass");

  var newPassword = newPassInput.value;
  var confirmPassword = confirmPassInput.value;

  // Get the user's email from the logged-in state
  var loggedInUserEmail = getCookie("loggedInUser");

  // Get the user's information from the cookie
  var userJson = getCookie(loggedInUserEmail);
  // Parse the user's information JSON
  var user = JSON.parse(userJson);

  if (oldPassInput.value !== user.password) {
    alert("Incorrect old password.");
    oldPassInput.focus();
    return;
  }

  if (newPassword === "") {
    alert("New password cannot be blank.");
    newPassInput.focus();
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Confirm password must match the new password.");
    confirmPassInput.focus();
    return;
  }

  // Update the new password in the user's information
  user.password = newPassword;

  // Save the updated user's information back to the cookie
  setCookie(loggedInUserEmail, JSON.stringify(user), 30);

  // Clear the input fields
  oldPassInput.value = "";
  newPassInput.value = "";
  confirmPassInput.value = "";

  // Show a success alert
  alert("Password changed successfully.");

  // Hide the password change form
  toggleChangePassword();
}
