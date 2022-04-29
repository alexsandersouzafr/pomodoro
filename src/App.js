import "./App.css";
import Clock from "./components/clock";
import Controls from "./components/controls";
import Config from "./components/config";
import { ChakraProvider, Box, Grid, GridItem, Center } from "@chakra-ui/react";
import { FaPlay, FaRedo } from "react-icons/fa";

import { useState } from "react";

function App() {
  const [target, setTarget] = useState(25*60);
  const [time, setTime] = useState(30); //tempo em segundos

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
          <Clock time={time} target={target} />
          <Center>
            <Grid w="100px" templateColumns="repeat(2, 1fr)">
              <Center>
                <FaPlay onClick={() => setTime(time - 1)} color="white" />
              </Center>
              <Center>
                <FaRedo onClick={() => setTime(25*60)} color="white" />
              </Center>
            </Grid>
          </Center>
          <Config />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
