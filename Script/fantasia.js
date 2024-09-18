import fantasiaData from "./fantasiaData.js";
const libros = fantasiaData;

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