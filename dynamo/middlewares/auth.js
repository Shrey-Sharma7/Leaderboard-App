const jwt = require('jsonwebtoken');

const authCheck = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;
        decodedData = jwt.decode(token);
        // console.log(decodedData);
        req.username = decodedData?.username;

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json('Unauthorized')
    }
}

module.exports = { authCheck }