import React from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'
import { Form,  FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { store } from '../../../store'
import { registerRequest } from '../redux/actions'
interface FuncProp {
  formik?: any
  onClick?: any
}
const Signup: React.FC<FuncProp> = () => {  
  const signupUserSchema = Yup.object({
    first_name: Yup.string()
      .required('Please enter the first name')
      .max(50, 'First Name should be maximum 50 characters'),
    last_name: Yup.string()
      .required('Please enter the last name')
      .max(50, 'Last Name should be maximum 50 characters'),
    user_name: Yup.string()
      .required('Please enter the user name')
      .min(3, 'username must be greater than 3 characters'),
    password: Yup.string().required('Please enter the password'),
    email: Yup.string()
      .required('Please enter the email address')
      .email('email should be valid email address'),
  })
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      email: '',
    },
    validationSchema: signupUserSchema,
    onSubmit: async (values) => {
      store?.dispatch(
        registerRequest({
          first_name: values.first_name,
          last_name: values.last_name,
          user_name: values.last_name,
          password: values.password,
          email: values.email,
        }),
      )
    },
  })
  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Signup</h2>
                  <div className="mb-3">
                    <FormikProvider value={formik}>
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="col-sm-12">
                          <label htmlFor="firstname" className="">
                            First Name
                          </label>
                          <input
                            id="firstname"
                            type="text"
                            className="form-control input_color_login"
                            name="first_name"
                            placeholder="Enter the first name"
                            value={formik.values && formik.values.first_name}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.first_name &&
                            formik.touched.first_name && (
                              <span className="text-danger letterspacing">
                                {formik.errors.first_name}
                              </span>
                            )}
                          <br />
                          <label htmlFor="lastname" className="">
                            Last Name
                          </label>
                          <input
                            id="lastname"
                            type="text"
                            placeholder="Enter last name"
                            className="form-control input_color_login"
                            name="last_name"
                            value={formik.values && formik.values.last_name}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.last_name &&
                            formik.touched.last_name && (
                              <span className="text-danger captchaErrors letterspacing">
                                {formik.errors.last_name}
                              </span>
                            )}
                          <br />
                          <label htmlFor="firstname" className="">
                            User Name
                          </label>
                          <input
                            id="username"
                            type="text"
                            className="form-control input_color_login"
                            name="user_name"
                            placeholder="Enter the Username"
                            value={formik.values && formik.values.user_name}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.user_name &&
                            formik.touched.user_name && (
                              <span className="text-danger letterspacing">
                                {formik.errors.user_name}
                              </span>
                            )}
                          <br />
                          <label htmlFor="email" className="">
                            Email
                          </label>
                          <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter the email"
                            className="form-control input_color_login"
                            value={formik.values && formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.email && formik.touched.email && (
                            <span className="text-danger captchaErrors letterspacing">
                              {formik.errors.email}
                            </span>
                          )}
                          <br />
                          <label htmlFor="password" className="">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter the password"
                            className="form-control input_color_login"
                            value={formik.values && formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.password &&
                            formik.touched.password && (
                              <span className="text-danger captchaErrors letterspacing">
                                {formik.errors.password}
                              </span>
                            )}
                          <div className="justify-content-center d-flex">
                            <button
                              className="text-center btn btn-primary pl-5 pr-5 rounded-pill mt-3"
                              type="submit"
                              onClick={() => formik.handleSubmit}
                            >
                              {' '}
                              Submit{' '}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </FormikProvider>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account? <a href="/login">Login</a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Signup
