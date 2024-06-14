const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.json())
const mongoose = require("mongoose")
const Exercice = require("./schema")
const cors = require("cors")

app.use(cors())


app.get("/api/v1/exercices", async(req, res) => {
    const exercises = await Exercice.find({})
    res.status(200).json({exercises})
})

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("connected")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}



const PORT = process.env.PORT || 3000


const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , console.log(`Server is listening on port : ${PORT}...`))
    }catch(error){
        console.log("Error!")
    }
}

start()