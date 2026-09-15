import { useEffect, useState } from 'react';
import { createComment, updateComment } from '../../services/commentService';

function CommentForm({ ticketId, token, editingComment, onCommentUpdated, onCancelEdit }) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingComment) {
      setContent(editingComment.content);
      setMessage('');
    } else {
      setContent('');
      setMessage('');
    }
  }, [editingComment]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingComment) {
        await updateComment(
          ticketId,
          editingComment._id,
          content,
          token
        );

        setMessage('Comment updated successfully!');
        onCommentUpdated();
      } else {
        await createComment(ticketId, content, token);

        setContent('');
        setMessage('Comment added successfully!');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingComment ? 'Edit Comment' : 'Add a Comment'}</h2>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your comment..."
      />

      <button type="submit">
        {editingComment ? 'Update Comment' : 'Add Comment'}
      </button>

      {editingComment && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}

      {message && <p>{message}</p>}
    </form>
  );
}

export default CommentForm;