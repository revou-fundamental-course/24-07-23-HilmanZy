let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

let touchStartX = 0;

function handleTouchMove(e) {
    if (touchStartX > e.touches[0].clientX) {
        changeSlide(1); 
    } else if (touchStartX < e.touches[0].clientX) {
        changeSlide(-1); 
    }
}


function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

let slideshowContainer = document.querySelector(".slideshow-container");
slideshowContainer.addEventListener("touchstart", handleTouchStart, false);
slideshowContainer.addEventListener("touchmove", handleTouchMove, false);

showSlides(slideIndex);


function autoSlide() {
    changeSlide(1);
    setTimeout(autoSlide, 7000);
}

setTimeout(autoSlide, 7000);

let dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
        currentSlide(i + 1);
    });
}

slideshowContainer.addEventListener("mouseover", function () {
    clearTimeout(slideshowTimeout);
});

slideshowContainer.addEventListener("mouseout", function () {
    slideshowTimeout = setTimeout(showSlides, 7000);
});




// VALIDATION FUNCTION

const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

function showValidationMessage(inputElement, isValid) {
    const validationMessage = inputElement.nextElementSibling;
    if (isValid) {
        inputElement.style.borderColor = 'green';
        validationMessage.style.display = 'none';
    } else {
        inputElement.style.borderColor = 'red';
        validationMessage.style.display = 'block';
    }
}

function hideValidationMessage(inputElement) {
    const validationMessage = inputElement.nextElementSibling;
    inputElement.style.borderColor = '#9FAFC1';
    validationMessage.style.display = 'none';
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const firstNameInput = document.getElementById('fname');
    const emailInput = document.getElementById('email');

    const firstNameIsValid = nameRegex.test(firstNameInput.value);
    showValidationMessage(firstNameInput, firstNameIsValid);

    const emailIsValid = emailRegex.test(emailInput.value);
    showValidationMessage(emailInput, emailIsValid);

    if (firstNameIsValid && emailIsValid) {
        this.submit();
    } else {
        alert('Pastikan data yang Anda masukkan benar.');
    }
});

document.querySelectorAll('.input-field').forEach(inputElement => {
    inputElement.addEventListener('input', function () {
        hideValidationMessage(inputElement);
    });
});

document.querySelectorAll('.validation-message').forEach(messageElement => {
    messageElement.style.display = 'none';
});

