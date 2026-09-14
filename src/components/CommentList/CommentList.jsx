import { useEffect, useState } from 'react';
import { getComments } from '../../services/commentService';

function CommentList({ ticketId, token }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments(ticketId, token);
        setComments(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadComments();
  }, [ticketId, token]);

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
          </article>
        ))
      )}
    </section>
  );
}

export default CommentList;