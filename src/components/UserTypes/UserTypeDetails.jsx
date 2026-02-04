import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

export default function UserTypeDetails() {
    const { id } = useParams();
    const [usertype, setUserType] = useState(null)
    const [role, setRole] = useState('')
    const [description, setDescription] = useState('')
    const [check, setCheck] = useState(false)

    async function getUserTypeData() {
        await axios.get(API_URL + "users/type/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setUserType(res.data)
                setRole(res.data.role)
                setDescription(res.data.description)
            })
            .catch(err => toast.warning(err.response.data.message))
    }

    async function updateUsertype() {
        await axios.patch(API_URL + "users/type/" + id, {
            role: role,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => toast.info(res.data))
            .catch(err => toast.warning(err.response.data.message))
    }

    useEffect(() => {
        getUserTypeData()
    }, [])
    return <>
        <div className="container-fluid my-4">
            <h3>User Turi haqida ma'lumotlar</h3>
        </div>
        {
            usertype === null ? "Kechirasiz muammo mavjud" : <>
                <div className="container">
                    <div className="my-2 form-check">
                        <label htmlFor="rozilik" className="form-check-label">Ma'lumotlarni o'zgartirish</label>
                        <input type="checkbox" value={check} onChange={e => setCheck(check => !check)} className="form-check-input" id="rozilik" />
                    </div>
                    <div className="card p-3 my-3">
                        <div className="card-title">
                            <h4>User turi</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" disabled={!check} className="form-control" value={role} onChange={e => setRole(e.target.value)} />
                        </div>
                    </div>
                    <div className="card p-3 my-3">
                        <div className="card-title">
                            <h4>User turi haqida ma'lumot</h4>
                        </div>
                        <div className="card-body">
                            <textarea type="text" disabled={!check} className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="card p-3">
                                <div className="card-title">
                                    <h4>Yaratilgan vaqt</h4>
                                </div>
                                <div className="card-body">
                                    <p>{new Date(usertype.createdAt).toLocaleDateString()}    {new Date(usertype.createdAt).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="card p-3">
                                <div className="card-title">
                                    <h4>Yangilangan vaqt</h4>
                                </div>
                                <div className="card-body">
                                    <p>{new Date(usertype.ipdatedAt).toLocaleDateString()}    {new Date(usertype.ipdatedAt).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        check ? <button className="btn btn-outline-info my-2" onClick={() => updateUsertype()}>Yangilash</button> : ""
                    }
                </div>
            </>
        }
    </>
}