import express from 'express';
import Ticket from '../models/Ticket.js';
import ticketSchema from '../validations/ticketValidation.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import buildFilter from '../middlewares/filter.js';
import paginate from '../middlewares/paginate.js';

const router = express.Router();

//GET all tickets
//GET api/tickets/
//GET api/tickets?pageSize=10&page=1
//GET api/tickets?status=open&priority=high
//GET api/tickets?search=bug
//Public access
router.get('/', buildFilter, paginate(Ticket), async (req, res) => {
    res.status(200).json(req.paginatedResults);
});

//Create a ticket
//POST api/tickets/
//Private access (only logged in users can create tickets)
//Ticket Schema:  user, title, description, priority, status
router.post('/', auth, async (req, res) => {
    const { error } = ticketSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

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

//GET a ticket by ID
//GET api/tickets/:id
//Public access
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

//Update a ticket by ID
//PUT api/tickets/:id
//Private access (only logged in users can update tickets)
//Ticket Schema:  user, title, description, priority, status
router.put('/:id', auth, async (req, res) => {
    const updates = req.body;
    try {
        const updatedTicket = await Ticket.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
        
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ ticket: updatedTicket });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

//Delete a ticket by ID
//DELETE api/tickets/:id
//Private access (only admin users can delete tickets)
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