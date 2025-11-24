import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import '../cssstyle/login.css';
import '../cssstyle/postpage.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login">
    
      <div className="holdlogin"> <h3>خوش آمدید</h3>
        <h2>ورود به حساب</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">ورود</button>
        </form>
        <p>حساب ندارید؟ <button onClick={() => navigate("/register")}>ثبت نام</button></p>
      </div>
    </div>
  );
}
