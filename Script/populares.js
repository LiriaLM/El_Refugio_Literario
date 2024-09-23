import popularesData from "./popularesData.js";

const populares = popularesData;
console.log(populares);

// Llama a la función directamente para mostrar los libros al cargar la página
mostrarTodos(populares);

function mostrarTodos(populares) {
    mostrarEnHTML(populares);
}

function mostrarEnHTML(populares) {
    document.getElementById("contenedor").innerHTML = "";
    for (let i = 0; i < populares.length; i++) {
        
        let nombreLibro = populares[i].nombre.replace(/\s+/g, '-'); // Elimina todos los espacios
        
        document.getElementById("contenedor").innerHTML += `
         <div class="book-item carta" data-id="${nombreLibro}" data-bs-toggle="modal" data-bs-target="#modalInfo">
            <img src="${populares[i].portada}" alt="Portada del libro" class="book"/>
        </div>`;
    }

    // Añade los eventos de clic a las cartas
    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() { 
            var nombre = carta.getAttribute("data-id");
           
            let nombreOriginal = nombre.replace(/-/g, ' ');  // Reemplaza guiones con espacios
            var libro = populares.find(lib => lib.nombre == nombreOriginal);
            
            // Actualiza el contenido del modal con la información del libro
            document.getElementById("modalTitulo").innerHTML = libro.nombre;
            document.getElementById("modalAutor").innerHTML = libro.autor;
            document.getElementById("modalSinopsis").innerHTML = libro.sinopsis;
        });
    });
}