import { useEffect, useState } from 'react'
import api from '../services/api'
function ManageCategories() {
    const [categories, setCategories] = useState([]) ;
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null)

const handleSubmit = (event) => {
  event.preventDefault()

  api.post('/categories', {
    name: name
  })
    .then((response) => response.data)
    .then((data) => {
      setCategories((currentCategories) => [...currentCategories, data])
    })

  setName('')
}





const handleDelete = (id) => {
  api.delete(`/categories/${id}`)
    .then((response) => response.data)
    .then(() => {
      setCategories((currentCategories) =>
        currentCategories.filter((category) => category._id !== id)
      )
    })
}

const handleUpdate = (id) => {
  api.put(`/categories/${id}`, {
    name: name
  })
    .then((response) => response.data)
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




useEffect(() => {
  api.get('/categories')
    .then((response) => response.data)
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