import jwt from "jsonwebtoken";

const genAuthToken = (registeredUser) => {
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({
        _id: registeredUser._id , name: registeredUser.name, email: registeredUser.email
    }, secretKey)

    return token;
}

export default genAuthToken