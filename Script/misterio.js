import romanceData from "./romanceData.js";

const libros = romanceData;


console.log(libros);

//EVENTOS:

document.getElementById("mostrarTodos").addEventListener("click", function(){
    mostrarTodos(libros);
});

document.getElementById("ordenarAlfabeticamente").addEventListener("click", function(){
    ordenarAlfa(libros);
});

document.getElementById("ordenarAlfabeticamente").addEventListener("click", function(){
    ordenarAlfa(libros);

document.getElementById("txtNombre").addEventListener("input", function(){
    filtrarPorNombre(libros,document.getElementById("txtNombre").value.toLowerCase());
    })
});

document.getElementById("sub-categoria").addEventListener("click", function(){
    filtrarPorCategoria(libros,document.getElementById("sub-categoria").value);
});

document.getElementById("btnEstadisticas").addEventListener("click", function(){
    mostrarEstadisticas(libros);
})



//FUNCIONES:

function filtrarPorCategoria(libros,subcategorias){
    const filtradosPorCategoria = libros.filter(function(libro){return libro.subcategorias.includes(subcategorias)});
    mostrarEnHTML(filtradosPorCategoria);
}

function mostrarTodos(libros){
    mostrarEnHTML(libros);
}

function ordenarAlfa(libros){
    const librosOrdenados = libros.slice();
    librosOrdenados.sort(function(a,b){return a.nombre.localeCompare(b.nombre)});
    mostrarEnHTML(librosOrdenados);
}

function filtrarPorNombre(libro, txtNombre){
    const filtradoPorNombre = libros.filter(function(libro){return libro.nombre.toLowerCase().includes(txtNombre)});
     mostrarEnHTML(filtradoPorNombre);
}

function mostrarEstadisticas(libros) {
    // Obtener el contexto del canvas donde se dibujará el gráfico
    var ctx = document.getElementById('myPieChart').getContext('2d');
    
    // Crear el gráfico de pastel
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Drama', 
                'Juvenil', 
                'Ficción contemporánea', 
                'Ficción clásica', 
                'Ficción gótica', 
                'Distopía', 
                'Aventura', 
                'Tragedia', 
                'Ficción histórica'
            ],
            datasets: [{
                label: 'Subcategorías',
                data: [27, 12, 11, 5, 2, 1, 1, 1, 2], // Frecuencias de las subcategorías
                backgroundColor: [
                    '#FF6384', // Rojo claro
                    '#36A2EB', // Azul
                    '#FFCE56', // Amarillo
                    '#4BC0C0', // Verde claro
                    '#9966FF', // Morado
                    '#FF9F40', // Naranja
                    '#a52a2a', // Marron
                    '#3a75f3', // Verde
                    '#aedcdd'  // Amarillo
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

// Llamar a la función para generar el gráfico de pastel
mostrarEstadisticas();


function mostrarEnHTML(libros){
    document.getElementById("contenedor").innerHTML="";
    for(let i=0;i<libros.length;i++){
    document.getElementById("contenedor").innerHTML+=
    `
    <div>
    <img src="${libros[i].portada}"/>
    <p>${libros[i].nombre}</p>
    <p>${libros[i].autor}</p>
    <p>${libros[i].año_lanzamiento}</p>
</div>
    `
    }
}