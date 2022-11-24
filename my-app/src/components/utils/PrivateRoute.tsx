import React, {useContext} from 'react'
import { Route,redirect,Routes,Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const PrivateRoute : React.FC<any> = ({ children }) => {
    let user = useContext(AuthContext)
    return children;
};

export default PrivateRoute