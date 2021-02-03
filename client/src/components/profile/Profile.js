import React, { useEffect } from "react";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./profile.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, loadUser, imageUpload } from "../../redux/actions/index";
import { motion } from "framer-motion";
import Badge from "@material-ui/core/Badge";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import VerticalTabs from "./Tabs";

function Profile(props) {
  const photoUpload = (e) => {
    if (e.target.files[0]) {
      props.imageUpload(e.target.files[0]);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.querySelector("#photoUpload");
    fileInput.click();
  };
  useEffect(() => {
    props.loadUser();
  }, [props.url]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="profile__header">
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={<CameraAltOutlinedIcon onClick={handleEditPicture} />}
        >
          <Avatar
            alt={props.username}
            src={
              props.method === "google"
                ? `${props.url}`
                : `${process.env.REACT_APP_URL}${props.url}`
            }
          />
        </Badge>
        <input
          type="file"
          className="profileBio__imageInput"
          id="photoUpload"
          onChange={photoUpload}
        />
        <p>{props.username}</p>
      </div>
      <div className="profile__tabs">
        <VerticalTabs history={props.history} />
      </div>
      <div className="profile__details">
        <Link className="profile__detail" to="/details">
          <div>
            <PermIdentityOutlinedIcon />
            <p>Personal Details</p>
          </div>
          <ArrowForwardIosIcon />
        </Link>
        <Link className="profile__detail" to="/contact">
          <div>
            <HelpOutlineOutlinedIcon />
            <p>Help</p>
          </div>

          <ArrowForwardIosIcon />
        </Link>
      </div>
      <div
        onClick={() => props.signOut(props.history)}
        className="profile__detail"
      >
        <ExitToAppOutlinedIcon />
        <span>Logout</span>
      </div>
    </motion.div>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.data.user?.username,
    url: state.data.user?.photoUrl,
    method: state.data.user?.methods,
  };
};
export default connect(mapStateToProps, { signOut, loadUser, imageUpload })(
  Profile
);
