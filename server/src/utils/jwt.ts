import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (userId: number) => {
    const token = jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "30d" }
    );

    console.log("GENERATED JWT:", token);

    return token;
};
