import express from 'express';
import { addComment, getCommentsByTicket } from '../controllers/commentController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, addComment);
router.get('/ticket/:ticketId', auth, getCommentsByTicket);

export default router;