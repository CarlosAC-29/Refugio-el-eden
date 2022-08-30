# El-Eden-DBEste programa esta publico, pero para su correcto funcionamiento se recomienda seguir los siguientes pasos a la hora de instalarlo.

REQUERIMIENTOS, postgres13 con pgAdmin4, react, node.

Una vez descargado el archivo abrir el pgAdmin4 a crear una base de datos llamade Eden. en esta abrir un Query Tool y correr los codigos que aparecen en: El-Eden-DB/back-eden/dbStructure.sql

INSERSION DE LOS CODIGOS:
Correr le creación de las tablas y los altertable juntos.
Despues correr las funciones con su respectivo trigger (Tener cuidado de no borrar las funciones con los drop y delete)

IMPORTANTE:  No crear datos dentro de las tablas desde el pgAdmin, esto alterara los triggers

SIGUIENTES PASOS:
Una vez ya se haya hecho esto sin errores ya queda es la instalacion de dependencias y correr la aplicacion web.
entrar en la carpeta back-eden y en una consola escribir: 
$ npm i
Esto instalara dependencias.

INICIAR EL BACKEND:
escribir en la consola:
$ node index.js

PARA CORRER EL FRONTEND:
Entrar en la carpeta El-Eden-DB/front-eden/ En esta abrir una consola y escribir:
$ npm i
Esto instalara las dependencia.

INICIAR EL FRONTEND:
Escribir en la consola dentro de la carpena:
$npm start

DATOS IMPORTANTES:
El programa inicia como administrador, pues aun no hay ningun usuario en su base de datos para iniciar sesion. Como paso final cree un voluntario con cargo "Administrador", esto le dara todos los permisos al usuario.
Cierre sesion e inicie con el nombre de usuario y contraseña que le asigno.
