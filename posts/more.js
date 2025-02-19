document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    // Función para aplicar los filtros de búsqueda y categoría
    const applyFilters = () => {
        const searchText = searchInput.value.toLowerCase();
        // Capturamos los filtros activos (si "Todos" está activo, no se aplicará ningún filtro de categoría)
        const activeFilters = [...filterButtons]
            .filter(btn => btn.classList.contains("active") && btn.dataset.category !== "all")
            .map(btn => btn.dataset.category.toLowerCase());

        cards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const desc = card.querySelector(".card-desc").textContent.toLowerCase();
            const categories = card.dataset.category.toLowerCase().split(",").map(cat => cat.trim());

            const matchesSearch = title.includes(searchText) || desc.includes(searchText);
            const matchesFilter = activeFilters.length === 0 || activeFilters.some(filter => categories.includes(filter));

            // Mostrar u ocultar las cartas según los filtros
            card.style.display = (matchesSearch && matchesFilter) ? "block" : "none";
        });
    };

    // Aplicar filtros cuando el usuario escribe en el campo de búsqueda
    searchInput.addEventListener("input", applyFilters);

    // Agregar eventos a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Si el filtro es "Todos", activamos ese filtro y desactivamos los demás
            if (button.dataset.category === "all") {
                // Activamos "Todos" y desactivamos los demás filtros
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            } else {
                // Alternamos el filtro activo
                button.classList.toggle("active");
                // Si no hay filtros activos, activamos "Todos"
                if (![...filterButtons].some(btn => btn.classList.contains("active"))) {
                    const allBtn = [...filterButtons].find(btn => btn.dataset.category === "all");
                    allBtn.classList.add("active");
                }
            }
            button.style.transform = "scale(1.2)";
            setTimeout(() => button.style.transform = "scale(1)", 150);
            // Aplicar filtros después de hacer clic
            applyFilters();
        });
    });

    // Aplicar los filtros al cargar la página para que se muestren todas las cartas inicialmente
    // Aseguramos que el filtro de "Todos" esté activo por defecto
    const allBtn = [...filterButtons].find(btn => btn.dataset.category === "all");
    allBtn.classList.add("active");
    applyFilters();
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-filters");
    const filterGroup = document.querySelector(".filter-group");

    toggleButton.addEventListener("click", function () {
        filterGroup.classList.toggle("show");

        // Cambiar el ícono de "+" a "-"
        if (filterGroup.classList.contains("show")) {
            toggleButton.textContent = "−"; // Símbolo de menos
        } else {
            toggleButton.textContent = "+"; // Símbolo de más
        }
    });
});

