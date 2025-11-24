import React, { useState } from "react";
import API from "../api/api";
import '../cssstyle/postpage.css'

export default function Profile({ currentUser, setCurrentUser }) {
  const [name, setName] = useState(currentUser.name || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [profilePicture, setProfilePicture] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("bio", bio);
      if (profilePicture) form.append("profilePicture", profilePicture);

      const res = await API.put(`/users/${currentUser.id}`, form);
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 10 }}>
      <h4>Edit profile</h4>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
      <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
      <button type="submit">Save</button>
    </form>
  );
}
