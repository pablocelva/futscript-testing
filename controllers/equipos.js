const { getTeams, addTeam, getTeam } = require('../db/consultas')

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams();
        res.status(200).json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener equipos" });
    }
}

const agregarEquipo = async (req, res) => {
    const equipo = req.body
    await addTeam(equipo)
    res.send({ message: "Equipo agregado con éxito" })
}

const obtenerEquipo = async (req, res) => {
    const equipo = await getTeam(req.params.teamID);
    if (!equipo) {
        return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(equipo);
}

module.exports = { obtenerEquipos, agregarEquipo, obtenerEquipo }