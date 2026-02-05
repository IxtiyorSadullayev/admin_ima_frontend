import { useEffect, useState } from "react";
import AddClass from "./AddClass";
import axios from "axios";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import ModalButton from "../MadalButton";
import ModalContainer from "../ModalContainer";
import { Link } from "react-router-dom";

export default function ClassesList() {
    const [classes, setClasses] = useState([])

    async function getClassess() {
        await axios.get(API_URL + 'users/classname', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                const data = res.data.map((d, index) => {
                    return {
                        "id": d.id,
                        "#": index + 1,
                        "Sinf nomi": d.classname,
                        "Sinf haqida": d.description,
                        "Yaratilgan vaqt": d.createdAt.toString().split("T")[0]
                    }
                })
                setClasses(data)

                // console.log(res.data)
                console.log(data)
            })
            .catch(err => toast.warning(err.response.data.message))
    }


    useEffect(() => {
        getClassess()
    }, [])

    return <div className="container-fluid">

        <AddClass />
        <hr />
        <span>Hozircha sinflarni o'zgartirish va o'chirish imkoniyati mavjud emas</span>
        <div className="container-fluid" style={{ height: 500 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Sinf nomi</th>
                        <th scope="col">Sinf haqida</th>
                        <th scope="col">Yaratilgan vaqt</th>
                        <th scope="col">Harakatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map(sinf => {
                            return <tr key={sinf['#']}>
                                <th>{sinf["#"]}</th>
                                <td><Link to={'/classes/'+sinf['id']} className="nav-link">{sinf["Sinf nomi"]}</Link></td>
                                <td><Link to={'/classes/'+sinf['id']} className="nav-link">{sinf["Sinf haqida"]}</Link></td>
                                <td>{sinf["Yaratilgan vaqt"]}</td>
                                <td>
                                    <ModalButton  buttonType={'info mx-2'} buttonid={`sinf${sinf.id}`} >📝</ModalButton>
                                    {/* <button className="btn btn-outline-info mx-2">📝</button> */}
                                    <ModalContainer modaltitle={"Sinfni o'zgartirish ma'lumotlari"} modalid={`sinf${sinf.id}`} >
                                        <div className="modal-body">
                                            <input type="text" className="form-control my-2" value={sinf["Sinf nomi"]} />
                                            <input type="text" className="form-control my-2" value={sinf["Sinf haqida"]} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" class="btn btn-info" data-bs-dismiss="modal">Update</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </ModalContainer>
                                    <ModalButton buttonType={'danger'} buttonid={`sinfd${sinf.id}`} >🗑</ModalButton>
                                    <ModalContainer modaltitle={"Sinfni rostdan ham o'chirmoqchimisiz ?"} modalid={`sinfd${sinf.id}`} >

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


    </div>
}