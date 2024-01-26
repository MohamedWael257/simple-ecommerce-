import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const users = JSON.parse(localStorage.getItem("users"))
    const navigate = useNavigate();
    let account = JSON.parse(localStorage.getItem("account"))
    useEffect(() => {
        if (account) {
            navigate('/')
        }
    }, [account])
    const login = (e) => {
        users.filter((ele) => {
            if ((ele.username === email || ele.email === email) && ele.password === password) {
                let account = {
                    id: ele.id,
                    username: ele.username,
                    phone: ele.phone,
                    email: ele.email,
                    password: ele.password,
                }
                localStorage.setItem("account", JSON.stringify(account));
                navigate('/')
            }
            else {
                toast.error("error")
            }
            // else {
            //     e.preventDefault()
            //     window.replace("home.html")
            // }
        })
        // navigate('/')
    }
    return (
        <div className="sgnin w-100 py-4 bg-dark">
            <div className="form-box w-50 m-auto p-4">
                <h2 className="text-center">Login</h2>
                <form action="/" onSubmit={login}>
                    <div className="input-box">
                        <span className="erroremail error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />                            <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="errorpassword error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Password</label>
                        <div className="strength"></div>
                    </div>
                    <input type="submit" id="login_btn" className="btn" value="Register" />
                    <div className="login-register">
                        <p className="text-dark">Already have an acoount?
                            <Link href="/register" className="login-link">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login