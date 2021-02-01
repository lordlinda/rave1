import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import SwapHorizSharpIcon from "@material-ui/icons/SwapHorizSharp";
import { withRouter } from "react-router-dom";
import PaymentIcon from "@material-ui/icons/Payment";
function LabelBottomNavigation(props) {
  const [value, setValue] = React.useState("recents");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.history.push(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="/" icon={<HomeSharpIcon />} />
      <BottomNavigationAction
        label="Plans"
        value="/plans"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Withdraw"
        value="/transfers"
        icon={<PaymentIcon />}
      />
      <BottomNavigationAction
        label="Transactions"
        value="/transactions"
        icon={<SwapHorizSharpIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="/profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default withRouter(LabelBottomNavigation);
