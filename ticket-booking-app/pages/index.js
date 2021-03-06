import Head from "next/head";
import NextLink from "next/link";
import { Heading, Flex, Stack, Button, Link } from "@chakra-ui/react";
import Container from "../components/Container";

const Home = () => {
  return (
    <Container>
      <Head>
        <title>Ticket Booking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        w="700px"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading mb={2}>Welcome to the Theatre booking app</Heading>
          <NextLink href="/booking" passHref>
            <Link>
              <Button mt={4} colorScheme="teal">
                Book Seats
              </Button>
            </Link>
          </NextLink>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
