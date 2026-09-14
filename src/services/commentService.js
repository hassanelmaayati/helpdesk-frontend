const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const createComment = async (ticketId, content, token) => {
  const response = await fetch(
    `${BASE_URL}/tickets/${ticketId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
};



const getComments = async (ticketId, token) => {
  const response = await fetch(
    `${BASE_URL}/tickets/${ticketId}/comments`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get comments');
  }

  return response.json();
};


export { createComment , getComments};