import express from 'express';
import Ticket from '../models/Ticket.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

//GET api/tickets/
router.get('/', async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1; 

    try {
        const tickets = await Ticket.find().skip((page - 1) * pageSize).limit(pageSize);
        const total = await Ticket.countDocuments();

        res.status(200).json({ tickets, page, pages: Math.ceil(total / pageSize), currentPage: page });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

//POST api/tickets/
router.post('/', auth, async (req, res) => {
    const ticket = new Ticket({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status, 
    });

    try {
        const savedTicket = await ticket.save();
        res.status(201).json({ ticket: savedTicket });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

//GET api/tickets/:id
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ id: req.params.id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ ticket: ticket });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

//PUT api/tickets/:id
router.put('/:id', auth, async (req, res) => {
    const updates = req.body;
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ ticket: updatedTicket });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

//DELETE api/tickets/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const deletedTicket = await Ticket.findOneAndDelete({ id: req.params.id });
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

export default router;