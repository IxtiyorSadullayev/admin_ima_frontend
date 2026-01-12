export default function Login({loading, login, password, setLogin, setPassword, loginSubmit}) {

    return <>
        <div className="container ">
            <div className="row my-5">
                <div className="col-3 col-sm-0"></div>
                <div className="col-6 col-sm-12 card">
                    <h1 className="text-center">Autorizatsiya</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Login</label>
                        <input type="text" value={login} onChange={e => setLogin(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Shaxsiy loginingizni kiriting" />
                    </div>
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="inputPassword5" className="form-control" placeholder="Shaxsiy parolingizni kiriting" aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
                    <div className="container text-center">
                        <button className="btn btn-outline-primary w-25 my-3 " onClick={loginSubmit} >Kirish

                            {
                                loading ? <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : ""
                            }
                        </button>
                    </div>
                </div>
                <div className="col-3 col-sm-0"></div>
            </div>
        </div>
    </>
}