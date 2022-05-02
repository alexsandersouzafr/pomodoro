import { ChakraProvider, Box } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel, Center } from "@chakra-ui/react";
import { useEffect } from "react";

function Clock(props) {
  function Status() {
    if (props.working === true) {
      return (
        <Box className="transition" fontSize={20}>
          working
        </Box>
      );
    } else {
      return (
        <Box className="transition" fontSize={20}>
          break
        </Box>
      );
    }
  }

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
      if (time === 60) {
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

  let progress = (100 / props.target) * props.time;

  return (
    <ChakraProvider>
      <Center>
        <CircularProgress
          value={progress}
          trackColor="#000099"
          color="#FF4444"
          size="300px"
          thickness="5px"
        >
          <CircularProgressLabel>
            <Box color="white" fontSize={16}>
              {" "}
              combo: {props.combo}
            </Box>
            <Box color="white">
              {minutes(props.time)}:{seconds(props.time)}
            </Box>
            <Box>
              <Status />
            </Box>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
    </ChakraProvider>
  );
}

export default Clock;
