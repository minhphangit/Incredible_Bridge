// Code goes here
// Code goes here
function responsiveSlider() {
  const slider = document.querySelector(".list-product");
  let sliderWidth = slider.offsetWidth / 3;
  const sliderList = document.querySelector(".slider-inner");
  let items = sliderList.querySelectorAll(".slider-item").length - 2;
  let count = 1;

  window.addEventListener("resize", function () {
    sliderWidth = slider.offsetWidth;
  });

  function prevSlide() {
    if (count > 1) {
      count = count - 2;
      sliderList.style.left = "-" + count * sliderWidth + "px";
      count++;
    } else if (count == 1) {
      count = items - 1;
      sliderList.style.left = "-" + count * sliderWidth + "px";
      count++;
    }
  }
  function nextSlide() {
    if (count < items) {
      sliderList.style.left = "-" + count * sliderWidth + "px";
      count++;
    } else if (count == items) {
      sliderList.style.left = "0px";
      count = 1;
    }
  }
  prev.addEventListener("click", prevSlide);
  next.addEventListener("click", nextSlide);
  setInterval(function () {
    nextSlide();
  }, 3000);
}

window.onload = function () {
  responsiveSlider();
};
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
          const apiKey = "pk.f38ff315feeca7c6d2068bd716da73ad";
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
