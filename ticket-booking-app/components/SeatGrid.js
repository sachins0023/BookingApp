import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import SeatRow from "./SeatRow";
import { TheatreContext } from "./context";

const SeatGrid = ({
  disabledSeats = {},
  updateDisabledSeats,
  rowPrices = {},
  updateRowPrice,
  defaultArrangement,
}) => {
  const { state } = useContext(TheatreContext);
  const { arrangement } = state;
  const usedArrangement = defaultArrangement || arrangement;
  return (
    <Flex justifyContent="center" width="100%" flexDirection="column">
      {Object.values(usedArrangement).map((row) => (
        <SeatRow
          key={`row:${row.id}`}
          id={+row.id}
          seats={[...row.seatsInRow]}
          disabledSeats={disabledSeats[row.id] || []}
          updateDisabledSeats={(rowId, seatId) =>
            updateDisabledSeats(rowId, seatId)
          }
          rowPrice={rowPrices[row.id] || 0}
          updateRowPrice={(rowId, price) => updateRowPrice(rowId, price)}
        />
      ))}
    </Flex>
  );
};

export default SeatGrid;
