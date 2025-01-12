const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
})

const getTeams = async () => {
    //...
    const { rows } = await pool.query('SELECT * FROM equipos')
    return rows
}

const getTeam = async (teamID) => {
    const { rows } = await pool.query('SELECT * FROM equipos WHERE id = $1', [teamID])
    return rows[0]
}

const getPlayers = async (teamID) => {
    //...
    /*const { rows } = await pool.query(`SELECT * FROM jugadores WHERE id_equipo = $1`, [teamID])
    return rows*/
    const query = `
        SELECT jugadores.name, posiciones.name AS posicion
        FROM jugadores
        INNER JOIN posiciones ON jugadores.position = posiciones.id
        WHERE id_equipo = $1
    `;
    const { rows } = await pool.query(query, [teamID]);
    return rows;
}

const getPositionID = async (position) => {
    try {
        const result = await pool.query('SELECT id FROM posiciones WHERE name = $1', [position]);

        const positionId = result.rows[0]?.id;
        //console.log("Nombre de la posición obtenido:", positionId);
        return positionId; 
    } catch (error) {
        console.error("Error al obtener el nombre de la posición:", error);
        throw error; 
    }
};


const addTeam = async (equipo) => {
    //...
    const { rows } = await pool.query('INSERT INTO equipos (name) VALUES ($1) RETURNING *', [equipo.name])
    return rows[0]
}

const addPlayer = async ({ jugador, teamID }) => {
    //...
    const { name, position } = jugador;
    //console.log("Posición recibida:", position);

    if (!position) {
        throw new Error('Posición no válida');
    }

    const positionId = await getPositionID(position);

    if (!positionId) {
        throw new Error('Posición no válida');
    }

    const { rows } = await pool.query(`INSERT INTO jugadores (id_equipo, name, position) VALUES ($1, $2, $3) RETURNING *`, [teamID, name, positionId])
    return rows[0]
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer, getPositionID, getTeam }