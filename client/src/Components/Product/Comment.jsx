import { useState, useEffect, useCallback } from 'react';
import { createComment, getComments, updateComment, deleteComment } from '../../services/CommentService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { MoreHorizontal, Check, Edit2, Trash2, X, Heart, Star } from 'lucide-react';

export default function Comment() {
    const user = useSelector((state) => state.user.currentUser);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [addComment, setAddComment] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editRating, setEditRating] = useState(0);
    const [openMenuId, setOpenMenuId] = useState(null);
    const productId = useParams().id;
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        const res = await getComments(productId);
        if (Array.isArray(res)) setComments(res);
        else if (res && Array.isArray(res.data)) setComments(res.data);
        else setComments([]);
    }, [productId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createComment(comment, user.id, productId, rating);
        if (res && res.ok) {
            setComment('');
            setRating(0);
            setAddComment(false);
            fetchComments();
        } else {
            alert('Comment not added');
        }
    };

    const handleDelete = async (commentToDelete) => {
        const res = await deleteComment(commentToDelete);
        if (res && res.ok) {
            setComments(comments.filter((c) => (c._id || c.id) !== commentToDelete._id));
        } else {
            alert('Failed to delete comment');
        }
    };

    const handleEdit = (commentToEdit) => {
        setEditingId(commentToEdit._id || commentToEdit.id);
        setEditText(commentToEdit.comment);
        setEditRating(commentToEdit.rating || 0);
        setOpenMenuId(null);
    };

    const handleUpdate = async (comment, editText) => {
        const res = await updateComment(comment, editText, editRating);
        if (res && res.ok) {
            setComments((prev) =>
                prev.map((c) =>
                    (c._id || c.id) === comment._id ? { ...c, comment: editText, rating: editRating } : c
                )
            );
            setEditingId(null);
            setEditText('');
            setEditRating(0);
        } else {
            alert('Failed to update comment');
        }
    };

    const renderStars = (count) => (
        <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    All Reviews
                </h2>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-black focus:outline-none">
                        <option>Latest</option>
                        <option>Oldest</option>
                        <option>Most Liked</option>
                    </select>

                    <button
                        onClick={() => setAddComment(!addComment)}
                        className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium shadow-sm"
                    >
                        Write a Review
                    </button>
                </div>
            </div>

            {/* Add Comment Form */}
            {addComment && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Your Review</h3>

                    <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                onClick={() => setRating(i + 1)}
                                className={`w-6 h-6 cursor-pointer ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this product..."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                        rows="4"
                    />

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-black text-white py-2.5 px-6 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            Submit Review
                        </button>
                        <button
                            onClick={() => setAddComment(false)}
                            className="bg-gray-100 text-gray-700 py-2.5 px-6 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comments.length > 0 ? (
                    comments.map((comment) => {
                        const commentId = comment._id || comment.id;
                        const isEditing = editingId === commentId;

                        return (
                            <div
                                key={commentId}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition relative"
                            >
                                {/* Menu */}
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === commentId ? null : commentId)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>

                                {openMenuId === commentId && (
                                    <div className="absolute top-10 right-4 w-40 bg-white border border-gray-100 rounded-lg shadow-md py-1 z-10">
                                        <button
                                            onClick={() => handleEdit(comment)}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment)}
                                            className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900">{comment.user?.name || 'Anonymous'}</h4>
                                            <div className="bg-green-500 rounded-full p-0.5">
                                                <Check className="w-3 h-3 text-white stroke-[3]" />
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            Posted on {moment(comment.createdAt).format('MMMM D, YYYY')}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                {renderStars(comment.rating || 4)}

                                {/* Review text */}
                                {isEditing ? (
                                    <>
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 mb-3"
                                            rows="3"
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleUpdate(comment, editText)}
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium flex items-center gap-2"
                                            >
                                                <Check className="w-4 h-4" /> Save
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" /> Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed mb-2 break-words whitespace-pre-line overflow-wrap-anywhere">
                                        {comment.comment}
                                    </p>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-2 text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
