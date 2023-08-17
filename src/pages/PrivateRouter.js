import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrivateRouter({children}) {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((store)=>store.user.isAuthenticated)

    useEffect(() => {
      if(!isLoggedIn){
        navigate('/', { state: { unProtectedRoute: true }})
        return () => {
          children
        }
      }
    },[])

  return children
}

export default PrivateRouter