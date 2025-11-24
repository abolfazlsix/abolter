import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import '../cssstyle/postpage.css'

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onRegister(res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login">
   
      <div className="holdlogin">   <h3>خوش آمدید</h3>
        <h2>ثبت نام کنید</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">ثبت نام</button>
        </form>
        <p>حساب دارید؟ <button onClick={() => navigate("/login")}>ورود</button></p>
      </div>
    </div>
  );
}
