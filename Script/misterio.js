import misterioData from "./misterioData.js";

const libros = misterioData;

// EVENTOS:
document.getElementById("mostrarTodos").addEventListener("click", function(){
    mostrarTodos(libros);
});

document.getElementById("ordenarAlfabeticamente").addEventListener("click", function(){
    ordenarAlfa(libros);
});

document.getElementById("txtNombre").addEventListener("input", function(){
    filtrarPorNombre(libros, document.getElementById("txtNombre").value.toLowerCase());
});

document.getElementById("sub-categoria").addEventListener("change", function(){
    filtrarPorCategoria(libros, document.getElementById("sub-categoria").value);
});

document.getElementById("btnEstadisticas").addEventListener("click", function(){
    mostrarEstadisticas(libros);
});

// FUNCIONES:
function mostrarTodos(libros) {
    mostrarEnHTML(libros);
}

function ordenarAlfa(libros) {
    const librosOrdenados = libros.slice();
    librosOrdenados.sort(function(a, b) {
        return a.nombre.localeCompare(b.nombre);
    });
    mostrarEnHTML(librosOrdenados);
}

function filtrarPorCategoria(libros, subcategoria) {
    const filtradosPorCategoria = libros.filter(function(libro) {
        return libro.subcategorias.includes(subcategoria);
    });
    mostrarEnHTML(filtradosPorCategoria);
}

function filtrarPorNombre(libros, txtNombre) {
    const filtradosPorNombre = libros.filter(function(libro) {
        return libro.nombre.toLowerCase().includes(txtNombre);
    });
    mostrarEnHTML(filtradosPorNombre);
}

function mostrarEstadisticas(libros) {
    document.getElementById("contenedor").innerHTML = `<canvas id="myPieChart"></canvas>`;
    const ctx = document.getElementById('myPieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Thriller', 'Suspenso', 'Crimen', 'Thriller psicológico', 'Ficción histórica', 'Detectivesco', 'Suspenso psicológico', 'Ficción contemporánea', 'Ficción literaria', 'Cuentos cortos', 'Filosofía', 'Ficción juvenil'],
            datasets: [{
                label: 'Frecuencia de Subcategorías',
                data: [10, 8, 7, 6, 5, 5, 3, 3, 2, 1, 1, 1],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB', '#FF6384', '#FF9F40', '#9966FF'],
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
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' veces';
                        }
                    }
                }
            }
        }
    });
}

function mostrarEnHTML(libros) {
    document.getElementById("contenedor").innerHTML = "";
    libros.forEach((libro, index) => {
        document.getElementById("contenedor").innerHTML += `
            <div class="carta" data-id="${index}" data-bs-toggle="modal" data-bs-target="#modalInfo">
                <img src="${libro.portada}" alt="${libro.nombre}"/>
            </div>
        `;
    });

    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() { 
            const id = carta.getAttribute("data-id");
            const libro = libros[id];

            if (libro) {
                document.getElementById("modalTitulo").innerHTML = libro.nombre;
                document.getElementById("modalAutor").innerHTML = libro.autor;
                document.getElementById("modalSinopsis").innerHTML = libro.sinopsis;
            }
        });
    });
}
