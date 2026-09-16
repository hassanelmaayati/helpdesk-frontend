import { useEffect, useState } from 'react'
import {
  indexCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../services/categoryService'
import Sidebar from '../Sidebar/Sidebar'
import './ManageCategories.css'

function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    createCategory(name, localStorage.getItem('token'))
      .then((data) => {
        setCategories((currentCategories) => [
          ...currentCategories,
          data
        ])
      })

    setName('')
  }

  const handleDelete = (id) => {
    deleteCategory(id, localStorage.getItem('token'))
      .then(() => {
        setCategories((currentCategories) =>
          currentCategories.filter(
            (category) => category._id !== id
          )
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
    <div className="category-page-layout">
      <Sidebar />

      <main className="category-page">
        <header className="category-page-header">
          <h2>Manage Categories</h2>
          <p>Create and manage support ticket categories</p>
        </header>

        <div className="category-container">
          <form
            onSubmit={handleSubmit}
            className="category-form"
          >
            <div className="category-form-field">
              <label htmlFor="category-name">
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>

            <div className="category-form-actions">
              <button
                type="submit"
                className="category-add-button"
              >
                Add Category
              </button>
            </div>
          </form>

          <div className="category-list">
            <div className="category-list-header">
              <h3>Existing Categories</h3>
            </div>

            {categories.map((category) => (
              <div
                className="category-item"
                key={category._id}
              >
                {editId === category._id ? (
                  <input
                    className="category-edit-input"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                  />
                ) : (
                  <span className="category-name">
                    {category.name}
                  </span>
                )}

                <div className="category-item-actions">
                  {editId === category._id ? (
                    <button
                      className="category-save-button"
                      onClick={() =>
                        handleUpdate(category._id)
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="category-edit-button"
                      onClick={() => {
                        setEditId(category._id)
                        setName(category.name)
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="category-delete-button"
                    onClick={() =>
                      handleDelete(category._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageCategories