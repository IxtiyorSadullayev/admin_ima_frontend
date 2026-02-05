import axios from "axios"
import { useParams } from "react-router-dom"
import { API_URL } from "../../constants"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import imagenotfound from './../../images/imagenotfound.jpg'

export default function StudentDetails() {
    const hiddenFileInput = useRef(null);
    const { id } = useParams()
    const [student, setStudent] = useState(null)
    const [check, setCheck] = useState(false)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [pas_number, setPas_number] = useState("")
    const [pas_seria, setPas_seria] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [jinsi, setJinsi] = useState("")
    const [birthday, setBirthday] = useState("")
    const [imgUrl, setImgUrl] = useState(null)

    async function getDataUser() {
        await axios.get(API_URL + "users/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                toast.success("Ma'lumotlar yuklandi")
                setStudent(res.data)
                setLogin(res.data.login)
                setPassword(res.data.password)
                setFullname(res.data.fullname)
                setPas_number(res.data.pas_number)
                setPas_seria(res.data.pas_seria)
                setPhoneNumber(res.data.phoneNumber)
                setJinsi(res.data.jinsi)
                setBirthday(new Date(res.data.birthday).toLocaleDateString())
                setImgUrl(res.data.imgUrl)
            })
            .catch(err => toast.warning(err.response.data.message))
    }


    useEffect(() => {
        getDataUser()
    }, [])

    return <>
        <div className="container-fluid my-4">
            <h3>Class haqidagi ma'lumotlar</h3>
            {
                student === null ? "" : <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <span>O'quvchi id raqami: {student.id}</span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-check mx-2">
                            <input className="form-check-input" type="checkbox" value={check} onChange={e => setCheck(check => !check)} id="checkChecked" />
                            <label className="form-check-label" htmlFor="checkChecked">
                                Yangilash
                            </label>
                        </div>
                       {check &&  <button className="btn btn-outline-info mx-2">Yangilash</button>}
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <div className="card my-2 p-2">
                                    <div className="card-title">
                                        <h4>Student logini</h4>
                                    </div>
                                    <div className="card-body">
                                        <input type="text" value={login} onChange={e => setLogin(e.target.value)} className="form-control" disabled={!check} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                                <div className="card my-2 p-2">
                                    <div className="card-title">
                                        <h4>Student paroli</h4>
                                    </div>
                                    <div className="card-body">
                                        <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="form-control" disabled={!check} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                                <div className="card my-2 p-2">
                                    <div className="card-title">
                                        <h4>To'liq ismi</h4>
                                    </div>
                                    <div className="card-body">
                                        <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} className="form-control" disabled={!check} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="my-2 p-2">
                            <div className="card-title">
                                <h4>Student Rasmi</h4>
                            </div>
                            <div className="card-body">
                                
                                
                                {imgUrl === ""?<img src={imgUrl === null || imgUrl === "" ? imagenotfound : imgUrl === null ? URL.createObjectURL(imgUrl) : API_URL + "/" + imgUrl} alt="rasmi" className="img-thumbnail w-50" /> :imgUrl && <img className="img-thumbnail w-50" src={URL.createObjectURL(imgUrl)} alt="Uploaded preview" />}
                                {check ? <input type="file" accept="image/*" ref={hiddenFileInput} onChange={e => {
                                    setImgUrl(e.target.files[0])
                                    console.log(e.target.files[0])
                                }} className="form-control my-2" /> : ""}
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-6 col-sm-12">
                        <div className="card my-2 p-2">
                            <div className="card-title">
                                <h4>Student Metrka Seriasi</h4>
                            </div>
                            <div className="card-body">
                                <input type="text" value={pas_seria} onChange={e => setPas_seria(e.target.value)} className="form-control" disabled={!check} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="card my-2 p-2">
                            <div className="card-title">
                                <h4>Student Metrka Raqami</h4>
                            </div>
                            <div className="card-body">
                                <input type="text" value={pas_number} onChange={e => setPas_number(e.target.value)} className="form-control" disabled={!check} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="card my-2 p-2">
                            <div className="card-title">
                                <h4>Student jinsi</h4>
                            </div>
                            <div className="card-body">
                                <input type="text" value={jinsi} onChange={e => setJinsi(e.target.value)} className="form-control" disabled={!check} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="card my-2 p-2">
                            <div className="card-title">
                                <h4>Student tug'ilgan kuni</h4>
                            </div>
                            <div className="card-body">
                                <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} className="form-control" disabled={!check} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                        <div className="card my-2 p-2">
                            <div className="card-title">
                                <h4>Student Telefon raqami</h4>
                            </div>
                            <div className="card-body">
                                <input type="tel" value={phoneNumber === "" ? "Hali raqam kiritilmagan" : phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control" disabled={!check} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </>
}