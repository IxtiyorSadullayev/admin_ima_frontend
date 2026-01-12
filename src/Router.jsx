import { Link, Route, Routes } from "react-router-dom";
import App from "./App";
import Workers from "./Pages/Workers";

export default function RouterApp(){

    return  <div className="container-fluid">
        <div className="row">
            <div className="col-3 p-4 ">
                <nav class="nav flex-column">
                    <h4>IMA Control App</h4>
                    <hr />
                    <h5>API routes</h5>
                    <Link className="nav-link" to={'/'}>Adminstratsiya</Link>
                    <hr />
                    <h5>Ishchi hodimlar va o'quvchilar ro'yxati</h5>
                    <Link className="nav-link" to={'/workers'}>Ishchi Hodimlar</Link>
                    <Link className="nav-link" to={'/students'}>O'quvchilar</Link>
                    <hr />
                    <h5>Boshqaruv bo'limi</h5>
                    <Link className="nav-link" to={'/classes'}>Sinflar ro'yxati</Link>
                    <Link className="nav-link" to={'/user-types'}>Foydalanuvchi turi</Link>
                    <hr />
                    <h5>Yo'qlama bo'limi</h5>
                    <Link className="nav-link" to={'/muster'}>Yo'qlamalar</Link>
                </nav>
            </div>
            <div className="col-9">
                <Routes>
                    <Route path="workers" element={<Workers />}/>
                </Routes>
            </div>
        </div>
    </div>
}