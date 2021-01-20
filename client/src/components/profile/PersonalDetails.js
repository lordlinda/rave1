import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Input from "../Reusables/Input";
import "./details.css";
import BackArrow from "../Reusables/BackArrow";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/index";
import { editUser } from "../../redux/actions/index";
import { PulseLoader } from "react-spinners";

function PersonalDetails(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const { username, email, phoneNumber, dateOfBirth } = formData;
  const fetchData = async () => {
    await props.loadUser();
    await setFormData({
      ...formData,
      username: props.user?.username,
      phoneNumber: props.user?.phoneNumber,
      email: props.user?.email,
      dateOfBirth: props.user?.dateOfBirth,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const editUser = () => {
    props.editUser(formData);
  };
  return (
    <div>
      {props.loading && (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      )}
      <div className="personalDetails__header">
        <div>
          <BackArrow goBack={props.history} />
          <h1>Personal Details</h1>
        </div>
      </div>
      <div className="personalDetails__form">
        <Input
          label="Name"
          type="text"
          name="username"
          value={username}
          onChange={handleDataChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleDataChange}
        />
        <Input
          label="Phone number"
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleDataChange}
        />
        <Input
          label="Birthday"
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDataChange}
        />
        <Button
          className={`intervalPage__button editButton`}
          onClick={editUser}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    filePath: state.data.filePath,
    user: state.data.user,
    loading: state.data.loading,
  };
};
export default connect(mapStateToProps, { loadUser, editUser })(
  PersonalDetails
);
