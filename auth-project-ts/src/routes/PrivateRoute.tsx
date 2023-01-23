import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
interface IProps {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
  }
const PrivateRoute = ({ component: Component }: IProps) => {    
    const isLoggedIn = useSelector((state:any) => state.Auth)    
  return (    
    <Route render={props => (  
        isLoggedIn?.token !== null ?
            <Component {...props} />
        : <Redirect to="/login" />
    )} />
  )
}

export default PrivateRoute