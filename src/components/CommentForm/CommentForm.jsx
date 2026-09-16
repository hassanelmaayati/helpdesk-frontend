import { useEffect, useState } from 'react';
import { createComment, updateComment } from '../../services/commentService';
import './CommentForm.css';

function CommentForm({
  ticketId,
  token,
  editingComment,
  onCommentAdded,
  onCommentUpdated,
  onCancelEdit
}) {
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

    if (!content.trim()) {
      setMessage('Please write a comment.');
      return;
    }

    try {
      if (editingComment) {
        await updateComment(
          ticketId,
          editingComment._id,
          content,
          token
        );

        setContent('');
        setMessage('Comment updated successfully!');
        onCommentUpdated();
      } else {
        await createComment(ticketId, content, token);

        setContent('');
        setMessage('Comment added successfully!');
        onCommentAdded();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h2>
        {editingComment ? 'Edit comment' : 'Add a comment'}
      </h2>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your comment..."
        className="comment-textarea"
      />

      <div className="comment-form-actions">
        <button
          type="submit"
          className="comment-submit-button"
        >
          {editingComment ? 'Update comment' : 'Add comment'}
        </button>

        {editingComment && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="comment-cancel-button"
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <p className="comment-form-message">
          {message}
        </p>
      )}
    </form>
  );
}

export default CommentForm;