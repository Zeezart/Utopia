import {authImage} from "../assets/index"
import React, {useState} from "react"
import { db } from "./Firebase"
import { setDoc,doc,collection,query,where, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"
import { useAuth } from "../ContextApi/UserAuthContext"
import { useNavigate } from "react-router-dom"

type TUserDetails = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agree: boolean
}

function SignUp() {
    const [userDetails, setUserDetails] = useState<TUserDetails>({
        email:"",
        username: "",
        password: "",
        confirmPassword:"",
        agree:false
    })

    const [error, setError] = useState<string>("")
    const {SignUp} = useAuth()
    const [showUsernameError, setShowUsernameError] = useState(false)

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value, checked, type} = e.target
        setUserDetails(prevInput => ({
            ...prevInput,
            [name] : type === "checkbox" ? checked : value
        }))
    }

    const navigate = useNavigate()
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", userDetails.username));
        const querySnapshot = await getDocs(q)

        if(!querySnapshot.empty){
            setShowUsernameError(true)
        }else{
            setShowUsernameError(false)
            if (userDetails.password === userDetails.confirmPassword){
                try{
                    const userCredentials = await SignUp(userDetails.email,userDetails.password)
                    const user= userCredentials.user
    
                    const userDoc = await setDoc(doc(db,"users",user.uid),{
                        email: user.email,
                        uid: user.uid,
                        username: userDetails.username,
                        bio: "",
                        profilePictureUrl: user.photoURL,
                        followers: [],
                        following:[],
                        postCounts:[],
                        posts:[],
                        createdAt: Date.now(),
                    })
                    localStorage.setItem("user-info", JSON.stringify(userDoc))
                    alert("account created successfully")
                    navigate("/signin")
                }catch(err:any){
                    setError(err.message)
                    alert(error)
                }
            }else{
                alert("Password Mismatch")
            }
        }
    }

  return (
    <div id="auth-page">
            <div className="container">
                <img src={authImage}/>
                <div className="form-container">
                    <div>

                        <h1 className="logo">Utopia</h1>
                        <p>Share your moments with the world</p>
                        <form onSubmit={handleSubmit}>
                        <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter a username" 
                                value={userDetails.email} 
                                required
                                onChange={handleInputChange}
                            />

                            <label>Username</label>
                            <input 
                                type='text' 
                                name="username" 
                                placeholder="Enter a username" 
                                value={userDetails.username} 
                                required
                                onChange={handleInputChange}
                            />
                            {showUsernameError && <p>Username taken</p>}

                            <label>Password</label>
                            <input 
                                type='password' 
                                name="password" 
                                placeholder="Create a password" 
                                value={userDetails.password} 
                                required
                                onChange={handleInputChange}
                            />

                            <label>Confirm Password</label>
                            <input 
                                type='password' 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                value={userDetails.confirmPassword} 
                                required
                                onChange={handleInputChange}
                            />

                            <div className="agreement">
                                <input 
                                    type="checkbox" 
                                    id="agreement" 
                                    checked={userDetails.agree} 
                                    // required
                                    onChange={handleInputChange}
                                />
                                <label >I agree to our terms and condition</label>
                            </div>

                            <button type="submit">Create Account</button>
                            <p className="p-navigate">Aready have an account? <Link to="/">Sign In</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default SignUp