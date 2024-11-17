import { useState,useEffect } from "react";
import { FormEstilado, LabelEstilado, InputEstilado, BotonEstilado } from "./formLocalStorage.styled";
export default function FormLocalStorage({callBackShowTable,title, data = {documento: '', nombre: '', apellido: '', telefono: '', correo: ''}}) {
	const [values, setValues] = useState(data);
	useEffect(() => {
		setValues(data);
	},[data]);

	const incrementarContador = () => {
		let contador = localStorage.getItem('contador') || 0;
		contador = parseInt(contador) + 1;
		localStorage.setItem('contador', contador);
		return contador;
	};

	const editarRegistro = (values) => {
		localStorage.removeItem(values.id);
		localStorage.setItem(values.id, JSON.stringify(values));
	};

	const agregarRegistro = (values) => {
		const id = incrementarContador();
		values = {
			...values,
			id: id
		};
		localStorage.setItem(id, JSON.stringify(values));
	};

	const HandleChange = (e) => {
		const { name, value } = e.target;
		setValues((prevData) => (
			{
				...prevData,
				[name]: value
			}
		));
	};

	const HandleSubmit = (e) => {	
		e.preventDefault();
		if(title == "Editar"){
			editarRegistro(values);
		}else{
			agregarRegistro(values);
		}
		window.location.reload();
	}

	const HandleCancel = (e) => {
		e.preventDefault();
		window.location.reload();
	}
 
	return (
		<>
			<FormEstilado onSubmit={HandleSubmit}>
				<h1>{title || 'Registro'}</h1>
				<LabelEstilado htmlFor="documento">Documento</LabelEstilado>
				<InputEstilado id="documento" name="documento" onChange={HandleChange} type="text" value={values.documento} required/>
				<LabelEstilado htmlFor="nombre">Nombre</LabelEstilado>
				<InputEstilado id="nombre" name="nombre" onChange={HandleChange} type="text" value={values.nombre} required/>
				<LabelEstilado htmlFor="apellido">Apellido</LabelEstilado>
				<InputEstilado id="apellido" name="apellido" onChange={HandleChange} type="text" value={values.apellido} required></InputEstilado>
				<LabelEstilado htmlFor="correo">Correo</LabelEstilado>
				<InputEstilado id="correo" name="correo" onChange={HandleChange} type="email" value={values.correo} required></InputEstilado>
				<LabelEstilado htmlFor="telefono">Teléfono</LabelEstilado>
				<InputEstilado id="telefono" name="telefono" onChange={HandleChange} type="text" value={values.telefono} required></InputEstilado>
				<BotonEstilado type="submit">{title}</BotonEstilado>		
				<BotonEstilado onClick={HandleCancel}>Cancelar</BotonEstilado>
			</FormEstilado>
		</>
	)
};