import "./App.css";
import Clock from "./components/clock";
import { ChakraProvider, Box, Grid, GridItem, Center } from "@chakra-ui/react";
import { FaPlay, FaRedo, FaPause, FaCog } from "react-icons/fa";

import { useState, useEffect } from "react";

function App() {
  const [workTarget, setWorkTarget] = useState(0.1 * 60);
  const [breakTarget, setBreakTarget] = useState(0.1 * 60);
  const [time, setTime] = useState(workTarget); //tempo em segundos
  const [counting, setCounting] = useState(false);
  const [working, setWorking] = useState(true);
  const [clockTarget, setClockTarget] = useState(workTarget);
  const [combo, setCombo] = useState(0);
  let tick = 1000;
  let timeout;

  function PlayPause() {
    if (counting === false) {
      return <FaPlay color="white" onClick={() => setCounting(!counting)} />;
    } else {
      return <FaPause color="white" onClick={() => setCounting(!counting)} />;
    }
  }

  function Controls() {
    const handleReset = () => {
      clearTimeout(timeout);
      setCounting(false);
      setWorking(true);
      setTime(workTarget);
      setClockTarget(workTarget);
    };

    return (
      <Center>
        <Grid w="100px" templateColumns="repeat(2, 1fr)">
          <Center>
            <PlayPause />
          </Center>
          <Center>
            <FaRedo onClick={() => handleReset()} color="white" />
          </Center>
        </Grid>
      </Center>
    );
  }

  function Config() {
    return (
      <Center>
        <Box p={5} color="white">
          <Grid w="200px" templateColumns="repeat(3, 1fr)">
            <GridItem>
              {workTarget / 60}
              <br />
              work
            </GridItem>
            <GridItem>
              <Center>
                <FaCog color="white" />
              </Center>
            </GridItem>
            <GridItem>
              {breakTarget / 60}
              <br />
              break
            </GridItem>
          </Grid>
        </Box>
      </Center>
    );
  }

  // Handle pause and stop of countdown
  useEffect(() => {
    if (time > 0 && counting === true) {
      timeout = setTimeout(() => {
        setTime(time - 1);
      }, tick);
    } else if (time === 0 && counting === true) {
      setWorking(!working);
      if (working === true) {
        setTime(breakTarget);
        setClockTarget(breakTarget);
      } else {
        setCombo(combo + 1);
        setTime(workTarget);
        setClockTarget(workTarget);
      }
    } else {
      clearTimeout(timeout);
    }
  });

  return (
    <div className="App">
      <ChakraProvider>
        <Box p={20}>
          <Box
            fontSize={26}
            color="white"
            fontWeight="semi-bold"
            fontFamily="monospace"
          >
            POMODORO
          </Box>
          <Clock
            time={time}
            target={clockTarget}
            counting={counting}
            working={working}
            combo={combo}
          />

          <Controls />
          <Config />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
