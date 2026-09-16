
import { useEffect, useState } from 'react';
import {
  getComments,
  deleteComment
} from '../../services/commentService';
import './CommentList.css';

function CommentList({
  ticketId,
  token,
  refresh,
  onEdit
}) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  const loadComments = async () => {
    try {
      const data = await getComments(ticketId, token);
      setComments(data);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ticketId, token, refresh]);

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm(
      'Delete this comment?'
    );

    if (!confirmed) return;

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