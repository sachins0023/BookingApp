import React, { useReducer } from "react";

const initialState = {
  numberOfRows: 4,
  numberOfColumns: 8,
};
export const getResetArrangement = (rows, columns) => {
  const newArrangement = {};
  Array.from({ length: rows }, (_, i) => i + 1).forEach((row) => {
    newArrangement[row] = {
      id: row,
      seatsInRow: Array.from({ length: columns }, (_, i) => i + 1).map(
        (column) => ({
          id: rows * row + column,
          occupied: false,
          selected: false,
          disabled: false,
        })
      ),
      price: 100 + (row - 1) * 10,
    };
  });
  return newArrangement;
};
initialState.arrangement = getResetArrangement(
  initialState.numberOfRows,
  initialState.numberOfColumns
);

export const TheatreContext = React.createContext();

const setSeatStructure = (prevArrangement, rowId, seatId) => {
  const newArrangement = { ...prevArrangement };
  const newSeatsInRow = Object.values(newArrangement)
    .find((row) => row.id === rowId)
    .seatsInRow.map((seat) => {
      if (seat.id === seatId) {
        return { ...seat, selected: !seat.selected };
      } else {
        return seat;
      }
    });
  newArrangement[rowId] = {
    ...newArrangement[rowId],
    seatsInRow: newSeatsInRow,
  };
  return { arrangement: newArrangement };
};

const resetSeats = (prevArrangement) => {
  const newArrangement = { ...prevArrangement };
  Object.values(newArrangement).forEach((row) => {
    newArrangement[row.id] = {
      ...newArrangement[row.id],
      seatsInRow: row.seatsInRow.map((seat) => {
        if (seat.selected) {
          let newSeat = { ...seat, selected: false };
          return newSeat;
        } else {
          return seat;
        }
      }),
    };
  });
  return { arrangement: newArrangement };
};

const deepUpdateArrangement = (arrangement, disabledSeats, rowPrices) => {
  const newArrangement = { ...arrangement };
  Object.values(newArrangement).forEach((row) => {
    newArrangement[row.id] = {
      ...newArrangement[row.id],
      seatsInRow: row.seatsInRow.map((seat) =>
        (disabledSeats[row.id] || []).includes(seat.id)
          ? { ...seat, disabled: true }
          : { ...seat }
      ),
      price: rowPrices[row.id] || 0,
    };
  });
  return newArrangement;
};

const convertSelectedToOccupied = (prevArrangement) => {
  const newArrangement = { ...prevArrangement };
  Object.values(newArrangement).forEach((row) => {
    newArrangement[row.id] = {
      ...newArrangement[row.id],
      seatsInRow: row.seatsInRow.map((seat) => {
        if (seat.selected) {
          let newSeat = { ...seat, selected: false, occupied: true };
          return newSeat;
        } else {
          return seat;
        }
      }),
    };
  });
  return { arrangement: newArrangement };
};

export const SEAT_CLICK = "SEAT_CLICK";
export const SETTINGS_UPDATE = "SETTINGS_UPDATE";
export const RESET_SEATS = "RESET_SEATS";
export const CONVERT_TO_OCCUPIED = "CONVERT_TO_OCCUPIED";

const reducer = (state, action) => {
  switch (action.type) {
    case SEAT_CLICK:
      return {
        ...state,
        ...setSeatStructure(state.arrangement, action.rowId, action.seatId),
      };
    case SETTINGS_UPDATE:
      return {
        ...state,
        arrangement: deepUpdateArrangement(
          action.arrangement,
          action.disabledSeats,
          action.rowPrices
        ),
        numberOfRows: Object.keys(action.arrangement).length,
        numberOfColumns: Object.values(action.arrangement)[0]
          ? Object.values(action.arrangement)[0].seatsInRow.length
          : 0,
      };
    case RESET_SEATS:
      return {
        ...state,
        ...resetSeats(state.arrangement),
      };
    case CONVERT_TO_OCCUPIED:
      return {
        ...state,
        ...convertSelectedToOccupied(state.arrangement),
      };
    default:
      return state;
  }
};

const TheatreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TheatreContext.Provider value={{ state, dispatch }}>
      {children}
    </TheatreContext.Provider>
  );
};

export default TheatreProvider;
