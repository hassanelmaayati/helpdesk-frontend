import { useState } from 'react';
import { createComment } from '../../services/commentService';

function CommentForm({ ticketId, token }) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createComment(ticketId, content, token);

      setContent('');
      setMessage('Comment added successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Comment</h2>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your comment..."
      />

      <button type="submit">Add Comment</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default CommentForm;