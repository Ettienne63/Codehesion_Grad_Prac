import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategoryWords } from '../services/categoryService'

function CategoryWords() {
  const { categoryId } = useParams()
  const [words, setWords] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWords = async () => {
      try {
        setError('')
        setIsLoading(true)
        const data = await getCategoryWords(categoryId)
        setWords([...data].sort((a, b) => a.order - b.order))
      } catch (loadError) {
        console.error(loadError)
        setError('Unable to load words for this category.')
      } finally {
        setIsLoading(false)
      }
    }

    loadWords()
  }, [categoryId])

  return (
    <main className="home-page">
      <section className="home-header">
        <Link className="back-link" to="/home">
          Back to categories
        </Link>
        <h1>Category Words</h1>
        <p>Words nested under category #{categoryId}.</p>
      </section>

      {isLoading && <p className="page-status">Loading words...</p>}

      {!isLoading && error && <p className="page-status page-error">{error}</p>}

      {!isLoading && !error && words.length === 0 && (
        <p className="page-status">No words found for this category.</p>
      )}

      {!isLoading && !error && words.length > 0 && (
        <section className="word-list">
          {words.map((word) => (
            <article className="word-row" key={word.id}>
              <span className="word-order">{word.order}</span>
              <h2>{word.name}</h2>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default CategoryWords
