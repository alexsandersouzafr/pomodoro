import { FaPlay, FaRedo } from "react-icons/fa";
import { ChakraProvider, Grid, GridItem, Center } from "@chakra-ui/react";

function Controls() {
  return (
    <ChakraProvider>
      <Center>
        <Grid w="100px" templateColumns="repeat(2, 1fr)">
          <Center>
            <FaPlay color="white"/>
          </Center>
          <Center>
            <FaRedo color="white"/>
          </Center>
        </Grid>
      </Center>
    </ChakraProvider>
  );
}

export default Controls;
