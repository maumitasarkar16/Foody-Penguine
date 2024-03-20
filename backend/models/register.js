import mongoose from 'mongoose';

const RegisterSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30},
    email: { type: String, required: true, unique: true, minlength: 3, maxlength: 200},
    password: { type: String, required: true, minlength: 3, maxlength: 200},
   
})

const Register = mongoose.model('RegisterModel',RegisterSchema);

export default Register 