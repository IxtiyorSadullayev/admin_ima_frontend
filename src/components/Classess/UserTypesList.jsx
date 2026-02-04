import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import AddRole from "./AddRole"
import ModalButton from "../MadalButton"
import ModalContainer from "../ModalContainer"

export default function UserTypesList() {
    const [usertypes, setUserTypeS] = useState([])
    async function getData() {
        await axios.get(API_URL + 'users/type', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setUserTypeS(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <div className="container my-4">
            <h3 className="my-4">Tizimdagi mavjud rol turlari</h3>
            <AddRole />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Role</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        usertypes.map((d, index) => {
                            return <tr key={index}>
                                <th >{index + 1}</th>
                                <td >{d.role}</td>
                                <td >{d.description}</td>
                                <td >
                                    <ModalButton buttonType={'info mx-2'} buttonid={`sinf${d.id}`} >📝</ModalButton>
                                    {/* <button className="btn btn-outline-info mx-2">📝</button> */}
                                    <ModalContainer modaltitle={"Roleni o'zgartirish ma'lumotlari"} modalid={`sinf${d.id}`} >
                                        <div className="modal-body">
                                            <input type="text" className="form-control my-2" value={d.role} />
                                            <input type="text" className="form-control my-2" value={d.description} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" class="btn btn-info" data-bs-dismiss="modal">Update</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </ModalContainer>
                                    <ModalButton buttonType={'danger'} buttonid={`sinfd${d.id}`} >🗑</ModalButton>
                                    <ModalContainer modaltitle={"Roleni rostdan ham o'chirmoqchimisiz ?"} modalid={`sinfd${d.id}`} >

                                        <div className="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </ModalContainer>
                                </td>
                            </tr>
                        })

                    }
                </tbody>
            </table>
        </div>
    </>
}