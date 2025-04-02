import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_ADMIN_AUTH_SECRET);

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export default authAdmin;
