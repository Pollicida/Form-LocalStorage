import React, { useEffect, useState, useRef } from 'react';
import { TableStyled, TableHeader, TableData, TableRow, TableCaption, BotonEstiladoDelete, BotonEstiladoEditar } from './Table.styled.js';

export default function Table({callbackEditRegistro}){
    useEffect(() => {
        setRegistros(getRegistros);  
      }, []);
    const [registros,setRegistros] = useState([]);
    const getRegistros = () => {
        const registros = [];
        const contador = localStorage.getItem('contador');
        if (contador) {
          for (let i = 1; i <= contador; i++) {
            const registro = localStorage.getItem(i);
            if (registro) {
              registros.push(JSON.parse(registro));
            }
          }
        }
        return registros;
    };

    function HandleDelete(clave){
        localStorage.removeItem(clave);
        window.location.reload();
    }

    function HandleEdit(idEdit){
        callbackEditRegistro(idEdit);
    };

    return (
      <TableStyled>
        <TableCaption>Lista de Estudiantes</TableCaption>
        <thead>
          <TableRow>
            <TableHeader>Documento</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Apellido</TableHeader>
            <TableHeader>Correo</TableHeader>
            <TableHeader>Teléfono</TableHeader>
            <TableHeader></TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {registros.map((estudiante) => (
            <TableRow key={estudiante.id}>
              <TableData>{estudiante.documento}</TableData>
              <TableData>{estudiante.nombre}</TableData>
              <TableData>{estudiante.apellido}</TableData>
              <TableData>{estudiante.correo}</TableData>
              <TableData>{estudiante.telefono}</TableData>
              <TableData><BotonEstiladoEditar onClick={() => HandleEdit(estudiante.id)}>Editar</BotonEstiladoEditar></TableData>
              <TableData><BotonEstiladoDelete onClick={() => HandleDelete(estudiante.id)}>Eliminar</BotonEstiladoDelete></TableData>
            </TableRow>
          ))}
        </tbody>
      </TableStyled>
    );
  };