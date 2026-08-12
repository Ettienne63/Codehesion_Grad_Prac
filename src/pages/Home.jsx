import { useEffect, useState } from 'react'
import { getCategories } from '../services/categoryService'

function Home() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setError('')
        const data = await getCategories()
        setCategories(data)
      } catch (loadError) {
        console.error(loadError)
        setError('Unable to load categories.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  return (
    <main className="home-page">
      <section className="home-header">
        <h1>Categories</h1>
        <p>Browse available learning categories.</p>
      </section>

      {isLoading && <p className="page-status">Loading categories...</p>}

      {!isLoading && error && <p className="page-status page-error">{error}</p>}

      {!isLoading && !error && categories.length === 0 && (
        <p className="page-status">No categories found.</p>
      )}

      {!isLoading && !error && categories.length > 0 && (
        <section className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.id}>
              <span className="category-id">#{category.id}</span>
              <h2>{category.name}</h2>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Home
