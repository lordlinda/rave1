import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

function LinearProgressWithLabel(props) {
  return (
    <Box>
      <Box>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box className="progress__text">
        <p>{`${Math.round(props.value)} % complete`}</p>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function LinearWithValueLabel(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress((props.amount / props.targetAmount) * 100);
  }, [props.amount, props.targetAmount]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
