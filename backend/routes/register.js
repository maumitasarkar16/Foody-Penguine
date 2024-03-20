import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import Register from '../models/register.js';
import genAuthToken from '../utils/genAuthToken.js';

const router = express.Router();

//register
router.post("/", async (req, res) => {
	const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
      });

      console.log("req.body---", req.body)
      const { error } = schema.validate(req.body);
      console.log("error==", error)
      if (error) return res.status(400).send(error.details[0].message);


      let register = await Register.findOne({ email: req.body.email });
      if (register) return res.status(400).send("Registered user already exists...");

      register = new Register({
		name: req.body.name,
		email: req.body.email,
        password: req.body.password,
	})

    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password, salt);
    register = await register.save();

    const token = genAuthToken(register)
    res.send(token)

})

export default router