import fantasiaData from "./fantasiaData.js";
const libros = fantasiaData;

// EVENTOS:
document.getElementById("mostrarTodos").addEventListener("click", function() {
    mostrarTodos(libros);
});

document.getElementById("ordenarAlfabeticamente").addEventListener("click", function() {
    ordenarAlfa(libros);
});

document.getElementById("txtNombre").addEventListener("input", function() {
    filtrarPorNombre(libros, document.getElementById("txtNombre").value.toLowerCase());
});

document.getElementById("sub-categoria").addEventListener("change", function() {
    filtrarPorCategoria(libros, document.getElementById("sub-categoria").value);
});

document.getElementById("btnEstadisticas").addEventListener("click", function() {
    mostrarEstadisticas(libros);
});

// FUNCIONES:
function filtrarPorCategoria(libros, subcategoria) {
    const filtradosPorCategoria = libros.filter(function(libro) {
        return libro.subcategorias.includes(subcategoria);
    });
    mostrarEnHTML(filtradosPorCategoria);
}



function ordenarAlfa(libros) {
    const librosOrdenados = libros.slice();
    librosOrdenados.sort(function(a, b) {
        const nombreA = typeof a.nombre === 'string' ? a.nombre : '';
        const nombreB = typeof b.nombre === 'string' ? b.nombre : '';
        return nombreA.localeCompare(nombreB);
    });
    mostrarEnHTML(librosOrdenados);
}
function mostrarTodos(libros) {
    mostrarEnHTML(libros);
}

function filtrarPorNombre(libros, txtNombre) {
    // Convertir el texto de búsqueda a minúsculas y eliminar espacios en blanco al inicio y al final
    const nombreBuscado = txtNombre.toLowerCase().trim();

    // Filtrar los libros cuyo título incluye el texto buscado
    const filtradoPorNombre = libros.filter(function(libro) {
        // Verificar que 'titulo' existe y es una cadena
        if (libro.titulo && typeof libro.titulo === 'string') {
            return libro.titulo.toLowerCase().includes(nombreBuscado);
        }
        return false; // Si no hay 'titulo' o no es una cadena, no incluir en los resultados
    });

    // Mostrar los libros filtrados en HTML
    mostrarEnHTML(filtradoPorNombre);
}


function mostrarEstadisticas(libros) {
        document.getElementById("contenedor").innerHTML = `<canvas id="myPieChart"></canvas>`;
        const ctx = document.getElementById('myPieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
        'Alta fantasía',
                    'Aventura',
                    'Fantasía juvenil',
                    'Magia',
                    'Fantasía épica',
                    'Política',
                    'Fantasía moderna',
                    'Épica',
                    'Histórica',
                    'Realismo mágico',
                    'Distopía',
                    'Alternativa',
                    'Mitología',
                    'Fantasía animal'
    ],
        datasets: [{
                label: 'Frecuencia de Subcategorías',
                data: [5, 12, 1, 5, 5, 1, 1, 6, 1, 1, 2, 1, 1, 1],
                backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#FF6384','#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#FF6384',
                        '#36A2EB'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}
mostrarEstadisticas();

function mostrarEnHTML(libros) {
    document.getElementById("contenedor").innerHTML = "";
    libros.forEach((libro, index) => {
        document.getElementById("contenedor").innerHTML += `
            <div class="carta" data-id="${index}" data-bs-toggle="modal" data-bs-target="#modalInfo">
                <img src="${libro.portada}" alt="${libro.titulo}"/>
            </div>
        `;
    });

    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() {
            const id = carta.getAttribute("data-id");
            const libro = libros[id];

            if (libro) {
                document.getElementById("modalTitulo").innerHTML = libro.titulo;
                document.getElementById("modalAutor").innerHTML = libro.autor;
                document.getElementById("modalSinopsis").innerHTML = libro.sinopsis;
                document.getElementById("modalAñoLanzamiento").innerHTML = libro.año_lanzamiento;
            }
        });
    });
}
