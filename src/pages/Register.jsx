import { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { inviteUser, isLoggedIn } from '../services/authService'

function RegistrationPage() {
  const navigate = useNavigate()
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    role: '',
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login')
    }
  }, [navigate])

  const validate = (values) => {
    const errors = {}

    if (!values.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!values.surname.trim()) {
      errors.surname = 'Surname is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!values.role.trim()) {
      errors.role = 'Role is required'
    }

    return errors
  }

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      setStatus(null)
      await inviteUser(values)
      resetForm()
      setStatus('Invitation sent successfully.')
    } catch (error) {
      console.error(error)
      setStatus(error.message || 'Unable to send invitation. Please check the details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            <h1>Invite User</h1>

            {status && <p className="form-status">{status}</p>}

            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" autoComplete="given-name" />
              <ErrorMessage name="name" component="span" className="form-error" />
            </div>

            <div className="form-field">
              <label htmlFor="surname">Surname</label>
              <Field
                id="surname"
                name="surname"
                type="text"
                autoComplete="family-name"
              />
              <ErrorMessage name="surname" component="span" className="form-error" />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" autoComplete="email" />
              <ErrorMessage name="email" component="span" className="form-error" />
            </div>

            <div className="form-field">
              <label htmlFor="role">Role</label>
              <Field id="role" name="role" type="text" />
              <ErrorMessage name="role" component="span" className="form-error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Invite'}
            </button>

            <p>
              Need to sign in again? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default RegistrationPage
