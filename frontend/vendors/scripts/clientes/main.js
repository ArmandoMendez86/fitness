/* Variables */
const tablaClientes = document.querySelector("#tabClientes")
tablaClientes.addEventListener("click", (e)=>{

  let editar = e.target.closest(".editar")
  let eliminar = e.target.closest(".eliminar")

  if(editar){
    console.log("contienen la clase editar")
    
  }
  if(eliminar){
    console.log("contienen la clase eliminar")
  }

 


})







