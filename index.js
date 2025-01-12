const express = require('express');
const app = express();
const { login } = require('./controllers/auth')

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo, obtenerEquipo } = require('./controllers/equipos')
const { validateToken } = require('./middlewares/authMiddleware');


app.get("/equipos", obtenerEquipos)
app.post("/equipos", validateToken, agregarEquipo);

app.get("/equipos/:teamID", obtenerEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", validateToken, registrarJugador);

app.post("/login", login)


module.exports = app;
