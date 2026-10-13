import bcrypt from "bcrypt";
import User from "../models/User.js";

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({
        where: { email },
    });

    console.log("Email received:", email);
    console.log("User found:", user);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const storedPassword = user.get("password") as string;

    console.log("Password received:", password);
    console.log("Stored password:", storedPassword);

    const passwordMatch = await bcrypt.compare(
        password,
        storedPassword
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    return {
        id: user.get("id") as number,
        username: user.get("username"),
        email: user.get("email"),
        profilePicture: user.get("profilePicture") as string | null,
    };
};

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {

    // Check username
    const existingUsername = await User.findOne({
        where: { username },
    });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    // Check email
    const existingEmail = await User.findOne({
        where: { email },
    });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        id: user.get("id"),
        username: user.get("username"),
        email: user.get("email"),
    };
};