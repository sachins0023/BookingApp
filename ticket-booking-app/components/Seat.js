import { useRouter } from "next/router";
import EventSeatOutlinedIcon from "@material-ui/icons/EventSeatOutlined";
import EventSeatIcon from "@material-ui/icons/EventSeat";

const Seat = ({ id, selected, occupied, disabled, onClick }) => {
  const router = useRouter();
  const isSettings = router.asPath === "/settings";
  let SeatIcon = EventSeatOutlinedIcon;
  const seatStyles = {
    color: "white",
    margin: 20,
    cursor: "pointer",
  };
  if (selected) {
    SeatIcon = EventSeatIcon;
    seatStyles.color = "green";
  } else if (occupied) {
    SeatIcon = EventSeatIcon;
    seatStyles.color = "white";
    if (!isSettings) {
      seatStyles.cursor = "not-allowed";
    }
  } else if (disabled) {
    SeatIcon = EventSeatIcon;
    seatStyles.color = "grey";
    if (!isSettings) {
      seatStyles.cursor = "not-allowed";
    }
  }
  return (
    <SeatIcon
      style={seatStyles}
      onClick={(e) =>
        isSettings || (!occupied && !disabled) ? onClick(id) : null
      }
    />
  );
};

export default Seat;
