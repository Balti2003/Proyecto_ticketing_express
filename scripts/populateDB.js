import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ticketing-db")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const user = [
    { name: "user", role : "user", email: "user@email.com", password: "12345678" },
    { name: "admin", role : "admin", email: "admin@email.com", password: "12345678" }
];

const status = ["open", "in progress", "closed"];
const priority = ["low", "medium", "high"];

async function deleteCollections() {
    try {
        await User.deleteMany({});
        await Ticket.deleteMany({});
        console.log("Existing collections cleared.");
    } catch (error) {
        console.error("Error clearing collections:", error);
    }
}

async function createUsers() {
    for (const userData of user) {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`User ${userData.name} created.`);
    }
}

async function createTickets() {
    const users = await User.find({});

    for (let i = 0; i < 15; i++) {
        const ticket = new Ticket({
            title: `Ticket #${i + 1}`,
            description: `This is a description for ticket #${i + 1}.`,
            status: status[Math.floor(Math.random() * status.length)],
            priority: priority[Math.floor(Math.random() * priority.length)],
            user: users[Math.floor(Math.random() * users.length)].id,
        });

        await ticket.save();
        console.log(`Ticket #${i + 1} created.`);
    }
}

async function populateDB() {
    await deleteCollections();
    await createUsers();
    await createTickets();
    console.log("Database population complete.");
    mongoose.disconnect();
}

populateDB();
