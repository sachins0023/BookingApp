import { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Heading, Flex, Stack, Button, Link, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import SeatGrid from "../components/SeatGrid";
import { TheatreContext } from "../components/context";

const Booking = () => {
  const { state } = useContext(TheatreContext);
  const { arrangement } = state;
  const disabledSeatsMap = {};
  Object.values(arrangement).forEach((row) => {
    disabledSeatsMap[row.id] = row.seatsInRow
      .filter((seat) => seat.disabled)
      .map((seat) => seat.id);
  });

  const rowPriceMap = {};
  Object.values(arrangement).forEach((row) => {
    rowPriceMap[row.id] = row.price;
  });

  let totalCost = 0;
  let totalSeats = 0;
  Object.values(arrangement).forEach((row) => {
    totalSeats += row.seatsInRow.filter((seat) => seat.selected).length;
    totalCost +=
      row.seatsInRow.filter((seat) => seat.selected).length * row.price;
  });
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
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Heading mb={2} size="lg">
            Please Select your seats
          </Heading>
          <SeatGrid disabledSeats={disabledSeatsMap} rowPrices={rowPriceMap} />
          <Text mt={2} mb={2} size="lg">
            Hi, You have selected {totalSeats} seats and the total cost is ${" "}
            {totalCost}
          </Text>
          <NextLink href="/checkout" passHref>
            <Link>
              <Button mt={4} colorScheme="teal">
                Book
              </Button>
            </Link>
          </NextLink>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Booking;
