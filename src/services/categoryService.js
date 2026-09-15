const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const indexCategory = async (token) => {
  const response = await fetch(
    `${BASE_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get categories');
  }

  return response.json();
};

const createCategory = async (name, token) => {
  const response = await fetch(
    `${BASE_URL}/categories`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create category');
  }

  return response.json();
};

const updateCategory = async (id, name, token) => {
  const response = await fetch(
    `${BASE_URL}/categories/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update category');
  }

  return response.json();
};

const deleteCategory = async (id, token) => {
  const response = await fetch(
    `${BASE_URL}/categories/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }

  return response.json();
};

export {
  indexCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};