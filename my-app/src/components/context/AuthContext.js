import { createContext,useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()

export default AuthContext;

// suppying the following properties throught the application 
// user - that has the info about the user 
// loading state - that refreshes the access token at the start of the application
// authTokens that contain information about the access and the refresh tokens 
// 


export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [user,setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [authTokens,setauthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [loading,setLoading] = useState(true)
    const loginUser = async (e)=>{
        e.preventDefault()
        const userData = JSON.stringify({username:e.target.username.value,password:e.target.password.value})
        console.log(userData)
        const response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:userData
        })
        const data = await response.json()
        if(response.status === 200){
            setauthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }
        else{
            alert("User does not exist")    
        }
    }

    const logoutUser = ()=>{
        setUser(null)
        setauthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async ()=>{
        // console.log("updateToken Called!")
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()
        if(response.status === 200) {
            setauthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(() => {
        if(loading){
            updateToken()
        }
        const fourMinutes = 4 * 60 * 1000
        const interval = setInterval(()=>{
        if(authTokens){
            updateToken()
        }
        },fourMinutes)
        return ()=>clearInterval(interval)
    }, [authTokens,loading])
    


    const contextData = {
        user:user,
        authTokens:authTokens,
        loginUser : loginUser,
        logoutUser : logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
