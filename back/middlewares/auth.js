const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log('WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        const userId = decodedToken.id;
        console.log(decodedToken);
        console.log(userId);
        if (req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        }
        else {
            console.log('authentification réussie !')
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('invalid request')
        });
    }
}