import "./App.css";
import Clock from "./components/clock";
import Controls from "./components/controls";
import Config from "./components/config";
import { ChakraProvider, Box } from "@chakra-ui/react";

function App() {
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
          <Clock />
          <Controls />
          <Config />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
