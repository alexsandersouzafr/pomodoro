import { ChakraProvider, Box } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function Clock(props) {
  let minutes = (time) => {
    if (time >= 60) {
      minutes = (time - (time % 60)) / 60;
    } else {
      minutes = 0;
    }
    return minutes;
  };

  let seconds = (time) => {
    if (time >= 60) {
      if (time == 60) {
        seconds = 0;
      } else {
        seconds = time - minutes * 60;
      }
    } else if (time < 60) {
      seconds = time;
    }
    let fseconds = seconds.toString();
    if (fseconds.length < 2) {
      fseconds = "0" + fseconds;
    }
    return fseconds;
  };

  let progress = 17 //TODO

  return (
    <ChakraProvider>
      <CircularProgress
        value={progress}
        trackColor="#000099"
        color="#FF6666"
        size="300px"
        thickness="6px"
      >
        <CircularProgressLabel>
          <Box color="white">
            {minutes(props.time)}:{seconds(props.time)}
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </ChakraProvider>
  );
}

export default Clock;
