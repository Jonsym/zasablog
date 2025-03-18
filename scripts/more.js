document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");
    const toggleButton = document.getElementById("toggle-filters");
    const filterGroup = document.querySelector(".filter-group");

    // Función para aplicar los filtros
    const applyFilters = () => {
        const searchText = searchInput.value.toLowerCase();
        
        // Obtener las categorías activas (excepto "Todos")
        const activeCategories = [...filterButtons]
            .filter(btn => btn.classList.contains("active") && btn.dataset.category !== "all")
            .map(btn => btn.dataset.category.toLowerCase());

        cards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const desc = card.querySelector(".card-desc").textContent.toLowerCase();
            const categories = card.dataset.category.toLowerCase().split(",").map(cat => cat.trim());

            const matchesSearch = title.includes(searchText) || desc.includes(searchText);
            const matchesFilter = activeCategories.length === 0 || activeCategories.some(filter => categories.includes(filter));

            // Mostrar solo las cartas que coincidan con la búsqueda y los filtros
            card.style.display = (matchesSearch && matchesFilter) ? "block" : "none";
        });
    };

    // Evento para la barra de búsqueda
    searchInput.addEventListener("input", applyFilters);

    // Evento para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Evitar que el botón "+" active la lógica de los filtros
            if (button.id === "toggle-filters") return;

            const category = button.dataset.category;

            if (category === "all") {
                // Si se selecciona "Todos", limpiar otros filtros y activar solo este
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            } else {
                // Alternar estado de activación del botón
                button.classList.toggle("active");

                // Si ningún filtro está activo, activar "Todos"
                const anyActive = [...filterButtons].some(btn => btn.classList.contains("active") && btn.dataset.category !== "all");
                const allBtn = [...filterButtons].find(btn => btn.dataset.category === "all");

                if (!anyActive) {
                    allBtn.classList.add("active");
                } else {
                    allBtn.classList.remove("active");
                }
            }

            applyFilters();

            // Animación de clic
            button.style.transform = "scale(1.2)";
            setTimeout(() => button.style.transform = "scale(1)", 150);
        });
    });

    // Lógica para el botón "+" (solo para mostrar/ocultar los filtros)
    toggleButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Evita que el evento afecte otros elementos
        filterGroup.classList.toggle("show");
        this.textContent = filterGroup.classList.contains("show") ? "−" : "+";
    });

    // Asegurar que el filtro "Todos" esté activo por defecto
    document.querySelector(".filter-btn[data-category='all']").classList.add("active");
    applyFilters();
});
