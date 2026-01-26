import { useState } from "react";
import ModalButton from "../MadalButton";
import ModalContainer from "../ModalContainer";
import axios from "axios";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

export default function AddClass() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    async function saveClassName() {
        await axios.post(API_URL + "users/classname", {
            classname: title,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                toast.success("Yangi sinf yaratildi")
                setDescription("")
                setTitle("")
            })
            .catch(err => toast.warning(err.response.data.message))
    }

    return <div className="container-fluid my-4">
        <ModalButton buttonType={'primary'} buttonid={'addnewclass'} >Yangi sinf qo'shish</ModalButton>

        <ModalContainer modalid={'addnewclass'} modaltitle={'Yangi sinf yaratish'} className='p-3'>
            <div className="container">
                <h5 className="py-4">Yangi sinf qo'shish uchun kerakli ketma ketliklarni to'ldiring!</h5>
                <input type="text" className="form-control my-2" placeholder="Sinf nomi" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea type="text" className="form-control my-2" placeholder="Sinfga qisqacha ta'rif" value={description} onChange={e => setDescription(e.target.value)} />

                <div className="modal-footer">
                    <button className="btn btn-outline-success px-4" onClick={() => saveClassName()} data-bs-dismiss="modal">
                        Save
                    </button>
                </div>

            </div>

        </ModalContainer>
    </div>
}