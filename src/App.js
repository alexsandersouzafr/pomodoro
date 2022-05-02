import "./App.css";
import Clock from "./components/clock";
import { ChakraProvider, Box, Grid, GridItem, Center } from "@chakra-ui/react";
import { FaPlay, FaRedo, FaPause, FaCog, FaCheck } from "react-icons/fa";

import { useState, useEffect } from "react";

function App() {
  const [workTarget, setWorkTarget] = useState(25 * 60);
  const [breakTarget, setBreakTarget] = useState(5 * 60);
  const [time, setTime] = useState(workTarget); //tempo em segundos
  const [counting, setCounting] = useState(false);
  const [working, setWorking] = useState(true);
  const [clockTarget, setClockTarget] = useState(workTarget);
  const [combo, setCombo] = useState(0);
  const [config, setConfig] = useState(false);
  let tick = 1000;
  let timeout;

  function PlayPause() {
    if (counting === false) {
      return <FaPlay className="btn" onClick={() => setCounting(!counting)} />;
    } else {
      return <FaPause className="btn" onClick={() => setCounting(!counting)} />;
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
            <FaRedo className="btn" onClick={() => handleReset()} />
          </Center>
        </Grid>
      </Center>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWorkTarget(event.target.work.value * 60);
    setBreakTarget(event.target.break.value * 60);
    setTime(event.target.work.value * 60);
    setClockTarget(event.target.work.value * 60);
    setCounting(false);
    setWorking(true);
    setConfig(false);
  };

  function Config() {
    if (!config) {
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
                  <FaCog className="btn" onClick={() => setConfig(true)} />
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
    } else {
      return (
        <Center>
          <Box p={5} color="white">
            
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid w="200px" templateColumns="repeat(3, 1fr)">
                  <GridItem>
                    <input
                      type="number"
                      name="work"
                      defaultValue={workTarget / 60}
                    />
                    <br />
                    work
                  </GridItem>
                  <GridItem>
                    <Center>
                      <button type="submit">
                        <FaCheck className="btn" />
                      </button>
                    </Center>
                  </GridItem>
                  <GridItem>
                    <input
                      type="number"
                      name="break"
                      defaultValue={breakTarget / 60}
                    />
                    <br />
                    break
                  </GridItem>
                </Grid>
              </form>
            </Box>
            <Box>
              <p><br />
                Edit your preferences.
                
              </p>
            </Box>
          </Box>
        </Center>
      );
    }
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
    }
    if (!counting || config) {
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
