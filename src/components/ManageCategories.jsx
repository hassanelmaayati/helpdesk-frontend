import { useEffect, useState } from 'react'
function ManageCategories() {
    const [categories, setCategories] = useState([]) ;
    const [name, setName] = useState('');


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
  <p key={category._id}>{category.name}</p>
))}   
 </div>
  ) 
}

export default ManageCategories