import React, { useState } from 'react'
import axios from "axios";
import "./add.css";
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
const Add = () => {
    let users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    }
    const [user, setuser] = useState(users)
    const navigate = useNavigate();
    const inputHandler = (e) => {

        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
        // console.log(name);
        // console.log(value);

    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)

            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/")
            }).catch(error => console.log(error))
    }

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Add new user</h3>

            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='fname'>First name</label>
                    <input type='text' onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='first name' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='lname'>Last name</label>
                    <input type='text' onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last name' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder=' Email' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Password' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='password'>Image</label>
                    <input type='file' onChange={inputHandler} id='file' name='file' autoComplete='off' placeholder='Image' />
                </div>

                <div className='inputGroup'>
                    <button type='submit'>ADD USER</button>
                </div>

                
            </form>
        </div>
    )
}

export default Add