import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    address: { type: String, required: true}
})

const User = mongoose.model('UserModel',UserSchema);

export default User


