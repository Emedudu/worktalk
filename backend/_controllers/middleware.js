import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secret=process.env.SECRET
// const pass=process.env.PASS
export const verifyToken = (req, res, next) => {
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // res.json({token,secret})
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}