import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Login from "./components/Login";
import { API_URL } from "./constants";
import RouterApp from "./Router";

function App() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [navbatchi, setNavbatchi] = useState(null)
  async function getCondidate() {
    setLoading(true)
    await axios.get(API_URL + 'users/type', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setNavbatchi({ userLogin: true }))
      .catch(err => {
        setNavbatchi({ userLogin: false })
        setNavbatchi(null)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getCondidate()
  }, [loading])

  async function loginSubmit() {
    setLoading(true)
    await axios.post(API_URL + 'users/login', {
      login: login, password: password
    })
      .then(data => {
        toast.success("Ma'lumotingiz to'g'ri. Yo'naltirilmoqdasiz")
        localStorage.setItem("token", data.data.token)
      })
      .catch(err => {
        toast.warning('Hatolik sodir bo\'ldi')
      })
      .finally(() => setLoading(false))
  }

  if (navbatchi != null) {
    return <>
      <RouterApp />
      <ToastContainer />
    </>
  }
  else {
    return (<>
      <Login login={login} setLogin={setLogin} password={password} setPassword={setPassword} loading={loading} loginSubmit={loginSubmit} />
      <ToastContainer />
    </>
    );
  }
}

export default App;
