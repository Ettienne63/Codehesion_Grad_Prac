import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { register } from '../services/authService'

function RegistrationPage() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validate = (values) => {
    const errors = {}

    if (!values.username.trim()) {
      errors.username = 'Username is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm your password'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords must match'
    }

    return errors
  }

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    const registrationValues = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    try {
      setStatus(null)
      const data = await register(registrationValues)
      console.log(data)
      resetForm()
      setStatus('Registration successful.')
    } catch (error) {
      console.error(error)
      setStatus('Unable to register. Please try again.')
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
            <h1>Register</h1>

            {status && <p className="form-status">{status}</p>}

            <div className="form-field">
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                type="text"
                autoComplete="username"
              />
              <ErrorMessage
                name="username"
                component="span"
                className="form-error"
              />
            </div>

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
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="form-error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="form-error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default RegistrationPage
