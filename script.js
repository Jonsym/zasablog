window.addEventListener('scroll', function() {
  let scrollPosition = window.pageYOffset;
  let parallax = document.querySelector('.hero');
  if (parallax) {
    parallax.style.backgroundPosition = `center ${scrollPosition * 0.5}px`; /* Control de la velocidad */
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const spinner = document.querySelector(".spinner-container");

  if (spinner) {
    // Espera 2 segundos antes de iniciar la animación de ocultación
    setTimeout(() => {
      spinner.classList.add("slide-up");
    }, 1000);

    // Detecta cuando la animación termina para ocultar completamente el spinner
    spinner.addEventListener("animationend", function () {
      spinner.style.display = "none"; // Lo oculta después de la animación
    }, { once: true }); // Se ejecuta solo una vez
  }
});





