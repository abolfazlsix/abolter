import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../cssstyle/myprof.css";

export default function MyProfile({ currentUser, setCurrentUser }) {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.profilePicture);
  const defaultProfile = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await API.get(`/posts/user/${currentUser.id}`);
      const fixedImages = res.data.map(p => ({
        ...p,
        image: p.image ? `${API.defaults.baseURL.replace("/api","")}/uploads/${p.image}` : null
      }));
      setPosts(fixedImages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("name", name);
      if (avatar instanceof File) form.append("profilePicture", avatar);

      const res = await API.put(`/users/${currentUser.id}`, form);

      const updated = {
        id: res.data.id,
        name: res.data.name,
        profilePicture: res.data.profilePicture
          ? `${API.defaults.baseURL.replace("/api","")}/uploads/${res.data.profilePicture}`
          : defaultProfile,
      };

      setCurrentUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setAvatar(updated.profilePicture);
      setEditing(false);
      alert("Profile Updated");
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async (id) => {
    await API.put(`/posts/like/${id}`);
    fetchMyPosts();
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`/posts/${id}`);
    fetchMyPosts();
  };

  return (
    <div className="profilePage">

      <div className="profileHeader">
        <img
          className="profileAvatar"
          src={avatar || defaultProfile}
          alt="avatar"
        />

        <div className="profileInfo">
          {editing ? (
            <>
              <input
                className="editInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
              <button className="saveBtn" onClick={handleSave}>Save</button>
              <button className="cancelBtn" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{currentUser.name}</h2>
              <button className="editBtn" onClick={() => setEditing(true)}>✏ Edit Profile</button>
            </>
          )}
        </div>
      </div>

      <h3 className="mypost">پست های من</h3>

      {posts.length === 0 ? (
        <p className="nopost">هنوز پستی ندارید!</p>
      ) : (
        <div className="postList">
          {posts.map(p => (
            <div key={p.id} className="postCard">
              <p>{p.caption}</p>
              {p.image && <img className="postImage" src={p.image} alt="post" />}
              <div className="postActions">
                <button className="likebth" onClick={() => likePost(p.id)}>
                  {p.likes?.length ?? 0}
                  <img
                    className="imgfot2"
                    src={p.likes.includes(currentUser.id)
                      ? "https://images.icon-icons.com/37/PNG/512/like_favorite_heart_3524.png"
                      : "https://images.icon-icons.com/1347/PNG/512/likesocialheartbuttonoutline_87752.png"}
                  />
                </button>

                <button className="deleteBtn" onClick={() => deletePost(p.id)}>
                  <img className="imgfot2" src="https://images.icon-icons.com/37/PNG/512/delete_4219.png" alt="delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
