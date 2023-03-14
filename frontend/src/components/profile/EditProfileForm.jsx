import React,{useEffect,useState} from 'react'
import classes from './EditProfileForm.module.scss'
import {Link} from 'react-router-dom'
import {BsArrowLeftShort} from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditProfileForm() {

    const [user,setUser]=useState({
        name:'',
        email:''
    });

    const updateUserInfo=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const updateProfile=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.put('/api/users/me',user);
            toast.success('Profile updated');
            setUser(res.data);
        }catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        (
            async()=>{
                try{
                    const{data}=await axios.get('/api/users/me');
                    setUser(data);
                }catch(err){
                    console.log(err);
                }
            }
        )();
    }, []);

  return (
    <div>
        <Link to="/" className={classes.backBtn}>
            <BsArrowLeftShort/>
            Home
        </Link>
        <div>
            <h1>Edit Profile</h1>
            <form className={classes.editForm} onSubmit={updateProfile}>
                <label htmlFor="name">
                    Full Name<input type="text" name="name" placeholder="Full Name" required value={user.name} onChange={updateUserInfo}/>
                </label>
                <label htmlFor="email">
                    E-mail
                    <input type="email" name="email" placeholder="E-mail" required value={user.email} onChange={updateUserInfo}/>
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfileForm