import axios from "axios"
import { API_URL } from "../constants"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ModalButton from "../components/MadalButton"
import AddNewUser from "../components/AddNewUser"

export default function Workers() {
    const [usertypes, setUsertypes] = useState([])
    const [classnames, setClassNames] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [utype, setUtype] = useState('')
    async function getUserType() {
        setLoading(true)
        await axios.get(API_URL + 'users/type', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setUsertypes(res.data))
            .catch(err => toast(err.response.data.message))
            .finally(() => setLoading(false))
    }
    async function getClassNames() {
        setLoading(true)
        await axios.get(API_URL + 'users/classname', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setClassNames(res.data))
            .catch(err => toast(err.response.data.message))
            .finally(() => setLoading(false))
    }

    async function getUsers() {
        setLoading(true)
        await axios.get(API_URL + 'users/getbyUserType', {
            params: {
                usertype_id: utype
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setUsers(res.data))
            .catch(err => toast.warning(err.response.data.message))
            .finally(() => setLoading(false))
    }


    useEffect(() => {
        getUserType()
        getClassNames()
        if (utype !== "") {
            getUsers()
        }
    }, [utype])

    return <div className="container-fluid">
        <div className="my-3 d-flex justify-content-end">
            <ModalButton buttonid={'adnew'} buttonType={'primary'}>
                Add new
             </ModalButton>
             <AddNewUser usertypes={usertypes} classnames={classnames} />
        </div>
        <div className="mb-3">
            <div className="row">
                <div className="col-6">
                    <p>Ishchilar </p>
                    <select className="form-select" onChange={e => setUtype(e.target.value)} >
                        <option value="">Kerakli foydalanuvchi turini tanlang.</option>
                        {
                            usertypes.filter(user => user.role !== "Student").map(usertype => {
                                return <option key={usertype.id} value={usertype.id}>{usertype.role}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <p>{loading ? "Loading..." : ""}</p>
            <p><b>Jami topilgan ma'lumotlar soni:</b> <i>{users.length}</i></p>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Birthday(YYYY-MM-DD)</th>
                        <th scope="col">Role</th>
                        <th scope="col">Work type</th>
                        <th scope="col">Created(YYYY-MM-DD)</th>
                        <th scope="col">Tel</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{user.fullname}</td>
                                <td>{user.birthday.split("T")[0]}</td>
                                <td>{user.userType.role}</td>
                                <td>{user.className.classname}</td>
                                <td>{user.createdAt.split("T")[0]}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    </div>
}