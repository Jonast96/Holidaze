import React from "react";
import ProfileHeader from "../ProfileHeader";
import Button from "react-bootstrap/Button";

export default function ({ data }) {
  //active is used to toggle between upcoming and expired bookings where active is true for upcoming and false for expired
  const [active, setActive] = React.useState(true);

  function logOut() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="profile">
      <div>
        <ProfileHeader
          logout={logOut}
          image={data.image}
          title={"Your stays"}
          description={
            "Stay in control of your travel plans with Holidaze. Here, you can review the details of your upcoming and previous stays. Need to make any changes or cancel a booking? Simply click the 'Manage Booking' button for upcoming stays. For previous stays, feel free to leave reviews and share your experiences to help fellow travelers make informed decisions."
          }
          user={data}
        />
      </div>

      <div className="text-center mt-5">
        <Button
          onClick={() => setActive(!active)}
          className={
            active
              ? "leftBtn fs-4 text-white specialBtn"
              : "leftBtn fs-4 specialBtn"
          }
          variant={
            active
              ? `primary text-black fw-light`
              : `outline-primary text-black fw-light`
          }
        >
          Upcoming Bookings
        </Button>
        <Button
          onClick={() => setActive(!active)}
          className={
            !active
              ? "rightBtn fs-4 text-white specialBtn"
              : "rightBtn fs-4 specialBtn"
          }
          variant={
            !active
              ? `primary text-black fw-light`
              : `outline-primary text-black fw-light`
          }
        >
          Expired Bookings
        </Button>
      </div>
    </div>
  );
}
