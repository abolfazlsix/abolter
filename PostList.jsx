import React, { useState, useEffect } from "react";
import axios from "axios";
import '../cssstyle/myprof.css'

const API = "http://193.151.150.156/api"; // مسیر backend

export default function PostList({ currentUser, refreshKey }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token"); // فرض بر JWT
      await axios.put(
        `${API}/posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return (
    <div className="profilePage">
      {posts.length === 0 && <div>No posts yet</div>}

      {posts.map((p) => (
        <div
          key={p.id}
          style={{ border: "1px solid #ddd", padding: 10, marginBottom: 8 }}
          className="postCard"
        >
          {/* پروفایل کنار نام */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img className="postImage" 
              src={
                p.author?.profilePicture
                  ? `http://193.151.150.156/uploads/${p.author.profilePicture}` // تصویر پروفایل واقعی
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png" // پیش‌فرض
              }
              alt="profile"
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <strong>{p.author?.name || "Unknown"}</strong>
          </div>

          <p>{p.caption}</p>

          {/* تصویر پست */}
          {p.image && (
            <img
              className="postImage" 
              src={`http://193.151.150.156/uploads/${p.image}`} // مسیر تصویر پست
              alt="post"
              width={200}
            />
          )}

          {/* لایک */}
          <div
            className="divset"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <img
              className="imgfot2"
              src={
                p.likes?.includes(currentUser.id)
                  ? "https://images.icon-icons.com/37/PNG/512/like_favorite_heart_3524.png"
                  : "https://images.icon-icons.com/1347/PNG/512/likesocialheartbuttonoutline_87752.png"
              }
              alt="like"
              style={{ width: 25, height: 25, cursor: "pointer" }}
              onClick={() => handleLike(p.id)}
            />
            <span>{p.likes?.length || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
