//const mongoose = require('mongoose');
import mongoose from 'mongoose';

/*const nestObj = new mongoose.Schema({
    field1: String
})

const TodoSchema = new mongoose.Schema({
    record: { type: String, required: true},
    date: {
        type: Number, 
        default: Date.now
    },
    nestObj: nestObj
}, {collection: 'my-todo'})*/

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true}
})

const Todo = mongoose.model('TodoModel',TodoSchema)
//module.exports = model

export default Todo