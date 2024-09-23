import novedadesData from "./novedadesData.js";

const novedades = novedadesData;
console.log(novedades);

// Llama a la función directamente para mostrar los libros al cargar la página
mostrarTodos(novedades);

function mostrarTodos(novedades) {
    mostrarEnHTML(novedades);
}

function mostrarEnHTML(novedades) {
    document.getElementById("contenedorr").innerHTML = "";
    for (let i = 0; i < novedades.length; i++) {
        
        let nombreLibro = novedades[i].nombre.replace(/\s+/g, '-'); // Reemplaza espacios por guiones
        
        // Añade un data-id y la clase 'carta' para el evento de clic
        document.getElementById("contenedorr").innerHTML += `
        <div class="book-item carta" data-id="${nombreLibro}" data-bs-toggle="modal" data-bs-target="#modalInfo">
            <img src="${novedades[i].portada}" alt="Portada del libro" class="book"/>
        </div>`;
    }

    // Añade los eventos de clic a las cartas
    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() { 
            var nombre = carta.getAttribute("data-id");
           
            let nombreOriginal = nombre.replace(/-/g, ' ');  // Reemplaza guiones con espacios
            var libro = novedades.find(lib => lib.nombre == nombreOriginal);
            
            // Actualiza el contenido del modal con la información del libro
            document.getElementById("modalTitulo").innerHTML = libro.nombre;
            document.getElementById("modalAutor").innerHTML = libro.autor;
            document.getElementById("modalSinopsis").innerHTML = libro.sinopsis;
        });
    });
}