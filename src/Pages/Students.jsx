import { useEffect, useState } from "react"
import ModalButton from "../components/MadalButton"
import axios from "axios"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom"

export default function Students() {

    const [classnames, setClassNames] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [utype, setUtype] = useState('')
   
    
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
        localStorage.setItem('utype', utype)
        await axios.get(API_URL + 'users/classname/'+utype, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setUsers(res.data.users)
                console.log(res)
            })
            .catch(err => toast.warning(err.response.data.message))
            .finally(() => setLoading(false))
    }


    useEffect(() => {
        getClassNames()
        if (utype !== "") {
            getUsers()
        }
    }, [utype])


    return <>
        <div className="container ">
            <div className="my-3 d-flex justify-content-end printDoc">
                <ModalButton buttonid={'adnew'} buttonType={'primary'}>
                    Add new
                </ModalButton>
                {/* <AddNewUser usertypes={usertypes} classnames={classnames} /> */}
            </div>
            <div className="mb-3 ">
                <div className="row printDoc">
                    <div className="col-6">
                        <p>O'quvchilar </p>
                        <select className="form-select" onChange={e => setUtype(e.target.value)} >
                            <option value="">Kerakli sinf turini tanlang.</option>
                            {
                                classnames.map(usertype => {
                                    return <option key={usertype.id} value={usertype.id}>{usertype.classname}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <p className="printDoc">{loading ? "Loading..." : ""}</p>
                <p className="printDoc"><b>Jami topilgan ma'lumotlar soni:</b> <i>{users.length}</i></p>
                {
                    users.length>0? <NavLink to={'/students/getdata'} className="btn btn-outline-primary">Pechatga yuklab olish</NavLink>:""
                }
                <table class="table printDoc">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Birthday(YYYY-MM-DD)</th>
                            <th scope="col">Doc Seria</th>
                            <th scope="col">Doc Number</th>
                            <th scope="col">Jinsi</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            utype===''?"":users.map((user, index) => {
                                return <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.fullname}</td>
                                    <td>{user.birthday.split("T")[0]}</td>
                                    <td>{user.pas_seria}</td>
                                    <td>{user.pas_number}</td>
                                    <td>{user.jinsi}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    </>
}