import { useState, useEffect, useCallback } from 'react';
import { createComment, getComments, updateComment, deleteComment } from '../../services/CommentService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function Comment() {
    const user = useSelector((state) => state.user.currentUser)
    const [comment, setComment] = useState('');
    const [addComment, setAddComment] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')
    const productId = useParams().id
    const [comments, setComments] = useState([])

    const fetchComments = useCallback(async () => {
        const res = await getComments(productId)
   
        if (Array.isArray(res)) {
            setComments(res)
        } else if (res && Array.isArray(res.data)) {
            setComments(res.data)
        } else {
            setComments([])
        }
    }, [productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createComment(comment, user.id, productId)
        if (res && res.ok) {
            alert('Comment added successfully')
            setComment('')
            setAddComment(false)
            fetchComments()
        } else {
            alert('Comment not added')
        }
    }

    const handleDelete = async (commentToDelete) => {
       
        const res = await deleteComment(commentToDelete)
        
        if (res && res.ok) {
            // Remove comment from state immediately
            setComments(comments.filter(c => (c._id || c.id) !== commentToDelete._id))
            alert('Comment deleted successfully')
        } else {
            alert('Failed to delete comment')
        }
    }

    const handleEdit = (commentToEdit) => {
        setEditingId(commentToEdit._id || commentToEdit.id)
        setEditText(commentToEdit.comment)
    }

    const handleUpdate = async (comment,editText) => {
        const res = await updateComment(comment,editText)
        
        if (res && res.ok) {
             setComments(prevComments => 
                prevComments.map(c => 
                    (c._id || c.id) === comment._id
                        ? { ...c, comment: editText } 
                        : c
                )
            )
            setEditingId(null)
            setEditText('')
            alert('Comment updated successfully')
        } else {
            alert('Failed to update comment')
        }
    }

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    return (
        <>
            {addComment ? (
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Comment"
                            className='border p-2 rounded flex-1'
                        />
                        <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded'>Submit</button>
                        <button
                            type="button"
                            onClick={() => setAddComment(false)}
                            className='bg-gray-500 text-white py-2 px-4 rounded'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setAddComment(true)}
                    className='bg-black text-white py-2 px-4 rounded cursor-pointer'
                >
                    Add Comment
                </button>
            )}
            <div className='mt-4'>
                {Array.isArray(comments) && comments.length > 0 && comments.map((comment) => {
                    const commentId = comment._id || comment.id
                    const isEditing = editingId === commentId

                    return (
                        <div key={commentId} className='border-b py-2'>
                            {isEditing ? (
                                <div className='flex gap-2 mb-2'>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className='border p-2 rounded flex-1'
                                    />
                                    <button
                                        onClick={() => handleUpdate(comment,editText)}
                                        className='bg-green-500 text-white py-2 px-4 rounded'
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingId(null)
                                            setEditText('')
                                        }}
                                        className='bg-gray-500 text-white py-2 px-4 rounded'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <p>{comment.comment}</p>
                            )}
                            <p className='text-gray-500 text-sm'>{moment(comment.createdAt).fromNow()}</p>
                            <div className='flex gap-2 mt-2'>
                                <button
                                    onClick={() => handleDelete(comment)}
                                    className='bg-red-500 text-white py-1 px-3 rounded cursor-pointer text-sm'
                                >
                                    Delete
                                </button>
                                {!isEditing && (
                                    <button
                                        onClick={() => handleEdit(comment)}
                                        className='bg-yellow-500 text-white py-1 px-3 rounded cursor-pointer text-sm'
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}