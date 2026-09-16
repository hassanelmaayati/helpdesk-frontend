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
  const [editName, setEditName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    indexCategory()
      .then((data) => {
        setCategories(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        setMessage(error.message)
      })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const newCategory = await createCategory(name)

      setCategories((currentCategories) => [
        ...currentCategories,
        newCategory
      ])

      setName('')
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id)

      setCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category._id !== id
        )
      )

      setMessage('')
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleUpdate = async (id) => {
    try {
      const updatedCategory = await updateCategory(id, editName)

      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category._id === id ? updatedCategory : category
        )
      )

      setEditName('')
      setEditId(null)
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    }
  }

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

            {message && (
              <p className="category-form-message">
                {message}
              </p>
            )}
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
                    value={editName}
                    onChange={(event) =>
                      setEditName(event.target.value)
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
                        setEditName(category.name)
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
