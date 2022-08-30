let user;
let busquedas;
let encontrado;
let idVoluntario;


async function getPatrocinadores(tipoBusqueda, data) {
   await fetch(`http://localhost:3001/patrocinadores/${tipoBusqueda}/${data}`)
      .then(response => {
          return response.text();
      })
      .then(data => {
        busquedas=JSON.parse(data);
      });
}

async function getAllPatrocinadores() {
    await fetch(`http://localhost:3001/patrocinadores/todos`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            busquedas=JSON.parse(data);
            console.log(data)
        });
}

async function getAnimales(tipoBusqueda, data) {
    await fetch(`http://localhost:3001/animales/${tipoBusqueda}/${data}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            busquedas=JSON.parse(data);
            console.log(data);
        });
}

async function getAllAnimales() {
    await fetch(`http://localhost:3001/animales/todos`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            busquedas=JSON.parse(data);
            console.log(data)
        });
}

async function getVoluntarios(tipoBusqueda, data, login) {
    await fetch(`http://localhost:3001/voluntarios/${tipoBusqueda}/${data}`)
        .then(response => {
            return response.text();
            
        })
        .then(data => {
            if (login) {
                user = JSON.parse(data);


            }else{
            busquedas=JSON.parse(data);
            }
        });
}

async function getAllVoluntarios() {
    await fetch(`http://localhost:3001/voluntarios/todos`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            busquedas=JSON.parse(data);
            console.log(data)
        });
}

async function getPagos() {
    await fetch(`http://localhost:3001/pago`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            busquedas = JSON.parse(data);
            console.log(data)
        });
}

function calcularTarifa(animal) {
    console.log(animal)
    let multiplicador
    if(animal.talla == "P"){
        multiplicador = 50000
    }
    else if(animal.talla == "M"){
        multiplicador = 200000
    }
    else if(animal.talla == "G"){
        multiplicador = 300000
    }
    console.log(Math.round(animal.tiempo_estancia*multiplicador/31))
    return (Math.round(animal.tiempo_estancia*multiplicador/31))

}

async function validarLogin(usuario, contrasena) {
    await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({usuario,contrasena}),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data)
            data = JSON.parse(data)
            encontrado = data[0];
            console.log(encontrado)
            
            idVoluntario = data[1][0].id_voluntario;
            console.log(idVoluntario)
        })
}

async function registrarPago(id_animal,cedula, id_voluntario, ingresos, tipoPago){
    let today = new Date().toISOString()
    console.log(today)
    const nulo = null;
    /*
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let hoy = yyyy + "-" + mm + "-" + dd;
    */
    console.log(today)
    console.log(id_animal)
    if (tipoPago == "Donador"){
        await fetch(`http://localhost:3001/pago/donador`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({nulo,cedula, id_voluntario, ingresos, today})
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
        })
    }
    else {
        await fetch(`http://localhost:3001/pago/patrocinador`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_animal,cedula, id_voluntario, ingresos, today})
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data)
        })
    }
    
}

async function actualizarAnimal(id_animal,
    nombre_animal,
    talla,
    edad,
    tipo,
    motivo_ingreso,
    observaciones,
    estado,
    fecha_ingreso,
    fecha_salida) {
    console.log(nombre_animal)
    await fetch(`http://localhost:3001/animales`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        //akki sepuede pone el console log creo
        body: JSON.stringify({ id_animal, nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida }),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAnimales();
        });
}
async function actualizarPatrocinador(cedula,
    nombre,
    apellido,
    correo,
    telefono,
    tipo_via,
    numero_calle,
    numero_casa,
    tipo
    ) {
    await fetch(`http://localhost:3001/patrocinadores`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        //akki sepuede pone el console log creo
        body: JSON.stringify({
            cedula,
            nombre,
            apellido,
            correo,
            telefono,
            tipo_via,
            numero_calle,
            numero_casa,
            tipo}),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAnimales();
        });
}
async function actualizarVoluntario(nombre, cedula, cargo, telefono, usuario, contrasena) {
    await fetch(`http://localhost:3001/voluntarios`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        //akki sepuede pone el console log creo
        body: JSON.stringify({ nombre, cedula, cargo, telefono, usuario, contrasena }),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAnimales();
        });
}


//Crear animales
async function createAnimal(
  nombre_animal,
  talla,
  edad,
  tipo,
  motivo_ingreso,
  observaciones,
  estado,
  fecha_ingreso,
  fecha_salida) {
    await fetch(`http://localhost:3001/animales`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      //akki sepuede pone el console log creo
      body: JSON.stringify({ nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida }),
  })
      .then(response => {
          return response.text();
      })
      .then(data => {
          alert(data);
          getAnimales();
      });
}

async function createPatrocinador(
    cedula,
    nombre,
    apellido,
    correo,
    telefono,
    tipo_via,
    numero_calle,
    numero_casa,
    tipo
    ) {
        await fetch(`http://localhost:3001/patrocinadores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //akki sepuede pone el console log creo
        body: JSON.stringify({
            cedula,
            nombre,
            apellido,
            correo,
            telefono,
            tipo_via,
            numero_calle,
            numero_casa,
            tipo }),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAnimales();
        });
}

async function createVoluntario(nombre, cedula, cargo, telefono, usuario, contrasena) {
    await fetch(`http://localhost:3001/voluntarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //akki sepuede pone el console log creo
        
        body: JSON.stringify({ nombre, cedula, cargo, telefono, usuario, contrasena}),
    })
        .then(response => {
            
            return response.text();
        })
        .then(data => {
            alert(data);
            getAnimales();
        });
}


//Borrar un animal
async function borrarAnimal(id) {
  await fetch(`http://localhost:3001/animales/${id}`, {
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

async function borrarPatrocinador(id) {
    await fetch(`http://localhost:3001/patrocinadores/${id}`, {
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

  async function borrarVoluntario(id) {
    await fetch(`http://localhost:3001/voluntarios/${id}`, {
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

export {
  getAnimales,
  getPatrocinadores,
  getVoluntarios,
  getAllAnimales,
  getAllPatrocinadores,
  getAllVoluntarios,
  getPagos,
  calcularTarifa,
  validarLogin,
  registrarPago,
  createAnimal,
  createPatrocinador,
  createVoluntario,
  actualizarAnimal,
  actualizarPatrocinador,
  actualizarVoluntario,
  borrarAnimal,
  borrarPatrocinador,
  borrarVoluntario,
  user,
  busquedas,
  encontrado,
  idVoluntario


}