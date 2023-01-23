import React from 'react'
import { Col, Row, Container, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { loginRequest } from '../redux/actions'
import { store } from '../../../store'
interface FuncProp {
  formik?: any
  onClick?: any
}
const Login: React.FC<FuncProp> = () => {
  const history = useHistory()
  const loginUserSchema = Yup.object({
    password: Yup.string().required('Please enter the password'),
    email: Yup.string()
      .required('Please enter the email address')
      .email('email should be valid email address'),
  })
  const formik: any = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      store?.dispatch(
        loginRequest({
          email: values.email,
          password: values.password,
          history: history,
        }),
      )
    },
  })
  return (
    <>
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3 border-primary"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                    <div className="mb-3">
                      <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                          <div className="col-sm-12">
                            <label htmlFor="email" className="">
                              Email
                            </label>
                            <input
                              type="text"
                              name="email"
                              id="email"
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
                          Dont have an account? <a href="/signup">Signup</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Login
