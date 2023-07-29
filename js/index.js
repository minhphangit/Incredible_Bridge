// slide Top Historical Bridge
$(".slide-responsive").slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
});
// slide Top Symbol Bridge
var curpage = 1;
var sliding = false;
var click = true;
var left = document.getElementById("left");
var right = document.getElementById("right");
var pagePrefix = "slide";
var pageShift = 500;
var transitionPrefix = "circle";
var svg = true;

function leftSlide() {
  if (click) {
    if (curpage == 1) curpage = 7;
    console.log("woek");
    sliding = true;
    curpage--;
    svg = true;
    click = false;
    for (k = 1; k <= 6; k++) {
      var a1 = document.getElementById(pagePrefix + k);
      a1.className += " tran";
    }
    setTimeout(() => {
      move();
    }, 200);
    setTimeout(() => {
      for (k = 1; k <= 6; k++) {
        var a1 = document.getElementById(pagePrefix + k);
        a1.classList.remove("tran");
      }
    }, 1400);
  }
}

function rightSlide() {
  if (click) {
    if (curpage == 6) curpage = 0;
    console.log("woek");
    sliding = true;
    curpage++;
    svg = false;
    click = false;
    for (k = 1; k <= 6; k++) {
      var a1 = document.getElementById(pagePrefix + k);
      a1.className += " tran";
    }
    setTimeout(() => {
      move();
    }, 200);
    setTimeout(() => {
      for (k = 1; k <= 6; k++) {
        var a1 = document.getElementById(pagePrefix + k);
        a1.classList.remove("tran");
      }
    }, 1400);
  }
}

function move() {
  if (sliding) {
    sliding = false;
    if (svg) {
      for (j = 1; j <= 9; j++) {
        var c = document.getElementById(transitionPrefix + j);
        c.classList.remove("steap");
        c.setAttribute("class", transitionPrefix + j + " streak");
        console.log("streak");
      }
    } else {
      for (j = 10; j <= 18; j++) {
        var c = document.getElementById(transitionPrefix + j);
        c.classList.remove("steap");
        c.setAttribute("class", transitionPrefix + j + " streak");
        console.log("streak");
      }
    }
    setTimeout(() => {
      for (i = 1; i <= 6; i++) {
        if (i == curpage) {
          var a = document.getElementById(pagePrefix + i);
          a.className += " up1";
        } else {
          var b = document.getElementById(pagePrefix + i);
          b.classList.remove("up1");
        }
      }
      sliding = true;
    }, 600);
    setTimeout(() => {
      click = true;
    }, 1700);

    setTimeout(() => {
      if (svg) {
        for (j = 1; j <= 9; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("streak");
          c.setAttribute("class", transitionPrefix + j + " steap");
        }
      } else {
        for (j = 10; j <= 18; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("streak");
          c.setAttribute("class", transitionPrefix + j + " steap");
        }
        sliding = true;
      }
    }, 850);
    setTimeout(() => {
      click = true;
    }, 1700);
  }
}

left.onmousedown = () => {
  leftSlide();
};

right.onmousedown = () => {
  rightSlide();
};

document.onkeydown = (e) => {
  if (e.keyCode == 37) {
    leftSlide();
  } else if (e.keyCode == 39) {
    rightSlide();
  }
};

// Hàm để chuyển slide sang phải tự động
function autoRightSlide() {
  rightSlide();
  setTimeout(autoRightSlide, 5000); // Gọi hàm autoRightSlide sau mỗi 3000 miliseconds (3 giây)
}

// Khởi động chuyển slide tự động sau khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(autoRightSlide, 3000); // Gọi hàm autoRightSlide sau khi trang tải xong và sau mỗi 3000 miliseconds (3 giây)
});

// location
async function updateTicker() {
  const tickerElement = document.getElementById("ticker-text");
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();
  let locationString = "Fetching location...";

  // Check if geolocation is available and user granted permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Call the LocationIQ Geocoding API to get the location name
          // const apiKey = "pk.4736bfa859b144a51c14905763d1b8fd";
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const locationName = data.display_name;

          locationString = locationName;
        } catch (error) {
          console.error("Error getting location name:", error);
          locationString = "Location unavailable";
        }

        // Update ticker text with the date, time, and location
        const tickerText = `${dateString} - ${timeString} - Location: ${locationString}`;
        tickerElement.innerText = tickerText;

        // Start scrolling the ticker
        tickerElement.style.animation = "scrollingTicker 20s linear infinite";
      },
      (error) => {
        console.error("Error getting geolocation:", error);

        // Update ticker text even if geolocation fails
        const tickerText = `${dateString} - ${timeString} - Location: ${locationString}`;
        tickerElement.innerText = tickerText;

        // Start scrolling the ticker
        tickerElement.style.animation = "scrollingTicker 20s linear infinite";
      }
    );
  } else {
    // If geolocation is not available, update ticker text accordingly
    const tickerText = `${dateString} - ${timeString} - Location: ${locationString}`;
    tickerElement.innerText = tickerText;

    // Start scrolling the ticker
    tickerElement.style.animation = "scrollingTicker 20s linear infinite";
  }
}

// Call updateTicker initially to show default "Fetching location..." message
updateTicker();

// Call updateTicker every 60 seconds to update the date, time, and location
setInterval(updateTicker, 1000);

// search
