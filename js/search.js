// Nhận kết quả tìm kiếm :
document.addEventListener("DOMContentLoaded", () => {
  // Lấy dữ liệu kết quả tìm kiếm từ URL
  const searchParams = new URLSearchParams(window.location.search);
  const searchbox = searchParams.get("searchbox");
  const resultsJson = searchParams.get("results");
  const results = JSON.parse(resultsJson);

  // Hiển thị giá trị của searchbox lên trang search.html
  const searchResultsHeading = document.getElementById(
    "search-results-heading"
  );
  searchResultsHeading.textContent += ` "${searchbox}"`;
  // Hiển thị kết quả tìm kiếm lên trang search.html
  const searchResultsDiv = document.getElementById("search-results");
  if (results && results.length > 0) {
    searchResultsDiv.innerHTML = results
      .map(
        (result) => `
            <div class="col-md-4 mb-4">
              <div class="product px-3">
                <a href="#!">
                  <div class="card overflow-hidden wow zoomIn" data-wow-delay="0.1s">
                    <img
                      src="${result.imgSrc}"
                      class="card-img-top card-img"
                      alt="${result.productName}"
                    />
                    <div class="card-body wow fadeInUp" data-wow-delay="0.1s">
                      <h5 class="card-title">${result.productName}</h5>
                      <p class="card-text ms-1">${result.productDetails}</p>
                      <a
                        href="#"
                        class="btn btn-success btn-add-cart text-white bg-main-color border-0"
                        >Learn more</a
                      >
                    </div>
                  </div>
                </a>
              </div>
            </div>
          `
      )
      .join("");
  } else {
    searchResultsDiv.innerHTML = "<p>No matching products found!</p>";
  }
});
