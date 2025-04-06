import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_USER_AUTH_SECRET);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

export default authUser;

