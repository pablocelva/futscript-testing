const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

const login = (req, res) => {
    const { username, password } = req.body;
    const admin = { username: "admin", password: "1234" };

    if (username === admin.username && password === admin.password) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
        //console.log("Token:", token);
        return res.status(200).json({ token });
    }
    res.status(400).json({ error: "Credenciales incorrectas" });
};

module.exports = { login };
