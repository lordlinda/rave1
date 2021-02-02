import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { loadUser, signOut } from "../../redux/actions/index";
import { editUser } from "../../redux/actions/index";
import Input from "../Reusables/Input";
import { Button } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index} verticalTab`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {" "}
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "60vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel: {
    width: "500px",
  },
  tab: {
    color: "#613eea",
  },
}));

function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
  });
  const { username, email, dateOfBirth } = formData;
  const fetchData = async () => {
    await props.loadUser();
    await setFormData({
      ...formData,
      username: props.user?.username,
      email: props.user?.email,
      dateOfBirth: props.user?.dateOfBirth,
    });
  };
  useEffect(() => {
    fetchData();
  }, [username]);

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editUser = () => {
    props.editUser(formData);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const signOut = () => {
    props.signOut(props.history);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab
          label="Personal Details"
          {...a11yProps(0)}
          className={classes.tab}
        ></Tab>
        <Tab label="Help" {...a11yProps(1)} />
        <Tab label="Logout" onClick={signOut} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.panel}>
        <h1 className="tabs__heading">Personal Details</h1>
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
            label="Birthday"
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDataChange}
          />
          <div className="tab__button">
            <Button className={`editButton`} onClick={editUser}>
              Edit
            </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panel}>
        <div className="contact__details">
          <h1>Contact Information</h1>
          <div>
            <PhoneIcon />
            <p>+256 778940049</p>
          </div>
          <div>
            <MailOutlineIcon />
            <p>contact@pasbanc.com</p>
          </div>
          <div>
            <LocationOnIcon />
            <p>Makerere University</p>
          </div>
        </div>
        <div className="contact__form">
          <h1>Need any more help?</h1>
          <Input label="Name" type="text" />
          <Input label="Email" type="email" />
          <Input label="Message" type="text" />
          <div className="tab__button">
            <Button
              disabled
              variant="contained"
              className={`intervalPage__button ${
                !props.startDate || (!props.endDate && "disabled")
              }`}
            >
              Send
            </Button>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.data.user,
    loading: state.data.loading,
  };
};
export default connect(mapStateToProps, { loadUser, editUser, signOut })(
  VerticalTabs
);
