let currentIndex = 0;
const images = document.getElementsByClassName("slider-image");
const dots = document.getElementsByClassName("dot");

function updateSlider(index) {
    const slider = document.getElementById("slider");
    slider.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dots).forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateSlider(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateSlider(currentIndex);
});

Array.from(dots).forEach((dot) => {
    dot.addEventListener("click", (event) => {
        currentIndex = parseInt(event.target.getAttribute("data-index"));
        updateSlider(currentIndex);
    });
});

updateSlider(currentIndex);
