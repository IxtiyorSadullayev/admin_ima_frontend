import { useEffect, useState } from "react"
import logo from './../../images/logo.jpg'
import QRCode from "react-qrcode-logo"
import { API_URL } from "../../constants"
import axios from "axios"
import { toast } from "react-toastify"
export default function QRCodeFile() {

    const [students, setStudents] = useState([])
    const utype = localStorage.getItem("utype")
    async function getUsers() {
        await axios.get(API_URL + 'users/classname/' + utype, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setStudents(res.data.users)
                console.log(res)
            })
            .catch(err => toast.warning(err.response.data.message))
    }

    useEffect(()=>{
        getUsers()
    },)

    return <div className="container-fluid printcontainer">
        <div className="row d-flex">
            {
                students.map((student, index) => {
                    return <div key={index} className="col-6 card text-center align-items-center p-2">
                        <QRCode
                            value={student.id}
                            size={250}
                            bgColor="#ffffff" // Background color
                            fgColor="#000000" // Foreground color
                            logoImage={logo} // Source of the logo image
                            logoWidth={80} // Width of the logo
                            logoHeight={60} // Height of the logo
                            logoPadding={5} // Padding around the logo
                            removeQrCodeBehindLogo={true} // Removes QR code cells behind
                            ecLevel="H" // Error correction level (High is recommended when using a logo)
                            qrStyle="fluid" // Style of the QR code modules (squares, dots, or fluid)
                        />
                        <div className="align-items-start">
                            <i className="p-0"><i>Scan me</i></i> <br />
                            <code>{student.fullname}</code>
                        </div>
                    </div>
                })
            }

        </div>
    </div>
}