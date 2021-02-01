import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Input from "../Reusables/Input";
import "./contact.css";
import { Button } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow";
function Contact(props) {
  return (
    <div>
      <div className="contact__header">
        <div>
          <BackArrow goBack={props.history} />
          <h1>Contact us</h1>
        </div>
      </div>
      <div className="contact__details">
        <h1>Contact Information</h1>
        <div>
          <PhoneIcon />
          <p>+256875835</p>
        </div>
        <div>
          <MailOutlineIcon />
          <p>contact@pasbanc.com qw</p>
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
  );
}

export default Contact;
