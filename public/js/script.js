(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#star-rating .star"); // Select all stars
  const ratingInput = document.getElementById("rating"); // Hidden input field for the rating

  let selectedValue = 0; // Stores the selected star value

  stars.forEach((star) => {
    // Highlight stars on hover
    star.addEventListener("mouseover", () => {
      resetStars();
      highlightStars(star.dataset.value);
    });

    // Reset stars on mouse out, keeping selected value highlighted
    star.addEventListener("mouseout", () => {
      resetStars();
      highlightStars(selectedValue, true);
    });

    // Update selected value and hidden input on click
    star.addEventListener("click", () => {
      selectedValue = star.dataset.value; // Update the selected value
      ratingInput.value = selectedValue;  // Update hidden input value
      resetStars();
      highlightStars(selectedValue, true); // Persist the highlight

      // console.log(`Rating selected: ${ratingInput.value}`);
    });
  });

  // Helper to reset all stars
  function resetStars() {
    stars.forEach((star) => {
      star.classList.remove("hover", "selected");
    });
  }

  // Helper to highlight stars up to the given value
  function highlightStars(value, persist = false) {
    stars.forEach((star) => {
      if (star.dataset.value <= value) {
        if (persist) {
          star.classList.add("selected");
        } else {
          star.classList.add("hover");
        }
      }
    });
  }
});

