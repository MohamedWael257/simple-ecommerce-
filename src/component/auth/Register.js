import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const navigate = useNavigate();
    let account_user = localStorage.getItem("account")
    let account = JSON.parse(account_user)


    useEffect(() => {
        if (account) {
            navigate('/')
        }
    }, [account])
    let id;
    let users;
    if (localStorage.users) {
        users = JSON.parse(localStorage.users)
        id = users.length + 1
    }
    else {
        users = [];
        id = 0
    }

    const register = (e) => {
        e.preventDefault();
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        let emailw = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let validateUser = username !== "" && username.length > 6 && username.length < 20
        let validateEmail = email !== "" && email.match(emailw)
        let validatePass = password !== "" && password.match(passw)
        let validateconfPass = cPassword !== "" && cPassword === password
        let validatePhone = phone !== "" && phone.length === 11
        const findemail = users.findIndex((obj) => obj.email === email)
        const findeusername = users.findIndex((obj) => obj.username === username)
        const findephone = users.findIndex((obj) => obj.phone === phone)
        if (validateUser && validatePass && validateEmail && validateconfPass && validatePhone && findemail < 0 && findeusername < 0 && findephone < 0) {
            let userUI = {
                id: id,
                username: username,
                phone: phone,
                email: email,
                password: password,
            }
            // id += 1
            users.push(userUI)
            localStorage.setItem('users', JSON.stringify(users))
            console.log(users);
            let account = {
                username: username,
                email: email,
                password: password
            }
            localStorage.setItem("account", JSON.stringify(account));
            navigate('/')
            // wrapper.classList.add("active-otopup")
        }
        else {
            // e.preventDefault()
            // email = ""
            toast.error("there are valid information")
        }



    }
    return (
        <div className="sgnin w-100 py-4 bg-dark">
            <div className="form-box w-50 m-auto p-4 ">
                <h2>Register</h2>
                <form action='/' onSubmit={register}>
                    <div className="input-box">
                        <span className="erroruser error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="person"></ion-icon>
                        </span>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="erroremail error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="errorphone error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="call"></ion-icon> </span>
                        <input type="tel" name="Phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <label>Phone</label>
                    </div>
                    <div className="input-box">
                        <span className="errorpassword error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Password</label>
                        <div className="strength"></div>
                    </div>
                    <div className="input-box">
                        <span className="errorconfpassword error text-danger"></span>
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="password" name="" id="confpassword" value={cPassword} onChange={(e) => setcPassword(e.target.value)} required />
                        <label>Confirm Password</label>
                    </div>
                    {/* <div className="input-box">
                            <span className="errorcarimage error text-danger"></span>
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input type="file" id="carimage" name="carimage" accept="image/*" />
                            <label htmlFor="carimage" >Car Image</label>
                        </div> */}

                    <div className="remember-forget text-center">
                        <label>
                            <input type="checkbox" />
                            I agree the terms & conditions
                        </label>
                    </div>
                    <button type="submit" id="register_btn" className="btn">Register</button>
                    <div className="login-register">
                        <p>Already have an acoount?
                            <Link to="/login" className="login-link"> Login</Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup