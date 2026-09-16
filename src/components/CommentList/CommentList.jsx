import { useEffect, useState } from 'react';
import {
  getComments,
  deleteComment
} from '../../services/commentService';
import './CommentList.css';

function CommentList({ ticketId, refresh, onEdit }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;

    getComments(ticketId)
      .then((data) => {
        if (!active) return;

        setComments(Array.isArray(data) ? data : []);
        setMessage('');
      })
      .catch((error) => {
        if (!active) return;

        setMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, [ticketId, refresh]);

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm(
      'Delete this comment?'
    );

    if (!confirmed) return;

    try {
      await deleteComment(ticketId, commentId);

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
          <p className="comment-message">
            {message}
          </p>
        )}

        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
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
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default CommentList;
