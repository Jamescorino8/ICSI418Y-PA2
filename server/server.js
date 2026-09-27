const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

const db = client.db("pa2");
const users = db.collection("users");

app.post("/signup", async (req, res) => {
    const { f_name, l_name, username, password } = req.body;

    if (!f_name || !l_name || !username || !password) {
        return res.status(400).json({
            message: "Required information is missing"
        });
    }

    try {
        const result = await users.findOne({
            username: username
        });

        if (result !== null) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        await users.insertOne({
            f_name: f_name,
            l_name: l_name,
            username: username,
            password: password
        });

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // check required fields before using the database; return 400 if either is missing
    if (!username || !password) {
        return res.status(400).json({
            message: "Required information is missing"
        });
    }

    try {
        // search for user
        const user = await users.findOne({
            username: username
        });

        // return stops the route here so it doesn't read user.password on null
        if (user === null) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        // return stops the route here so it doesn't also send the 200 below
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid login credentials"
            });
        }
        res.status(200).json({ message: "Login successful" })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}

connectDatabase();