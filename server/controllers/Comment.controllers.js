import Comment from "../models/Comment.model.js";

export const createComment = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const { comment } = req.body;
        
        if (typeof comment !== "string" || !comment.trim()) {
            return res.status(400).json({ message: "'comment' must be a non-empty string" });
        }
        
        const newComment = new Comment({ userId, productId, comment: comment.trim() });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { comment } = req.body;
        
        if (typeof comment !== "string" || !comment.trim()) {
            return res.status(400).json({ message: "'comment' must be a non-empty string" });
        }
        
        const existingComment = await Comment.findById(req.params.id);
        
        if (!existingComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        if (existingComment.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to update this comment" });
        }
        
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { comment: comment.trim() },
            { new: true }
        );
        
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
};
export const deleteComment = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this comment" });
        }
        
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedComment);
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};