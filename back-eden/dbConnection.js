const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Eden',
    password: 'pg123',
    port: 5432,
});

const getAnimales = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM animales ORDER BY id_animal ASC;', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`???'`);
        })
    })
}

const getPatrocinador = (tipoDato,dato) => {
    return new Promise(function (resolve, reject) {
        if (tipoDato == "Todos") {
            pool.query(`SELECT * FROM datos_patrocinador ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else if (tipoDato == "Cedula") {
            pool.query(`SELECT * FROM datos_patrocinador WHERE cedula = '${dato}' ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else {
            pool.query(`SELECT * FROM datos_patrocinador WHERE nombre = '${dato}' ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
    })
}

const getAnimal = (tipoDato, dato) => {
    return new Promise(function (resolve, reject) {
        if (tipoDato == "Todos") {
            pool.query(`SELECT * FROM datos_animal ORDER BY id_animal ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else if (tipoDato == "Id Animal") {
            pool.query(`SELECT * FROM datos_animal WHERE id_animal = '${dato}' ORDER BY id_animal ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else {
            pool.query(`SELECT * FROM datos_animal WHERE nombre_animal = '${dato}' ORDER BY id_animal ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
    })
}

const getVoluntario = (tipoDato, dato) => {
    return new Promise(function (resolve, reject) {
        if (tipoDato == "Todos") {
            pool.query(`SELECT * FROM datos_voluntario ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else if (tipoDato == "Id Voluntario") {
            pool.query(`SELECT * FROM datos_voluntario WHERE cedula = '${dato}' ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
        else {
            pool.query(`SELECT * FROM datos_voluntario WHERE nombre = '${dato}' ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        }
    })
}

const getPago = () => {
    return new Promise(function (resolve, reject) {
            pool.query(`SELECT * FROM c_pagan_por ORDER BY cedula ASC;`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
    })
}

const validarLogin = (body) => {
    return new Promise(function (resolve, reject) {
        const { usuario, contrasena } = body
        let encontrado = false
        let resultados = []
        pool.query(`SELECT * FROM usuarios WHERE user_name = '${usuario}' AND password= '${contrasena}' ORDER BY id_voluntario ASC;`, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.rowCount>0) {
                encontrado = true
                resultados.push(encontrado)
                resultados.push(results.rows)
                resolve(resultados)
            }
            else {
                resolve("No se encontraron datos")
            }

        })
    })
}

const registrarPago  = (tipoPago, body) => {
    return new Promise(function (resolve, reject) {
        const { id_animal,cedula, id_voluntario, ingresos, today} = body
        console.log(id_animal)
        console.log(cedula)
        console.log(id_voluntario)
        console.log(ingresos)
        console.log(today)
        if (tipoPago == "Donador") {
            console.log("Entró")
            pool.query(`INSERT INTO d_pagan_a (cedula,id_voluntario,ingresos,fecha) VALUES ($1, $2, $3, $4) RETURNING *;`, [cedula, id_voluntario, ingresos, today], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`Se insertó donación por: ${ingresos}`)
    
            })
        }
        else{
            pool.query(`INSERT INTO c_pagan_por (id_animal,cedula,id_voluntario,ingresos,fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [id_animal,cedula, id_voluntario, ingresos, today], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`Se insertó pago por: ${ingresos}`)
    
            })
        }
    })
}

const createAnimal = (body) => {
    return new Promise(function (resolve, reject) {
        const { nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida } = body
        let tiempo_estancia = 0;
        const tiempo_estancia_func = (fecha_ingreso, fecha_salida) => {
            var fechaInicio = new Date('2016-07-12').getTime();
            var fechaFin = new Date('2017-08-01').getTime();

            var diff = fechaFin - fechaInicio;

            tiempo_estancia = (diff / (1000 * 60 * 60 * 24));
        }
        if (!fecha_salida) {
            pool.query('INSERT INTO datos_animal (nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida, tiempo_estancia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULL, NULL) RETURNING *;', [nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`A new animal has been added added: ${nombre_animal}`)
            })
        }
        else {
            tiempo_estancia_func(fecha_ingreso, fecha_salida)
            console.log(nombre_animal)
            console.log(talla)
            console.log(edad)
            console.log(tipo)
            console.log(motivo_ingreso)
            console.log(observaciones)
            console.log(estado)
            console.log(tiempo_estancia)
            pool.query('INSERT INTO datos_animal (nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida, tiempo_estancia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;', [nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida, tiempo_estancia], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`A new animal has been added: ${nombre_animal}`)
            })
        }
        
    })
}

const createPatrocinador = (body) => {
    return new Promise(function (resolve, reject) {
        const { cedula, nombre, apellido, correo, telefono, tipo_via, numero_calle, numero_casa, tipo } = body
        pool.query('INSERT INTO datos_patrocinador (cedula,nombre,apellido,correo,telefono,tipo_via,numero_calle,numero_casa,tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', [cedula, nombre, apellido, correo, telefono, tipo_via, numero_calle, numero_casa, tipo], (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(`A new patrocinador has been added: ${nombre}`)
    })
})
}

const createVoluntario = (body) => {
    return new Promise(function (resolve, reject) {
        const { nombre, cedula, cargo, telefono, usuario, contrasena } = body
        pool.query('INSERT INTO datos_voluntario (nombre,cedula,cargo,telefono,username,password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [nombre, cedula, cargo, telefono, usuario, contrasena], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new voluntario has been added: ${nombre}`)
        })
    })
}

const actualizarAnimal = (body) => {
    return new Promise(function (resolve, reject) {
        const { id_animal, nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida } = body
        console.log(id_animal)
        pool.query(`UPDATE datos_animal SET nombre_animal = $1, talla = $2, edad = $3, tipo= $4, motivo_ingreso = $5, observaciones = $6, estado =$7, fecha_ingreso = $8, fecha_salida = $9 WHERE id_animal = '${id_animal}';`, [nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones, estado, fecha_ingreso, fecha_salida], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se ha actualizado: ${nombre_animal}`)
        })
    })
}

const actualizarPatrocinador = (body) => {
    return new Promise(function (resolve, reject) {
        const { cedula, nombre, apellido, correo, telefono, tipo_via, numero_calle, numero_casa, tipo } = body
        console.log(cedula)
        pool.query(`UPDATE datos_patrocinador SET nombre = $1, apellido = $2, correo= $3, telefono = $4, tipo_via = $5, numero_calle =$6, numero_casa = $7, tipo = $8 WHERE cedula = '${cedula}';`, [nombre, apellido, correo, telefono, tipo_via, numero_calle, numero_casa, tipo], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se ha actualizado: ${nombre}`)
        })
    })
}

const actualizarVoluntario = (body) => {
    return new Promise(function (resolve, reject) {
        const { nombre, cedula, cargo, telefono, usuario, contrasena } = body
        console.log(cargo)
        pool.query(`UPDATE datos_voluntario SET nombre = $1, cargo = $2, telefono = $3, username = $4, password = $5 WHERE cedula = '${cedula}';`, [nombre, cargo, telefono, usuario, contrasena], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se ha actualizado: ${nombre}`)
        })
    })
}

const deleteAnimal = (id) => {
    return new Promise(function (resolve, reject) {
        //const id = parseInt(request.params.id)
        pool.query(`DELETE FROM datos_animal WHERE id_animal = $1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se borro el animal con el id: ${id}`)
        })
    })
}

const deletePatrocinador = (id) => {
    return new Promise(function (resolve, reject) {
        //const id = parseInt(request.params.id)
        pool.query(`DELETE FROM datos_patrocinador WHERE cedula = $1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se borro el patrocinador con el id: ${id}`)
        })
    })
}

const deleteVoluntario = (id) => {
    return new Promise(function (resolve, reject) {
        //const id = parseInt(request.params.id)
        pool.query(`DELETE FROM datos_voluntario WHERE cedula = $1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Se borro el patrocinador con el id: ${id}`)
        })
    })
}

module.exports = {
    getAnimal,
    getPatrocinador,
    getVoluntario,
    getPago,
    validarLogin,
    createAnimal,
    createPatrocinador,
    createVoluntario,
    registrarPago,
    actualizarAnimal,
    actualizarPatrocinador,
    actualizarVoluntario,
    deleteAnimal,
    deletePatrocinador,
    deleteVoluntario,
}