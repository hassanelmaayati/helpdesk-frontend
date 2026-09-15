import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../services/commentService';
import CommentForm from '../CommentForm/CommentForm';

function CommentList({ ticketId, token }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  const loadComments = async () => {
    try {
      const data = await getComments(ticketId, token);
      setComments(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ticketId, token]);

  const handleCommentUpdated = async () => {
    setEditingComment(null);
    await loadComments();
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(ticketId, commentId, token);
      await loadComments();
      setMessage('Comment deleted successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h2>Comments</h2>

      {message && <p>{message}</p>}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <article key={comment._id}>
            <p>{comment.content}</p>

            <p>
              By: {comment.author?.name || 'Unknown user'}
            </p>

            <button
              type="button"
              onClick={() => setEditingComment(comment)}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(comment._id)}
            >
              Delete
            </button>
          </article>
        ))
      )}

      <CommentForm
        ticketId={ticketId}
        token={token}
        editingComment={editingComment}
        onCommentUpdated={handleCommentUpdated}
        onCancelEdit={() => setEditingComment(null)}
      />
    </section>
  );
}

export default CommentList;