import { useEffect, useState } from 'react'
import { indexCategory, createCategory, updateCategory, deleteCategory } from '../../services/categoryService'
function ManageCategories() {
    const [categories, setCategories] = useState([]) ;
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null)

const handleSubmit = (event) => {
  event.preventDefault()

createCategory(name, localStorage.getItem('token'))
  .then((data) => {
    setCategories((currentCategories) => [...currentCategories, data])
  })

  setName('')
}


const handleDelete = (id) => {
 deleteCategory(id, localStorage.getItem('token'))
  .then(() => {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category._id !== id)
    )
  })
}

const handleUpdate = (id) => {
  updateCategory(id, name, localStorage.getItem('token'))
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
  indexCategory(localStorage.getItem('token'))
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