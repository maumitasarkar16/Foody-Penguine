import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import Register from '../models/register.js';
import genAuthToken from '../utils/genAuthToken.js';

const router = express.Router();

//login
router.post("/", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let register = await Register.findOne({ email: req.body.email });
    if (!register) return res.status(400).send("Invalid Email or Password.Please register first to login...");

    const isValid = await bcrypt.compare(req.body.password, register.password)
    if (!isValid) return res.status(400).send("Invalid email or Password");

    const token = genAuthToken(register)
    res.send(token)

})

export default router