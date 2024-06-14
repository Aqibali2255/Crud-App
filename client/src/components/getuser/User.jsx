import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./user.css"
import axios from 'axios'
import toast from 'react-hot-toast'

const User = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const respose = await axios.get("http://localhost:8000/api/getall")
            setUsers(respose.data);
        }
        fetchData()
    }, [])

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((respose) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
                // console.log(respose);
                toast.success(res.data.msg, { position: 'top-right' })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                    
                        <th>S.No</th>
                        <th>Image</th>
                        <th>User name</th>
                        <th>User Email</th>
                        <th> Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user, index) => {

                            return (

                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>image</td>
                                    <td>{user.email}</td>
                                    <td className='actionButton'>
                                        <button onClick={(e) => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default User