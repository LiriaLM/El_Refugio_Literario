import accesorioaData from "./accesorioaData.js";

const accesorioa = accesorioaData;
console.log(accesorioa);

// Llama a la función directamente para mostrar los libros al cargar la página
mostrarTodos(accesorioa);

function mostrarTodos(accesorios) {
    mostrarEnHTML(accesorios);
}

function mostrarEnHTML(accesorios) {
    document.getElementById("contenedoorr").innerHTML = "";
    for (let i = 0; i < accesorios.length; i++) {
        
        let nombreAccesorio = accesorios[i].nombre.replace(/\s+/g, '-'); // Reemplaza espacios por guiones
        
        // Añade un data-id y la clase 'carta' para el evento de clic
        document.getElementById("contenedoorr").innerHTML += `
        <div class="book-item carta" data-id="${nombreAccesorio}" data-bs-toggle="modal" data-bs-target="#modalInfo">
            <img src="${accesorios[i].portada}" alt="Portada del accesorio" class="book"/>
        </div>`;
    }

    // Añade los eventos de clic a las cartas
    let cartas = document.getElementsByClassName("carta");

    Array.from(cartas).forEach(carta => {
        carta.addEventListener("click", function() { 
            var nombre = carta.getAttribute("data-id");
           
            let nombreOriginal = nombre.replace(/-/g, ' ');  // Reemplaza guiones con espacios
            var accesorio = accesorios.find(acc => acc.nombre == nombreOriginal);
            
            // Actualiza el contenido del modal con la información del accesorio
            document.getElementById("modalTitulo").innerHTML = accesorio.nombre;
            document.getElementById("modalAutor").innerHTML = `Precio: ${accesorio.precio}`;
            document.getElementById("modalSinopsis").innerHTML = `Marca: ${accesorio.marca}`;
        });
    });
}