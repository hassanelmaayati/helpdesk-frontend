import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../services/commentService';
import { useAuth } from '../../context/useAuth';
import './CommentList.css';

function CommentList({ ticketId, refresh, onEdit }) {
  const { token } = useAuth();

  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  const getCurrentUserId = () => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload._id;
    } catch {
      return null;
    }
  };

  const currentUserId = token ? getCurrentUserId() : null;

  const loadComments = async () => {
    try {
      const data = await getComments(ticketId, token);
      setComments(Array.isArray(data) ? data : []);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (!token) return;

    loadComments();
  }, [ticketId, token, refresh]);

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm('Delete this comment?');

    if (!confirmed) return;

    try {
      await deleteComment(ticketId, commentId, token);

      setComments((currentComments) =>
        currentComments.filter(
          (comment) => comment._id !== commentId
        )
      );

      setMessage('Comment deleted successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="comment-section">
      <div className="comment-list">
        {message && (
          <p className="comment-message">{message}</p>
        )}

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          comments.map((comment) => {
            const isCommentOwner =
              comment.author?._id &&
              currentUserId &&
              String(comment.author._id) === String(currentUserId);

            return (
              <article
                className="comment-card"
                key={comment._id}
              >
                <div className="comment-content">
                  <p>{comment.content}</p>

                  <span className="comment-author">
                    By: {comment.author?.name || 'Unknown user'}
                  </span>
                </div>

                {isCommentOwner && (
                  <div className="comment-actions">
                    <button
                      type="button"
                      className="comment-edit-button"
                      onClick={() => onEdit(comment)}
                    >
                      Edit comment
                    </button>

                    <button
                      type="button"
                      className="comment-delete-button"
                      onClick={() => handleDelete(comment._id)}
                    >
                      Delete comment
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default CommentList;