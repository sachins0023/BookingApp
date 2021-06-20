import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Flex, Input, Divider, Text } from "@chakra-ui/react";
import Seat from "./Seat";
import { TheatreContext, SEAT_CLICK } from "./context";

const SeatRow = ({
  id,
  seats,
  disabledSeats = [],
  updateDisabledSeats,
  rowPrice,
  updateRowPrice,
}) => {
  const router = useRouter();
  const isSettings = router.asPath === "/settings";
  const { dispatch } = useContext(TheatreContext);

  const onSeatClick = (seatId) => {
    if (isSettings) {
      updateDisabledSeats(id, seatId);
    } else {
      dispatch({ type: SEAT_CLICK, rowId: id, seatId });
    }
  };

  const updateSeatPrice = (value) => {
    updateRowPrice(id, value);
  };

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="row">
        {seats.map(({ ...seat }) => (
          <Seat
            key={`seat:${seat.id},${seat.occupied}`}
            id={seat.id}
            selected={seat.selected}
            occupied={seat.occupied}
            disabled={disabledSeats.includes(seat.id)}
            onClick={onSeatClick}
          />
        ))}
      </Flex>
      <Divider
        style={{ minHeight: "60px", marginRight: "10px" }}
        orientation="vertical"
      />
      <Flex alignItems="center">
        <Flex textAlign="center">Price:</Flex>
        &ensp;
        {isSettings ? (
          <Input
            id="rows"
            placeholder="Enter price of row"
            type="number"
            value={rowPrice}
            onChange={(e) => updateSeatPrice(+e.target.value)}
            disabled={!isSettings}
          />
        ) : (
          <Text>$ {rowPrice}</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default SeatRow;
