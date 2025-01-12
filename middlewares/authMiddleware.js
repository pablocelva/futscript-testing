const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //console.log("Token recibido:", token);

    if (!token) return res.status(401).json({ error: "Token requerido" });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
};

module.exports = { validateToken };
