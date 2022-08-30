import React, { useState, useEffect } from 'react';
function App() {
    const [animales, setAnimales] = useState(false);
    useEffect(() => {
        getAnimales();
    }, []);
    function getAnimales() {
        fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setAnimales(data);
            });
    }
    function createAnimal() {
        let id_animal = prompt('Ingresar codigo identificador')
        let nombre_animal = prompt('Ingresar nombre')
        let talla = prompt('Ingresar talla')
        let edad = prompt('Ingresar edad')
        let tipo = prompt('Ingresar tipo')
        let motivo_ingreso = prompt('Ingresar motivo de ingreso')
        let observaciones = prompt('Ingresar observaciones')
        let estado = prompt('Ingresar estado')
        let fecha_ingreso = prompt('Ingresar fecha de ingreso')
        fetch(`http://localhost:3001/animales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_animal, nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getAnimales();
            });
    }
    function deleteAnimal() {
        let id = prompt('Ingresar codigo animal a borrar');
        fetch(`http://localhost:3001/animales/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getAnimales();
            });
    }
    return (
        <div>
            {animales ? animales : 'There is no animales data available'}
            <br />
            <button onClick={createAnimal}>Add animal</button>
            <br />
            <button onClick={deleteAnimal}>Delete animal</button>
        </div>
    );
}
export default App;