import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Bala",
        email: "bala@gmail.com",
        password: "123456"
    },
    {
        id: 2,
        name: "Sam",
        email: "Sam@gmail.com",
        password: "123456"
    }
]

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    })
})

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => (user.id === id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

app.post("/users", (req, res) => {
    const { name, email, password } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    }

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: newUser
    })
})

app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;

    const user = users.find((user) => (user.id === id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    user.name = name;
    user.email = email;
    user.password = password;


    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    })

})

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => (user.id === id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    users = users.filter((user) => (user.id !== id)) 

    res.json({
        success: true,
        message:"User deleted successfully"
    })
})

app.listen(process.env.PORT, () => {
    console.log("App started Listening")
});

