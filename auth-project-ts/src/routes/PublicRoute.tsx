import React from 'react'
import { Route } from 'react-router-dom'
interface IProps {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}
const PublicRoute = ({ component: Component }: IProps) => {
  return (    
    <Route render={(props) => <Component {...props} />} />
  )
}

export default PublicRoute
