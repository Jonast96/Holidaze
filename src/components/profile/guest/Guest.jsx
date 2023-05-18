import React from "react";
import ProfileHeader from "../ProfileHeader";
import Button from "react-bootstrap/Button";
import VenueCard from "../..//VenueCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ({ data, editInfo, bookings }) {
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
          image={data.avatar}
          title={"Your stays"}
          description={
            "Stay in control of your travel plans with Holidaze. Here, you can review the details of your upcoming and previous stays. Need to make any changes or cancel a booking? Simply click the 'Manage Booking' button for upcoming stays. For previous stays, feel free to leave reviews and share your experiences to help fellow travelers make informed decisions."
          }
          user={data}
          editInfo={editInfo}
        />
      </div>

      <div className="text-center mt-5 d-flex">
        <Button
          onClick={() => setActive(!active)}
          className={
            active
              ? "leftBtn fs-4 text-white specialBtn w-100"
              : "leftBtn fs-4 specialBtn w-100"
          }
          variant={
            active
              ? `primary text-black fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          Upcoming Bookings
        </Button>
        <Button
          onClick={() => setActive(!active)}
          className={
            !active
              ? "rightBtn fs-4 text-white specialBtn w-100"
              : "rightBtn fs-4 specialBtn w-100"
          }
          variant={
            !active
              ? `primary text-black fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          Expired Bookings
        </Button>
      </div>
      <Row className="mt-5">
        {bookings.map((booking, index) => {
          return (
            <VenueCard
              name={booking.venue.name}
              key={index}
              img={booking.venue.media}
              price={booking.venue.price}
              id={booking.venue.id}
              location={booking.venue.location}
            />
          );
        })}
      </Row>
    </div>
  );
}
