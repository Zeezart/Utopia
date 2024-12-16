import React, { useState } from 'react'
import {profilePicture} from "../assets/index"
import useEditProfile from '../Hooks/useEditProfile';

type TEditProfileProps = {
    username?: string;
    bio: string;
    setEditModal: any
}

type TProfileDetails = {
    bio: string;
    username?: string;
}

function EditProfile({username,bio,setEditModal}:TEditProfileProps) {
    const [profileDetails, setProfileDetails] = useState<TProfileDetails>({
        bio: bio,
        username: username
    })

    


    const { editProfile} = useEditProfile()

    

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target 
        setProfileDetails(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }


    async function handleProfile(){
        try{
            await editProfile(profileDetails)
        }catch(err:any){
            alert(err.message)
        }
        setEditModal(false)
        console.log(profileDetails)
    }

    
    
  return (
    <div id="edit-profile">
        <div className="top-tab">
            <div className='left'>
                <i>backicon</i>
                <p>Edit Profile</p>
            </div>
            
            <i>closeicon</i>
        </div>
        <div className='form'>
            <div className='input file-input'>
                <div className="profile">
                    <img src={profilePicture} />
                </div>
                
            </div>

            <div className='input'>
                <input type='text' name="username" value={profileDetails.username} onChange={handleChange}/>
                <p>Username</p>
            </div>

            <div className='input'>
                <input type='text' name="bio" value={profileDetails.bio} onChange={handleChange}/>
                <p>Bio</p>
            </div>

            <button onClick={handleProfile}>Done</button>
        </div>
    </div>
  )
}

export default EditProfile