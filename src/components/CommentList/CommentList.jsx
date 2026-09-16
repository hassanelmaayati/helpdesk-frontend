import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../services/commentService';
import CommentForm from '../CommentForm/CommentForm';
import './CommentList.css';

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
    <section className="comment-section">
      <div className="comment-section-header">
        <h2>COMMENTS</h2>
      </div>

      <div className="comment-list">
        {message && <p className="comment-message">{message}</p>}

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article className="comment-card" key={comment._id}>
              <div className="comment-content">
                <p>{comment.content}</p>

                <span className="comment-author">
                  By: {comment.author?.name || 'Unknown user'}
                </span>
              </div>

              <div className="comment-actions">
                <button
                  type="button"
                  className="comment-edit-button"
                  onClick={() => setEditingComment(comment)}
                >
                  EDIT
                </button>

                <button
                  type="button"
                  className="comment-delete-button"
                  onClick={() => handleDelete(comment._id)}
                >
                  DELETE
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="comment-form-container">
        <CommentForm
          ticketId={ticketId}
          token={token}
          editingComment={editingComment}
          onCommentUpdated={handleCommentUpdated}
          onCancelEdit={() => setEditingComment(null)}
        />
      </div>
    </section>
  );
}

export default CommentList;