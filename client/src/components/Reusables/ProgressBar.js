import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="70%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <p className='text-sm text-white'>{`${Math.round(
          props.value,
        )} % complete`}</p>
      </Box>
    </Box>
  );
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearWithValueLabel(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress((props.amount/props.targetAmount)* 100)

  }, [props.amount,props.targetAmount]);
    console.log(progress)
  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}