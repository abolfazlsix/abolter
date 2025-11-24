import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import '../cssstyle/postpage.css'
import '../cssstyle/postpage.css'

export default function CreatePost({ currentUser, onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("caption", caption);
      if (image) form.append("image", image);

      await API.post("/posts", form);
      setCaption(""); setImage(null);
      if (onPostCreated) onPostCreated();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Create post failed");
    }
  };

  return (
   <div className="formpost">
  <form onSubmit={submit}>

    <h4>ساخت پست جدید</h4>

    {/* کپشن چند خطی */}
    <textarea
      className="inputpost"
      value={caption}
      onChange={e => setCaption(e.target.value)}
      placeholder="Caption..."
      rows={4}
      style={{ resize: "vertical" }} 
    />

    {/* دکمه انتخاب فایل سفارشی */}
    <input
      id="fileUpload"
      type="file"
      onChange={e => setImage(e.target.files[0])}
      style={{ display: "none" }}     // مخفی
    />

    <label htmlFor="fileUpload" className="fileBtn">
       انتخاب تصویر
    </label>

    {/* نمایش نام فایل انتخاب شده */}
    <p className="fileName">
      {image ? image.name : "هیچ فایلی انتخاب نشده"}
    </p>

    {/* ارسال پست */}
    <button className="post" type="submit">
     پوست
    </button>

  </form>
</div>

  );
}
