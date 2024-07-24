import {useEffect, useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';
function App() {
  const [tareainput,Settareainput]= useState("");//se recupera el valor del input
 
  const [listatareas,Setnuevatarea] = useState([]);//para agregar datos a la lista

  const [estado_ls,Setestado_ls] = useState(false);//para saber el estado del localstorage
  
  const Verificar_ls = () => {
    if (localStorage.getItem("tareas_ls")!=null){
      Setnuevatarea(JSON.parse(localStorage.getItem("tareas_ls")));
      Setestado_ls(true);
      }
  }
 
  const Almacenar_ls = () => {
    localStorage.setItem("tareas_ls",JSON.stringify(listatareas))
  }

  

  const Valor_input = (e) => {
    Settareainput(e.target.value);
  }

  const Agregar_tarea = () =>{
    Setnuevatarea([...listatareas,tareainput]);
    Settareainput('');
    M.toast({html: `Se agrego la tarea ${tareainput}`})
    
  }

  const Borrar_tarea = (posicion) => {
    M.toast({html: `Se borro la tarea ${listatareas[posicion]}`})
    const lista_modificada = listatareas.filter((_,i)=> i !== posicion);
    Setnuevatarea(lista_modificada);
   
    
  }

  const Marcar_tarea = (posicion) => {
    M.toast({html: `Se completo la tarea ${listatareas[posicion]}`})
    const lista_modificada = listatareas.map((tarea,i)=>
    i===posicion ? `${tarea} (Realizada)`: tarea)
    Setnuevatarea(lista_modificada);
    

  }

useEffect(()=>{
  
  if(estado_ls === false && listatareas.length===0)
  {

    Verificar_ls();
      
  }else{
    Almacenar_ls();
    
  }

},)

  return (
    <div class="container">
      <div class="col s12 center-align">
          <h5>Lista de tareas</h5>
          <br/>
          <br/>
          <br/>
        
        <div class='col s6'>
          <div class='row'>
            <div class='input-field col s6'>
              <input type='text' id='tarea' value={tareainput} onChange={Valor_input}/>
              <label for='tarea'>Inserte una tarea</label>
            </div>

            <div class='input-field col s6 center-align'>
              <a class="waves-effect waves-light btn" onClick={Agregar_tarea}>Agregar tarea</a>
            </div>
          </div>
        </div>
        <ul class='collection with-header'>
        <li class="collection-header"><h5>Lista de tareas ingresadas</h5></li>
        {listatareas.map((tarea,posicion)=>(
          
          <li class='collection-item left-align' key={posicion}>
            <div>
            {tarea}
            <a href='' onClick={() => Borrar_tarea(posicion) } class="secondary-content"><i class="material-icons">backspace</i></a>
            <a href='' onClick={() => Marcar_tarea(posicion) } class="secondary-content"><i class="material-icons">check</i></a>
            </div>
          </li>
        ))}
        </ul>
      </div>
   </div>
  );
}

export default App;
