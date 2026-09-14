import { useEffect, useState } from 'react'
function ManageCategories() {
    const [categories, setCategories] = useState([]) ;
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null)


const handleSubmit = (event) => {
  event.preventDefault()

  fetch('http://localhost:3001/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then((response) => response.json())
  .then((data) => {
  setCategories((currentCategories) => [...currentCategories, data])
})
setName('');
}


const handleDelete = (id) => {
  fetch(`http://localhost:3001/categories/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then(() => {
      setCategories((currentCategories) =>
        currentCategories.filter((category) => category._id !== id)
      )
    })
}


const handleUpdate = (id) => {
  fetch(`http://localhost:3001/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then((response) => response.json())
    .then((data) => {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category._id === id ? data : category
        )
      )
      setName('')
      setEditId(null)
    })
}


useEffect(() => {fetch('http://localhost:3001/categories')
    .then((response) => response.json())
    .then((data) => {
      setCategories(data)
    })
}, [])

  return (
    <div>
       <h2>Manage Categories</h2>
       <form onSubmit={handleSubmit}>
 <input
  type="text"
  placeholder="Category name"
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
  <button type="submit">Add Category</button>
</form>
    {categories.map((category) => (
  <div key={category._id}>
{editId === category._id ? (
  <>
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
    <button onClick={() => handleUpdate(category._id)}>Save</button>
  </>
) : (
  <p>{category.name}</p>
)}
  <button onClick={() => handleDelete(category._id)}>Delete</button>
  <button onClick={() => {
  setEditId(category._id)
  setName(category.name)
}}>Edit</button>
</div>
))}   
 </div>
  ) 
}

export default ManageCategories