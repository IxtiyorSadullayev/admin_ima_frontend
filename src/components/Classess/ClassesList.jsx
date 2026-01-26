import { useEffect, useState } from "react";
import AddClass from "./AddClass";
import axios from "axios";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";

export default function ClassesList() {
    const [classes, setClasses] = useState([])

    const [col, setCol] = useState([
        { field: '#' },
        { field: 'Sinf nomi' },
        { field: 'Sinf haqida' },
        { field: 'Yaratilgan vaqt' },
        
    ])
    async function getClassess() {
        await axios.get(API_URL + 'users/classname', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                const data = res.data.map((d, index) => {
                    return {
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
        <div className="container-fluid" style={{height: 500}}>
            <AgGridReact
                rowData={classes}
                columnDefs={col}
            />
        </div>


    </div>
}