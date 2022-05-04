import "./App.css";
import Clock from "./components/clock";
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Center,
  Container,
} from "@chakra-ui/react";
import { FaPlay, FaRedo, FaPause, FaCog, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import workSfx from "./sfx/work.mp3";
import breakSfx from "./sfx/break.mp3";
import pauseSfx from "./sfx/pause.mp3";

function App() {
  const [workTarget, setWorkTarget] = useState(25 * 60);
  const [breakTarget, setBreakTarget] = useState(5 * 60);
  const [time, setTime] = useState(workTarget); //tempo em segundos
  const [counting, setCounting] = useState(false);
  const [working, setWorking] = useState(true);
  const [clockTarget, setClockTarget] = useState(workTarget);
  const [combo, setCombo] = useState(0);
  const [config, setConfig] = useState(false);
  const [playWork] = useSound(workSfx);
  const [playBreak] = useSound(breakSfx);
  const [playPause] = useSound(pauseSfx);
  const [timeprev, setTimeprev] = useState(0);
  let tick = 1000;
  let nextTickAt = new Date().getTime() + tick;
  // let latency = Date.now() - timeprev;
  let timeout;

  function PlayPause() {
    if (counting === false) {
      return (
        <FaPlay
          className="btn"
          onClick={() => {
            setCounting(!counting);
            playWork();
          }}
        />
      );
    } else {
      return (
        <FaPause
          className="btn"
          onClick={() => {
            setCounting(!counting);
            playPause();
          }}
        />
      );
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
              <p>
                <br />
                Edit your preferences.
              </p>
            </Box>
          </Box>
        </Center>
      );
    }
  }

  // Handle play and stop of countdown
  useEffect(() => {
    if (time > 0 && counting === true) {
      timeout = setTimeout(() => {
        setTime(time - 1);
        // console.log(latency); //latency debug
        // console.log(nextTickAt - new Date().getTime()); //latency debug
        // setTimeprev(Date.now()); //latency debug
      }, nextTickAt - new Date().getTime());
    }
  });

  useEffect(() => {
    if (time === 0 && counting === true) {
      setWorking(!working);
      if (working === true) {
        playBreak();
        setTime(breakTarget);
        setClockTarget(breakTarget);
      } else {
        playWork();
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
          <Box className="title">POMODORO</Box>
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
        <Box>
          <Container className="footer">
            <br />
            The Pomodoro Technique is a time management method developed by
            Francesco Cirillo in the late 1980s. It uses a timer to break work
            into intervals, typically 25 minutes in length, separated by short
            breaks. Each interval is known as a pomodoro, from the Italian word
            for tomato, after the tomato-shaped kitchen timer Cirillo used as a
            university student. - Wikipedia
            <br /> <br />
            Made by Parvi with React and Chakra UI.
            <a href="https://github.com/parvilucifera"> GitHub</a>.
          </Container>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
