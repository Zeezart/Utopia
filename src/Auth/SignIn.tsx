import {authImage} from "../assets/index"
import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../ContextApi/UserAuthContext"
import { doc, getDoc,setDoc } from "firebase/firestore"; 
import { db } from "../Auth/Firebase"
import {useGetUser} from "../ContextApi/GetUserProfileContext"


type TUserDetails = {
    email: string;
    password: string;
}

function SignIn() {
    const navigate=useNavigate()
    const [loginDetails, setLoginDetails] = useState<TUserDetails>({
        email:"",
        password: ""
    })

    const [error, setError] = useState<string>("")

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setLoginDetails(prevInput => ({
            ...prevInput,
            [name] :  value
        }))
    }

    const {LogIn} = useAuth()
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        console.log("signed in")
        try{
            const loginResult = await LogIn(loginDetails.email, loginDetails.password)
            if(loginResult){
                const docRef = doc(db, "users",loginResult.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
            }
           
            navigate("/home")
        }catch(err:any){
            setError(err.message)
            alert(error)
        }
    }

   
    const {GoogleLogin} = useAuth()
    async function handleGoogleSignIn(){

        
        try{
            const result = await GoogleLogin()
            const user = result.user

            const userRef = doc(db, "users",user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()){
                const userDoc = userSnap.data()
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }else{
                const userDoc = await setDoc(doc(db,"users",user.uid),{
                    email: user.email,
                    username: user.displayName.split(" ")[0],
                    uid: user.uid,
                    bio: "",
                    profilePictureUrl: user.photoURL,
                    followers: [],
                    following:[],
                    postCounts:[],
                    createdAt: Date.now(),
                })
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }

            navigate("/home")
        }catch(err:any){
            setError(err.message)
            alert(error)
        }
    }

  return (
    <div id="auth-page">
            <div className="container">
                <img src={authImage}/>
                <div className="form-container">
                    <div>

                        <h1 className="logo">Utopia</h1>
                        <p>Welcome Back</p>
                        <form onSubmit={handleSubmit}>
                        <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter a username" 
                                value={loginDetails.email} 
                                required
                                onChange={handleInputChange}
                            />

                            <label>Password</label>
                            <input 
                                type='password' 
                                name="password" 
                                placeholder="Enter password" 
                                value={loginDetails.password} 
                                required
                                onChange={handleInputChange}
                            />
                            <button type="submit">Sign In</button>
                            <p className="p-navigate">Don't have an account? <Link to="/">Register</Link></p>
                        </form>

                        <button className="google" onClick={handleGoogleSignIn}>Sign in with Google</button>
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default SignIn