const express = require('express')
const app = express()
const port = 3001

const dbConnection = require('./dbConnection')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    dbConnection.getAnimales()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/animales/todos', (req, res) => {
    dbConnection.getAnimal("Todos", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/animales/Nombre/:data', (req, res) => {
    dbConnection.getAnimal("Nombre", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.get('/animales/Identificador/:data', (req, res) => {
    dbConnection.getAnimal("Id Animal", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/patrocinadores/todos', (req, res) => {
    dbConnection.getPatrocinador("Todos", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/patrocinadores/Nombre/:data', (req, res) => {
    dbConnection.getPatrocinador("Nombre",req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.get('/patrocinadores/Identificador/:data', (req, res) => {
    dbConnection.getPatrocinador("Cedula",req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/voluntarios/todos', (req, res) => {
    dbConnection.getVoluntario("Todos", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/voluntarios/Nombre/:data', (req, res) => {
    console.log(req.params.data)
    dbConnection.getVoluntario("Nombre", req.params.data)
        
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.get('/voluntarios/Identificador/:data', (req, res) => {
    dbConnection.getVoluntario("Id Voluntario", req.params.data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/pago', (req, res) => {
    dbConnection.getPago()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/pago/patrocinador', (req, res) => {
    dbConnection.registrarPago("Patrocinador", req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})


app.post('/pago/donador', (req, res) => {
    dbConnection.registrarPago("Donador", req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/login', (req, res) => {
    dbConnection.validarLogin(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/animales', (req, res) => {
    dbConnection.createAnimal(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/patrocinadores', (req, res) => {
    dbConnection.createPatrocinador(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/voluntarios', (req, res) => {
    dbConnection.createVoluntario(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/animales', (req, res) => {
    dbConnection.actualizarAnimal(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/patrocinadores', (req, res) => {
    dbConnection.actualizarPatrocinador(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/voluntarios', (req, res) => {
    dbConnection.actualizarVoluntario(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/animales/:id', (req, res) => {
    dbConnection.deleteAnimal(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/patrocinadores/:id', (req, res) => {
    dbConnection.deletePatrocinador(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/voluntarios/:id', (req, res) => {
    dbConnection.deleteVoluntario(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})