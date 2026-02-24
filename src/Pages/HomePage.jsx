import { useEffect, useState } from "react"
import { API_URL } from "../constants"
import axios from "axios"
import { toast } from "react-toastify"

export default function HomePage(){
    const [kelganlar, setKelganlar] = useState([])
    const [kelmaganlar, setKelmaganlar] = useState([])
    const sana = new Date().toISOString().split("T")[0]
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
                        classname: r.user.className.classname,
                        createdAt: new Date(r.createdAt)  
                    }

                })
                setKelganlar(data)
                // if (res.data.length === 0) {
                //     toast.info("Ushbu kuni hech kim kelmagan")
                // }
                // else {
                //     toast.info(`${sana} kunidagi ma'lumotlar yuklandi`)
                // }
            })
            .catch(err => toast.warning(err.response.data.message))
    }
    async function getYuqlamaKelmaganlar() {
        await axios.get(API_URL + 'yuqlama/kelmaganlar', {
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
                        come: "Kelmagan",
                        fullname: r.fullname,
                        classname: r.className.classname,
                        createdAt: "Kelmagan" 
                    }

                })
                setKelmaganlar(data)
                // if (res.data.length === 0) {
                //     toast.info("Ushbu kuni hech kim kelmagan")
                // }
                // else {
                //     toast.info(`${sana} kunidagi ma'lumotlar yuklandi`)
                // }
            })
            .catch(err => toast.warning(err.response.data.message))
    }

    useEffect(()=> {
        getYuqlamaKelmaganlar()
        getYuqlamalar()
    },[])


    return <div className="container">
        <div className="card w-100 my-4 p-3">
            <h4>Bugun maktabga kelganlar soni</h4>
            <h1>{kelganlar.length}</h1>
        </div>
        <div className="card w-100 my-4 p-3">
            <h4>Bugun maktabga kelmaganlar soni</h4>
            <h1>{kelmaganlar.length}</h1>
        </div>
    </div>
}