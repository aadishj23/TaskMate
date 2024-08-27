const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = process.env.DATABASE_URL; 

if (!URL) {
    console.error("Error: DATABASE_URL is not defined in the environment variables.");
    process.exit(1); 
}

mongoose.connect(URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
});

const todoDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    }
});

const TodoData = mongoose.model("TodoData", todoDataSchema);
const User = mongoose.model("User", userSchema);

module.exports = { TodoData, User };
