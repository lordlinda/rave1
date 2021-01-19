import React, { useEffect, useState } from "react";
import LabelBottomNavigation from "../Reusables/BottomNavigation";
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
function Profile(props) {
  const [filePath, setFilePath] = useState();
  const photoUpload = (e) => {
    if (e.target.files[0]) {
      props.imageUpload(e.target.files[0]);
      setFilePath(props.filePath);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.querySelector("#photoUpload");
    fileInput.click();
  };
  useEffect(() => {
    props.loadUser();
  }, []);
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
            src={`http://localhost:5000/${props.url}`}
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
        <span onClick={() => props.signOut()}>
          <ExitToAppOutlinedIcon />
          <p>Logout</p>
        </span>
      </div>
      <LabelBottomNavigation />
    </motion.div>
  );
}
const mapStateToProps = (state) => {
  return {
    filePath: state.data.filePath,
    username: state.data.user.username,
    url: state.data.user.photoUrl,
  };
};
export default connect(mapStateToProps, { signOut, loadUser, imageUpload })(
  Profile
);