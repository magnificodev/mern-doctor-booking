import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.on("connected", () => {
            console.log("Database connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;
