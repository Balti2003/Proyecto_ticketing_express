import Comment from '../models/Comment.js';
import Ticket from '../models/Ticket.js';

export const addComment = async (req, res) => {
    try {
        const { ticketId, text } = req.body;

        const ticket = await Ticket.findOne({ id: ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

        const comment = new Comment({
            ticket: ticket._id,
            user: req.user._id, 
            text: text
        });

        await comment.save();
        const populated = await Comment.findById(comment._id).populate('user', 'name');
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCommentsByTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ id: req.params.ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

        const comments = await Comment.find({ ticket: ticket._id })
            .populate('user', 'name')
            .sort({ createdAt: 1 });
            
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};