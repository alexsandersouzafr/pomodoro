import { ChakraProvider, Box } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function Clock() {
  return (
    <ChakraProvider>
      <CircularProgress
        value={70}
        trackColor="#000099"
        color="#FF6666"
        size="300px"
        thickness="6px"
      >
        <CircularProgressLabel>
          <Box color="white">25:00</Box>
        </CircularProgressLabel>
      </CircularProgress>
    </ChakraProvider>
  );
}

export default Clock;
