import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(atoken, process.env.JWT_ADMIN_AUTH_SECRET);

        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export default authAdmin;
