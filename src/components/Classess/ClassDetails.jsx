import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../constants"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ClassDetails() {
    const { id } = useParams()
    const [sinf, setSinf] = useState(null)
    async function getClassData() {
        await axios.get(API_URL + "users/classname/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setSinf(res.data)
                toast.info("Ma'lumotlar yuklandi.")
            })
            .catch(err => toast.warning(err.response.message.data))
    }

    useEffect(() => {
        getClassData()
    }, [])
    return <>
        <div className="container-fluid my-4">
            <h3>Class haqidagi ma'lumotlar</h3>
            {sinf === null ? "Kechirasiz ma'lumotlarni olishda hatolik mavjud" : <div className="row my-2">
                <div className="col-lg-6 col-sm-12">
                    <div className="card p-3 m-1">
                        <div className="card-title">
                            <h4>Sinf nomi:</h4>
                        </div>
                        <div className="card-body">
                            <p>{sinf.classname}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <div className="card p-3 m-1">
                        <div className="card-title">
                            <h4>Sinf haqida qisqacha ma'lumot:</h4>
                        </div>
                        <div className="card-body">
                            <p>{sinf.description}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                    <div className="card p-3 m-1">
                        <div className="card-title">
                            <h4>Sinf yaratilgan vaqt:</h4>
                        </div>
                        <div className="card-body">
                            <p>{new Date(sinf.createdAt).toLocaleDateString()} {new Date(sinf.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                    <div className="card p-3 m-1">
                        <div className="card-title">
                            <h4>Sinfdagi o'quvchilar ro'yxati:</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Fullname</th>
                                        <th scope="col">Tug'ilgan kuni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sinf.users.length>0?sinf.users.map((user, index)=> {
                                            return <tr key={index}>
                                                <th>{index+1}</th>
                                                <td><Link to={'/students/'+user.id} className="nav-link">{user.fullname}</Link></td>
                                                <td>{new Date(user.birthday).toLocaleDateString()}</td>
                                            </tr>
                                        }) :""
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </>
}