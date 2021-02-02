import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Input from "../Reusables/Input";
import "./contact.css";
import { Button } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
function Contact(props) {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9riibtt",
        "template_ppg3enk",
        e.target,
        "user_6u6K2en2011yb9DjjXbp4"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success(
            "Thank you for feedback ,we will get in touch with you shortly"
          );
        },
        (error) => {
          console.log(error.text);
          toast.error("Oops something went wrong,please try again");
        }
      );
  }

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
      <form className="contact__form" onSubmit={sendEmail}>
        <h1>Need any more help?</h1>
        <Input label="Name" type="text" name="name" />
        <Input label="Email" type="email" name="email" />
        <Input label="Message" type="text" name="message" />
        <Button variant="contained" type="submit" className="editButton">
          Send
        </Button>
      </form>
    </div>
  );
}

export default Contact;
