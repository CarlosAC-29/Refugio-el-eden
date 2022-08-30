
let clientId = "Ejemploid";
let clientName = "Nombre Ejemplo";

let clienteCedula = '';
let clienteNombre = '';

let animalId="";
let animalName="";
let animalType="";

let idAnimal='';
let nombreAnimal='';
let especieAnimal='';
let cliente;
let animal;



const getClientDataP = (object)=>{
	clientId=object.id;
	clientName=object.name;
}

const getAnimalDataP = (Aobject)=>{
	animalId=Aobject;
	animalName=Aobject;
	animalType=Aobject;
}

const getCliente = (object) =>{
	cliente=object;
	clienteCedula=object.cedula;
	clienteNombre=object.nombre;
}

const getAnimal = (object) =>{
	animal=object;
	idAnimal=object.id_animal;
	nombreAnimal=object.nombre_animal;
	especieAnimal=object.tipo;
}

const reset = () =>{
	clienteCedula = '';
	clienteNombre = '';
	idAnimal = '';
	nombreAnimal = '';
	especieAnimal = '';
	animal={};
}


export {
clientId,
clientName,
animalId,
animalName,
animalType,
getClientDataP,
getAnimalDataP,
clienteCedula,
clienteNombre,
getCliente,
getAnimal, 
idAnimal,
nombreAnimal,
especieAnimal,
reset,
animal,
cliente

};