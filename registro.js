let url = "http://localhost:4002/usuarios/";
let formulario = document.getElementById("formulario")
const buscarCorreo = document.getElementById("buscarCorreo")
const editar= document.getElementById('editar') 
const borrar = document.getElementById("borrar")


formulario.addEventListener("submit", async(e) => {

    e.preventDefault();
    let name = document.getElementById("nombre").value
    let lastName = document.getElementById("apellido").value
    let email = document.getElementById("email").value
    
console.log(name,lastName,email)



   await fetch(url, {
       method: "POST",
       body: JSON.stringify({
           name,
           lastName,
           email           
       }),
       headers: {
           "Content-Type": "application/json; charset=UTF-8"
       }
   })
})
//Metodo BUSCAR o filtro


buscarCorreo.addEventListener('click', async () => {
    const buscarCorreo = document.getElementById("email").value
    const datos= await fetch (url)
    const data= await datos.json()
    

    const busqueda = data.find(usuarios => usuarios.email === buscarCorreo)
  const {name, lastName, email, id}= busqueda

  console.log(busqueda)
    

    document.getElementById('nombre').value = name 
    document.getElementById('apellido').value = lastName
    document.getElementById('email').value = email
    document.getElementById('id').value = id
   


})

//Actualizar datos

editar.addEventListener( 'click', async() =>{
   
  let name = document.getElementById("nombre").value
const lastName= document.getElementById('apellido').value
const email= document.getElementById('email').value
const id= document.getElementById('id').value
console.log(email,name,lastName)

 await fetch(url + id, {
    method: "PUT",
    body: JSON.stringify({
      name,
      lastName,
      email
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
});


borrar.addEventListener( 'click', () => {

  const idborar = document.getElementById("id").value
  
  fetch(url + idborar, {
    method: "DELETE"
  })


})
