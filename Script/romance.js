import romanceData from "./romanceData.js";

const libros = romanceData;
console.log(libros);

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

document.getElementById("sub-categoria").addEventListener("click", function(){
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
            labels: [
                'Drama', 'Juvenil', 'Ficción contemporánea', 'Ficción clásica', 'Ficción gótica', 
                'Distopía', 'Aventura', 'Tragedia', 'Ficción histórica'
            ],
            datasets: [{
                label: 'Frecuencia de Subcategorías',
                data: [27, 12, 11, 5, 2, 1, 1, 1, 2],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#a52a2a', '#3a75f3', '#aedcdd'
                ],
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

function mostrarEnHTML(libros) {
    document.getElementById("contenedor").innerHTML = "";

    libros.forEach((libro, index) => {
        document.getElementById("contenedor").innerHTML += `
            <div class="carta" data-id="${index}" data-bs-toggle="modal" data-bs-target="#modalInfo">
                <img src="${libro.portada}" alt="${libro.nombre}" class="book"/>
            </div>
        `;
    });

    // Asignar eventos a las cartas
    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() { 
            const id = carta.getAttribute("data-id"); // Ahora usamos el índice como id
            const libro = libros[id]; // Accedemos directamente al libro usando el índice

            if (libro) {
                document.getElementById("modalTitulo").innerHTML = libro.nombre;
                document.getElementById("modalAutor").innerHTML = libro.autor;
                document.getElementById("modalSinopsis").innerHTML = libro.sinopsis;
            }
        });
    });
}
