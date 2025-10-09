import Comment from "../models/Comment.model";
import { createError } from "../utils/error";
export const createComment = async (req, res,next) => {
    try {
        const {userId,productId}=req.params
        const comment=req.body
        const newComment=new Comment({userId,productId,comment})
        await newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        next(createError(error))
    }
}    

export const updateComment = async (req, res,next) => {
    try {
        const { userId } = req.params;
        const comment = await Comment.findById(req.params.id);
        
       
        if (!comment) {
            return next(createError(404, "Comment not found"));
        }
        
        if (comment.userId.toString() !== userId) {
            return next(createError(403, "You are not allowed to delete this comment"));
        }
        const newComment=req.body
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,newComment,{new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        next(createError(error))
    }
}
export const deleteComment = async (req, res, next) => { // Add 'next' parameter
    try {
        const { userId, productId } = req.params;
        const comment = await Comment.findById(req.params.id);
        
       
        if (!comment) {
            return next(createError(404, "Comment not found"));
        }
        
        if (comment.userId.toString() !== userId) {
            return next(createError(403, "You are not allowed to delete this comment"));
        }
        
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedComment);
    } catch (error) {
        next(createError(500, error.message || "Something went wrong"));
    }
};

export const getComment = async (req, res,next) => {
    try {
        const {userId,productId}=req.params
        const comment=req.body
        const deletedComment=await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedComment)
    } catch (error) {
        next(createError(error))
    }
}

