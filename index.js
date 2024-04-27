import express from 'express';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'moment/locale/es.js';
import chalk from 'chalk';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();

// ruta absoluta
const __dirname = import.meta.dirname

// Configurar Handlebars como motor de plantillas
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Establecer Moment.js en español
moment.locale('es');

// Array para almacenar usuarios registrados
const users = [];

// Ruta para registrar un nuevo usuario
app.get('/register', async (req, res) => {
    try {
        // Obtener datos de usuario aleatorio de la API Random User
        const { data } = await axios.get('https://randomuser.me/api/');

        // Generar un código identificador único para el usuario
        const id = uuidv4();

        // Obtener la hora de registro
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

        // Obtener los datos del usuario de la respuesta de la API
        const userData = data.results[0];

        // Crear el objeto de usuario con nombre, apellido, sexo, hora de registro y código identificador
        const user = {
            id,
            firstName: userData.name.first,
            lastName: userData.name.last,
            gender: userData.gender,
            timestamp,
            code: id // Usar el ID generado como código identificador
        };

        // Registrar al usuario
        users.push(user);

        // Imprimir la lista de usuarios en la consola con Chalk
        console.log(chalk.bgWhite.blue('Nuevo Usuario Registrado:'));
        console.log(chalk.blue('ID:', user.id));
        console.log(chalk.blue('Nombre:', user.firstName, user.lastName));
        console.log(chalk.blue('Sexo:', user.gender));
        console.log(chalk.blue('Hora de Registro:', user.timestamp));
        console.log(chalk.blue('Código Identificador:', user.code));

        // Enviar respuesta al cliente
        res.json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta para consultar todos los usuarios registrados
app.get('/users', (req, res) => {
    // Ordenar usuarios por género y luego por hora de registro
    const sortedUsers = _.sortBy(users, ['gender', 'timestamp']);

    // Dividir usuarios por género
    const groupedUsers = _.groupBy(sortedUsers, 'gender');

    // Renderizar la plantilla HTML con las listas de usuarios ordenadas
    res.render('users.hbs', { males: groupedUsers.male, females: groupedUsers.female });
});

// Levantar el servidor con Nodemon
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor en ejecución... con Nodemon'));
