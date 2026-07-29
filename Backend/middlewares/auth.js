const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("===== AUTH MIDDLEWARE =====");

    console.log(req.headers.authorization);

    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("TOKEN =", token);

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("DECODED =", decodedToken);

        req.auth = {
            userId: decodedToken.userId
        };

        next();
    } catch (err) {
        console.log("ERREUR JWT");
        console.log(err);

        return res.status(401).json({
            error: err.message
        });
    }
};