import axios from "axios"
import { useState } from "react"
import { API_URL } from "../../constants"
import { toast } from "react-toastify"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Yuqlamalar() {

    const [sana, setSana] = useState('')
    const [kelganlar, setKelganlar] = useState([])
    async function getYuqlamalar() {
        await axios.get(API_URL + 'yuqlama/sana', {
            params: {
                sana: sana
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {

                var data = res.data.map(r => {
                    return {
                        id: r.id,
                        come: r.come,
                        fullname: r.user.fullname,
                        classname: r.user.className.classname
                    }

                })
                setKelganlar(data)
                if (res.data.length === 0) {
                    toast.info("Ushbu kuni hech kim kelmagan")
                }
                else {
                    toast.info(`${sana} kunidagi ma'lumotlar yuklandi`)
                }
            })
            .catch(err => toast.warning(err.response.data.message))
    }

    const exportToExcel = () => {
        // JSON → Worksheet
        const worksheet = XLSX.utils.json_to_sheet(kelganlar);

        // Workbook yaratish
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sana);

        // Excel buffer
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // Blob
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        // Yuklab olish
        saveAs(blob, sana + ".xlsx");
    };



    return <>
        <div className="container-fluid my-4">
            <h3>Yo'qlamalarni olish bo'limi </h3>
            <div className="row">
                <div className="col-lg-6 col-sm-12 my-2">
                    <p>Qaysi sanadagi yo'qlamalarni ko'rmoqchisiz</p>
                    <input type="date" value={sana} onChange={e => setSana(e.target.value)} className="form-control" />
                </div>
                <div className="col-lg-6 col-sm-12 my-2">
                    <button className="btn btn-outline-info mx-2" onClick={() => getYuqlamalar()}>Search</button>
                    {
                        kelganlar.length > 0 ? <button onClick={() => exportToExcel()} className="btn btn-outline-primary">XLS ga yuklab olish</button> : ""
                    }
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Sinfi</th>
                        <th scope="col">O'quvchi FIO</th>
                        <th scope="col">Kelgan vaqti</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        kelganlar.map((k, index) => {
                            return <tr key={index}>
                                <th scope="col">{index + 1}</th>
                                <td >{k.classname}</td>
                                <td >{k.fullname}</td>
                                <td >{k.come}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}