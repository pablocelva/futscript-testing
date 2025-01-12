const request = require('supertest');
const app = require('../index');
const { getTeams, addPlayer } = require('../db/consultas');

let server;

jest.mock('../db/consultas', () => ({
    getTeams: jest.fn().mockResolvedValue([{ id: 1, name: 'Equipo 1' }]),
    addPlayer: jest.fn(),
}));

beforeAll((done) => {
    server = app.listen(3001, done); // Inicia el servidor en un puerto específico
});

afterAll((done) => {
    server.close(done); // Cierra el servidor después de las pruebas
});

describe("API REST FutScript", () => {
    test("GET /equipos Se obtiene un Array y un status code 200", async () => {
        const response = await request(app).get("/equipos");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test("POST /login Al enviar las credenciales correctas se obtiene un Object", async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "admin", password: "1234" });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("token");
    });

    test("POST /login Al enviar credenciales incorrectas se obtiene un status code 400", async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "admin", password: "wrong" });
        expect(response.status).toBe(400);
    });

    test("POST /equipos/:teamID/jugadores Al enviar un nuevo jugador junto a un token válido en las cabeceras se obtiene un status code 201.", async () => {
        const tokenResponse = await request(app)
        .post("/login")
        .send({ username: "admin", password: "1234" });
        const token = tokenResponse.body.token;
        //console.log("Token recibido:", token);

        const response = await request(app)
            .post("/equipos/1/jugadores")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Nuevo Jugador", position: "centrocampista" });
            
        //console.log("Token recibido:", token);
        expect(response.status).toBe(201);
    });
});
