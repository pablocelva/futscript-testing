const { getPlayers, addPlayer } = require('../db/consultas')

const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params
    const jugadores = await getPlayers(teamID)
    res.json(jugadores)
}

const registrarJugador = async (req, res) => {
    const { teamID } = req.params
    const { name, position } = req.body;
    //console.log("Jugador recibido:", name, position);

    if (!name || !position) {
        return res.status(400).json({ error: "Faltan datos requeridos (name o position)" });
    }

    try {
        const jugador = await addPlayer({ jugador: { name, position }, teamID });
        res.status(201).json(jugador); 
        //console.log("Jugador agregado:", jugador);
    } catch (error) {
        //console.error('Error al agregar jugador:', error);
        res.status(400).json({ error: "Error al agregar jugador" });
    }
}


module.exports = { obtenerJugadores, registrarJugador }