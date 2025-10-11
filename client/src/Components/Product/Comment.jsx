import React from 'react'
import { useState } from 'react';
import { createComment } from '../../services/CommentServices';
export default function Comment() {
    const [comment, setComment] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const res = createComment(comment)
        if(res.ok){
            alert('Comment added successfully')
            setComment('')
        }
        else{
            alert('Comment not added')
        }
    }
  return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Comment" />
          <button type="submit">Submit</button>
     </form>
  )
}
