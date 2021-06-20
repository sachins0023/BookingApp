import Head from "next/head";
import { Flex, Stack } from "@chakra-ui/react";
import Container from "../components/Container";
import DimensionSettings from "../components/DimensionSettings";

const Settings = () => {
  return (
    <Container>
      <Head>
        <title>Theatre Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <DimensionSettings />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Settings;
