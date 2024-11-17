import { useState,useEffect} from 'react'
import './App.css'
import FormLocalStorage from './components/FormLocalStorage'
import Table from './components/Table'

function App() {
  const [valuesForm,setValuesForm] = useState({
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: ''
  });

  const [showTable,setShowTable] = useState(false);
  const [editForm,setEditForm] = useState(false);

  const callbackShowTable = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i); // Obtenemos cada clave
      if (!isNaN(clave)) { // Verificamos si es un número
          return setShowTable(true);
      }
    }
    return setShowTable(false);
  };
  useEffect(() => {
    callbackShowTable();
  },[]);

  //Callback para Form sin LocalStorage
  // const callbackForm = (data) => {
  //   setValuesForm(data);
  //   for(let dato in data){
  //     if(dato != ''){
  //       setShow(true);
  //     }
  //   }
  // }
  
  useEffect(() => {
    console.log("valuesForm: ",valuesForm);
  }
  ,[valuesForm]);

  //Callback para obtener los valores de un registro a editar
  function callbackEditRegistro(idEdit){
    const registro = JSON.parse(localStorage.getItem(idEdit));
    setValuesForm({
      id: idEdit,
      documento: registro.documento,
      nombre: registro.nombre,
      apellido: registro.apellido,
      telefono: registro.telefono,
      correo: registro.correo
    });
    setEditForm(true);
  };
  return (
    <div id="body">
      <div id="divForm">
        {editForm ?
          <FormLocalStorage title='Editar' data={valuesForm}></FormLocalStorage>
          :
          <FormLocalStorage title='Registro' data={valuesForm}></FormLocalStorage>
        }
      </div>
      {showTable &&
        <div id="divLista">
          <Table callbackEditRegistro={callbackEditRegistro} callbackShowTable={callbackShowTable}></Table>
        </div>
      }
    </div>
  )
}
export default App