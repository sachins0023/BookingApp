import { useState, useContext } from "react";
import { Flex, Input, Button, Box, useToast } from "@chakra-ui/react";
import {
  TheatreContext,
  SETTINGS_UPDATE,
  getResetArrangement,
} from "./context";
import SeatGrid from "./SeatGrid";

const DimensionSettings = () => {
  const { state, dispatch } = useContext(TheatreContext);
  const [arrangement, setArrangement] = useState(state.arrangement);
  const [numberOfRows, setNumberOfRows] = useState(state.numberOfRows);
  const [numberOfColumns, setNumberOfColumns] = useState(state.numberOfColumns);
  const toast = useToast();

  const deepUpdateArrangement = (rows, columns) => {
    const newArrangement = {
      ...getResetArrangement(rows, columns),
    };
    Object.values(newArrangement).forEach((row) => {
      newArrangement[row.id] = {
        ...newArrangement[row.id],
        seatsInRow: row.seatsInRow.map((seat) => ({ ...seat })),
      };
    });
    return newArrangement;
  };

  const updateDimensions = (value, type) => {
    let newValue = value;
    if (value > 20) {
      newValue = 20;
      toast({
        title: "Number greater than 20.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    let newArrangement;
    if (type === "column") {
      setNumberOfColumns(newValue);
      newArrangement = deepUpdateArrangement(numberOfRows, newValue);
    } else {
      setNumberOfRows(newValue);
      newArrangement = deepUpdateArrangement(newValue, numberOfColumns);
    }
    setArrangement(newArrangement);
    const disabledSeatsMap = {};
    Object.values(newArrangement).forEach((row) => {
      disabledSeatsMap[row.id] = row.seatsInRow
        .filter((seat) => seat.disabled)
        .map((seat) => seat.id);
    });
    setDisabledSeats(disabledSeatsMap);
  };

  const disabledSeatsMap = {};
  Object.values(arrangement).forEach((row) => {
    disabledSeatsMap[row.id] = row.seatsInRow
      .filter((seat) => seat.disabled)
      .map((seat) => seat.id);
  });
  const [disabledSeats, setDisabledSeats] = useState(disabledSeatsMap);

  const rowPriceMap = {};
  Object.values(arrangement).forEach((row) => {
    rowPriceMap[row.id] = row.price;
  });
  const [rowPrices, setRowPrices] = useState(rowPriceMap);

  const updateDisabledSeats = (rowId, seatId) => {
    setDisabledSeats((prevDisabledSeats) => {
      let newDisabledSeats = { ...prevDisabledSeats };
      let newDisabledSeatsRow = prevDisabledSeats[rowId]
        ? [...prevDisabledSeats[rowId]]
        : [];
      if (newDisabledSeatsRow.includes(seatId)) {
        newDisabledSeatsRow = newDisabledSeatsRow.filter(
          (sId) => sId !== seatId
        );
      } else {
        newDisabledSeatsRow.push(seatId);
      }
      newDisabledSeats[rowId] = [...newDisabledSeatsRow];
      return newDisabledSeats;
    });
  };

  const updateRowPrice = (rowId, price) => {
    setRowPrices((prevRowPrices) => {
      let newRowPrices = { ...prevRowPrices };
      newRowPrices[rowId] = price;
      return newRowPrices;
    });
  };

  const handleSubmit = () => {
    dispatch({
      type: SETTINGS_UPDATE,
      arrangement,
      disabledSeats,
      rowPrices,
    });
    toast({
      title: "Seats updated successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex marginBottom="24px" justifyContent="center">
        <Flex>
          <Flex>Number of rows</Flex>
          <Input
            id="rows"
            placeholder="Enter number of rows"
            type="number"
            value={numberOfRows}
            onChange={(e) => updateDimensions(+e.target.value, "row")}
          />
        </Flex>
        &emsp;
        <Flex>
          <Flex>Number of columns</Flex>
          <Input
            id="columns"
            placeholder="Enter number of columns"
            type="number"
            value={numberOfColumns}
            onChange={(e) => updateDimensions(+e.target.value, "column")}
          />
        </Flex>
      </Flex>
      <SeatGrid
        defaultArrangement={arrangement}
        disabledSeats={disabledSeats}
        updateDisabledSeats={updateDisabledSeats}
        rowPrices={rowPrices}
        updateRowPrice={updateRowPrice}
      />
      <Flex>
        <Button mt={4} ml={10} colorScheme="teal" onClick={handleSubmit}>
          Update
        </Button>
      </Flex>
    </Box>
  );
};

export default DimensionSettings;
