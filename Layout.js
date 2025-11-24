import { Outlet, useNavigate } from "react-router-dom";
import './cssstyle/postpage.css';
import { useState } from "react";
import useMediaQuery from "./hooks/useMediaQuery";

export default function Layout({ currentUser, logout }) {
  const navigate = useNavigate();
  const [fot, setFot] = useState(1);

  const isWide = useMediaQuery("(min-width: 780px)");
  const defaultProfile = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div style={{ paddingTop: 50, paddingBottom: isWide ? 0 : 60, minHeight: "100vh" }}>

      {/* HEADER */}
      <div className="header">
        <div className="div1">
          <img className="ima"
            src={currentUser?.profilePicture || defaultProfile}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
            alt="profile"
          />
          <span style={{ fontWeight: "bold" }}>{currentUser?.name || "Guest"}</span>
        </div>

        {/* اگر صفحه بزرگ بود این سه دکمه بیاد */}
        {/* اگر صفحه بزرگ بود این سه دکمه فقط با متن بیاید */}
{isWide && (
  <div className="nav-buttons" style={{ display: "flex", gap: 25, alignItems: "center" }}>
    <span
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => navigate("/")}
    >
      خانه
    </span>

    <span
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => navigate("/create")}
    >
      پست جدید
    </span>

    <span
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => navigate("/profile")}
    >
      پروفایل
    </span>
  </div>
)}

        <div className="div2">
          <img
            className="imgfot2"
            src="https://images.icon-icons.com/788/PNG/512/logout_icon-icons.com_64964.png"
            onClick={logout}
            style={{ cursor: "pointer" }}
            alt="logout"
          />
        </div>
      </div>

      {/* CONTENT */}
      <Outlet />

      {/* FOOTER — فقط برای موبایل */}
      {!isWide && (
        <div className="footer">
          <div className="divfot">
            <div>
              <img
                className="imgfot1"
                src="https://images.icon-icons.com/1660/PNG/512/3844470-home-house_110332.png"
                onClick={() => { setFot(1); navigate("/"); }}
              />
              {fot === 1 && <p>خانه</p>}
            </div>
          </div>

          <div className="divfot">
            <div>
              <img
                className="imgfot1"
                src="https://images.icon-icons.com/1769/PNG/512/4115237-add-plus_114047.png"
                onClick={() => { setFot(2); navigate("/create"); }}
              />
              {fot === 2 && <p>پست</p>}
            </div>
          </div>

          <div className="divfot">
            <div>
              <img
                className="imgfot1"
                src="https://images.icon-icons.com/1769/PNG/512/4092564-about-mobile-ui-profile-ui-user-website_114033.png"
                onClick={() => { setFot(3); navigate("/profile"); }}
              />
              {fot === 3 && <p>پروفایل</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
