import express from 'express';
import Todo from '../models/todo.js';
import User from '../models/user.js';


const router = express.Router();

// Get all records of Todo Collection
router.get("/getAllTodoList", async (req, res) => {
	const getAllRecords = await Todo.find()
	res.send(getAllRecords)
})

//create Todo
router.post("/create-todo", async (req, res) => {
	//console.log("req.body---", req.body)
	const addTodo = new Todo({
		title: req.body.title,
		content: req.body.content,
	})
	await addTodo.save()
	res.send(addTodo)
})

//Get individual Record of Todo
router.get("/getTodoList/:id", async (req, res) => {
    try {
	    const getTodo = await Todo.findOne({ _id: req.params.id })
	    res.send(getTodo)
    }catch {
        res.status(404)
		res.send({ error: "Record doesn't exist!" })
    }
})

//update todo
router.patch("/updateTodo/:id", async (req, res) => {
	try {
		const todo = await Todo.findOne({ _id: req.params.id })

		if (req.body.title) {
			todo.title = req.body.title
		}

		if (req.body.content) {
			todo.content = req.body.content
		}

		await todo.save()
		res.send(todo)
	} catch {
		res.status(404)
		res.send({ error: "Todo doesn't exist!" })
	}
})

//delete todo
router.delete("/deleteTodo/:id", async (req, res) => {
	try {
		await Todo.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Todo  doesn't exist!" })
	}
})

//create user
router.post("/create-user", async (req, res) => {
	console.log("req.body----", req.body)
	 const addUser = new User({
	 	name: req.body.name,
	 	address: req.body.address,
	 })
	 await addUser.save()
	 res.send(addUser)
})



export default router