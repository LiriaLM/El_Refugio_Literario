

fetch(`novedades.json`)
  .then (response => response.json())
  .then ( novedades => {

    console.log(novedades);

  })

  
  .catch(error => console.error(`Error loading the JSON file:`, error));