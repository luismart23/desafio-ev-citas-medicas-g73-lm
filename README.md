## Crear proyecto con express
```sh
npm init -y
```

```sh
npm i express 
```

```sh
npm i -D nodemon
```

package.json
```json
"type": "module",
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

.gitignore
```sh
node_modules
```

## Instalar express-handlebars

[npm express handlebars](https://www.npmjs.com/package/express-handlebars)

```sh
npm i express-handlebars
```

Crear estructuras de carpetas
```sh
.
├── app.js
└── views
    ├── home.handlebars
    └── layouts
        └── main.handlebars
```

Configurar express + Handlebars
```js
import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);
```

views/layouts/main.hbs
```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>

<body>
    {{> navbar }}

    <main class="container my-5">
        {{{ body }}}
    </main>

    {{> footer}}

    <script src="/assets/js/bootstrap.min.js"></script>
    <script src="/assets/js/app.js"></script>
</body>

</html>
```

views/home.hbs
```html
<h1>Home Page</h1>
```

## Configurar archivos estáticos

```sh
npm i bootstrap
```

```js
import path from 'path'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
```