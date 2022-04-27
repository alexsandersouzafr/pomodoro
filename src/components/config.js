import { ChakraProvider, Grid, GridItem, Center, Box } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

function Config() {
  return (
    <ChakraProvider>
      <Center>
        <Box p={5} color="white">
          <Grid w="200px" templateColumns="repeat(3, 1fr)">
            <GridItem>
              25
              <br />
              work
            </GridItem>
            <GridItem>
              <Center><FaCog color="white" /></Center>
            </GridItem>
            <GridItem>
              5<br />
              break
            </GridItem>
          </Grid>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default Config;
