import { useState } from "react";
import ModalContainer from "./ModalContainer";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-toastify";

export default function AddNewUser({usertypes, classnames}) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [birthday, setBirthday] = useState("")
    const [pas_seria, setPas_seria] = useState("")
    const [pas_number, setPas_number] = useState("")
    const [tel, setTel] = useState("")
    const [user, setUser] = useState("")
    const [classname, setClassname] = useState("")

    async function sendUserBackend() {
        await axios.post(API_URL+'users', {
            login: login,
            password: password,
            fullname: fullname,
            birthday: birthday,
            pas_seria: pas_seria,
            pas_number: pas_number,
            userType: user,
            className: classname,
            phoneNumber: tel
        })
        .then(res => {
            setLogin("")
            setPas_number("")
            setBirthday("")
            setClassname("")
            setFullname("")
            setPas_seria("")
            setPassword("")
            setTel("")
            setUser("")
            toast.success("Ma'lumot bazaga kiritildi")
        })
        .catch(err => toast.warning(err.response.data.message))
        
    }

    return <ModalContainer modalid={'adnew'} modaltitle={'Yangi foydalanuvchi yaratish'} >
        <div className="p-3">
            <input type="text" value={login} onChange={e=> setLogin(e.target.value)} className="form-control my-2" placeholder="Login..."/>
            <input type="text" value={password} onChange={e=> setPassword(e.target.value)} className="form-control my-2" placeholder="Password..."/>
            <input type="text" value={fullname} onChange={e=> setFullname(e.target.value)} className="form-control my-2" placeholder="FullName..."/>
            <input type="date" value={birthday} onChange={e=> setBirthday(e.target.value)} className="form-control my-2" placeholder="Birth day..."/>
            <input type="text" value={pas_seria} onChange={e=> setPas_seria(e.target.value)} className="form-control my-2" placeholder="Pas seria..."/>
            <input type="text" value={pas_number} onChange={e=> setPas_number(e.target.value)} className="form-control my-2" placeholder="Pas number..."/>
            <input type="tel" value={tel} onChange={e => setTel(e.target.value)} className="form-control my-2" placeholder="Tel number..."/>
            <select className="form-select my-2" value={user} onChange={e=> setUser(e.target.value)}>
                <option value="">User Turini tanlang</option>
                {
                    usertypes.map(user=> {
                        return <option value={user.id}>{user.role}</option>
                    })
                }
            </select>
            <select className="form-select my-2" value={classname} onChange={e=> setClassname(e.target.value)}>
                <option value="">Sinfni tanlang</option>
                {
                    classnames.map(user=> {
                        return <option value={user.id}>{user.classname}</option>
                    })
                }
            </select>
            <div className="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=> sendUserBackend()} className="btn btn-outline-primary px-4" >Save</button>
            </div>
        </div>
    </ModalContainer>
}

