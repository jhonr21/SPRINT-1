const apiKey = "api_key=f3cb710ccf9761e78278185874899538";
const baseUrl = "https://api.themoviedb.org/3"
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey
const imagenUrl = 'https://image.tmdb.org/t/p/w1280'
const masvalorrada = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';
const menosValorada = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=f3cb710ccf9761e78278185874899538&page=1&vote_count.gte=1000&language=en-US';
const video = "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=f3cb710ccf9761e78278185874899538&language=en-US"


const obtenerDatos = async (url) => {
  const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey
  const datosObtenidosApi = await fetch(apiUrl);    
  const peliculas = await datosObtenidosApi.json()    
  const {results} = peliculas;
  
  return results
}
    


const obtenerpeli= async() => {
  
  let data= await obtenerDatos();

    data.forEach(data => {
      //imagen slider
      //const imagenSlider = imagenUrl + data.backdrop_path
       

      //const div = document.getElementById("slider")
      //div.innerHTML += `<img src="${imagenSlider}" class="d-block w-100" alt="...">`
      
      
        const id = data.id;
        const titulo = data.title;
        const imagen = imagenUrl + data.poster_path

        let descripcion = data.overview;
          descripcion = descripcion.split("'");
        const calificacion = data.vote_average;

        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body tarjeta">
              <h5 class="card-title">${titulo}</h5>
              <a href="#" id='cali' >${calificacion}</a>
              <button class="btn btn-primary" type="button" class="class1" onclick="classToggle('${id}','${titulo}','${descripcion}', '${imagen}')" >VER MAS</button>
            </div>
          </div>
          `
      
  })


}

document.addEventListener('DOMContentLoaded', obtenerpeli);



//BUSQUEDA DE PALABRAS COINCIDENTES

let boton = document.getElementById("btnBuscar")
boton.addEventListener("click", async () => {
    buscarPelicula()
    
})

const buscarPelicula = async() => {
    let texto = document.getElementById("search").value
    let datos = await obtenerDatos ()
   
    
    let buscar = datos.filter(filtro => filtro.title.toLowerCase() === texto.toLowerCase())

    console.log(buscar)

    contenedor.innerHTML = ""
   

    buscar.forEach(filtro => {
       
        //inicio tarjetas

        const titulo = filtro.title;
          const imagen = imagenUrl + filtro.poster_path;
          
          let descripcion = filtro.overview;
          descripcion = descripcion.split("'");
      
      
          const calificacion = filtro.vote_average;
          
      
          const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body tarjeta">
              <h5 class="card-title">${titulo}</h5>
              <a href="#" class="btn btn-primary">${calificacion}</a>
              <button class="btn btn-primary" type="button" class="class1" onclick="classToggle('${titulo}','${descripcion}', '${imagen}')" >VER MAS</button>
            </div>
          </div>
          `
        
    })
}



//FILTRO MAS VALORADAS

let valoradas = document.getElementById("masvalor")
const contenedor = document.getElementById("contenedor")

valoradas.addEventListener("click", async () => {
    const datos  =  await fetch(masvalorrada)
    const data = await datos.json()
    const peliculas =   data.results
    console.log(peliculas)

    contenedor.innerHTML = ""

    peliculas.forEach(peliculas => {

      const titulo = peliculas.title;
      const imagen = imagenUrl + peliculas.poster_path
      let descripcion = peliculas.overview;
        descripcion = descripcion.split("'");
      const calificacion = peliculas.vote_average;
      
      const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body tarjeta">
              <h5 class="card-title">${titulo} </h5>
              <a href="#" class="btn btn-primary">${calificacion}</a>
              <button class="btn btn-primary" type="button" class="class1" onclick="classToggle('${titulo}','${descripcion}', '${imagen}')" >VER MAS</button>
            </div>
          </div>
          `

    })
})

//Menos Valoradas

let MenosVal = document.getElementById("menosvalor")


MenosVal.addEventListener("click", async () => {
    const datos  =  await fetch(menosValorada)
    const data = await datos.json()
    const peliculas =   data.results
    console.log(peliculas)

    contenedor.innerHTML = ""

    peliculas.forEach(peliculas => {
      const id = peliculas.id;
      const titulo = peliculas.title;
      const imagen = imagenUrl + peliculas.poster_path
      let descripcion = peliculas.overview;
        descripcion = descripcion.split("'");
      const calificacion = peliculas.vote_average;
       

      const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML += `<div class="card movie" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body tarjeta">
              <h5 class="card-title">${titulo}</h5>
              <h1 href="#" class="btn btn-primary">${calificacion} </h1>
              <button class="btn btn-primary" type="button" class="class1" onclick="classToggle('${titulo}','${descripcion}', '${imagen}')" >VER MAS</button>
            </div>
          </div>
          `

    })
})




//Modal

function classToggle(id,titulo,descripcion, imagen ) {

  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));


  const tituloF = document.getElementById("titulo_f");

  tituloF.innerHTML = `${titulo}`;
  
  const imagen_f = document.getElementById("imagen_f");
  imagen_f.innerHTML = `<img src="${imagen}" alt="" id="img2">`;

  const descripcionF = document.getElementById("descripcion_f");

  descripcionF.innerHTML = `${descripcion}`;

  myModal.show();



const trailer = document.getElementById("trailer");
trailer.addEventListener("click", async () => {
  
  $('#exampleModal').modal('hide');
  
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f3cb710ccf9761e78278185874899538&language=en-US`
  const datos = await fetch (url)
  const data = await datos.json()
  const video = data.results[0].key
  
  
  

  contenedor.innerHTML=""
  contenedor.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
      <div class="modal-body">
          
      <iframe width="100%" height="300%"
   src="https://www.youtube.com/embed/${video}" title="YouTube video player" 
   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture" allowfullscreen></iframe>

          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
         
      </div>
      </div>
     
  </div>

</div>`

})
}




 