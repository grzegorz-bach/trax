import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactElement | ReactElement[];
};

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        Player
      </Box>
    </Box>
  );
};

export default PlayerLayout;