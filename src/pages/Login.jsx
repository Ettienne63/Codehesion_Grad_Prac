import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

function LoginForm() {
  const navigate = useNavigate()
  const initialValues = {
    email: 'admin@codehesion.co.za',
    password: 'P@ssword1',
  }

  const validate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null)
      await login(values)
      navigate('/register')
    } catch (error) {
      console.error(error)
      setStatus('Unable to login. Please check your details and try again.')
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
            <h1>Login</h1>

            {status && <p className="form-status">{status}</p>}

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" autoComplete="email" />
              <ErrorMessage name="email" component="span" className="form-error" />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="form-error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p>
              Need an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default LoginForm
