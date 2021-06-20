import { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Link,
  useToast,
} from "@chakra-ui/react";
import Container from "../components/Container";
import {
  TheatreContext,
  RESET_SEATS,
  CONVERT_TO_OCCUPIED,
} from "../components/context";
import Timer from "../components/Timer";

const Checkout = () => {
  const toast = useToast();

  const router = useRouter();

  const { colorMode } = useColorMode();
  const [timerExpired, setTimerExpired] = useState(false);
  const colorSecondary = {
    light: "gray.700",
    dark: "gray.400",
  };
  const { state, dispatch } = useContext(TheatreContext);
  const { arrangement } = state;
  let totalCost = 0;
  let totalSeats = 0;
  Object.values(arrangement).forEach((row) => {
    totalSeats += row.seatsInRow.filter((seat) => seat.selected).length;
    totalCost +=
      row.seatsInRow.filter((seat) => seat.selected).length * row.price;
  });

  const handleResetSeats = () => {
    dispatch({ type: RESET_SEATS });
    setTimerExpired(true);
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Seats booked",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    dispatch({ type: CONVERT_TO_OCCUPIED });
    router.push("/");
  };

  return (
    <Container>
      <Head>
        <title>Checkout</title>
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
          {timerExpired ? (
            <Heading mb={2} size="lg">
              Your selected seats are reset
            </Heading>
          ) : (
            <Heading mb={2} size="lg">
              Hi, You have selected {totalSeats} seats and the total cost is ${" "}
              {totalCost}
            </Heading>
          )}
          <Flex>
            <Text color={colorSecondary[colorMode]}>
              Please choose an action!
            </Text>
            &ensp;
            {timerExpired || !totalSeats ? (
              ""
            ) : (
              <Flex>
                <Text color={colorSecondary[colorMode]}>
                  (Your selected seats will be reset in
                </Text>
                &nbsp;
                <Timer seconds={300} handleResetSeats={handleResetSeats} />
                &nbsp;
                <Text color={colorSecondary[colorMode]}>seconds)</Text>
              </Flex>
            )}
          </Flex>
          <Flex>
            <NextLink href="/booking" passHref>
              <Link>
                <Button mt={4} colorScheme="teal">
                  Back
                </Button>
              </Link>
            </NextLink>
            &ensp;
            <Link>
              <Button
                mt={4}
                colorScheme="teal"
                disabled={timerExpired || !totalSeats}
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Checkout;
