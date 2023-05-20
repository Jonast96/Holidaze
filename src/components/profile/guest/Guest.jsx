import React from "react";
import ProfileHeader from "../ProfileHeader";
import Button from "react-bootstrap/Button";
import ModifiedVenueCard from "../ModifiedVenueCard";
import Row from "react-bootstrap/Row";

export default function ({ data, editInfo, bookings }) {
  const [upcomingBookings, setUpcomingBookings] = React.useState(true);
  const [expiredBookings, setExpiredBookings] = React.useState(false);

  const todayDate = new Date().toISOString();
  console.log(todayDate);

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
          onClick={() => {
            setUpcomingBookings(true);
            setExpiredBookings(false);
          }}
          className={"leftBtn fs-4 specialBtn w-100"}
          variant={
            upcomingBookings
              ? `primary  fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          Upcoming Bookings
        </Button>
        <Button
          onClick={() => {
            setUpcomingBookings(false);
            setExpiredBookings(true);
          }}
          className={"rightBtn fs-4 specialBtn w-100"}
          variant={
            expiredBookings
              ? `primary  fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          Expired Bookings
        </Button>
      </div>

      <Row className="mt-5">
        {upcomingBookings
          ? bookings.map((booking, index) => {
              if (booking.dateTo > todayDate) {
                return (
                  <ModifiedVenueCard
                    name={booking.venue.name}
                    key={index}
                    img={booking.venue.media}
                    price={booking.venue.price}
                    id={booking.venue.id}
                    location={booking.venue.location}
                    bookingInfo={booking}
                  />
                );
              }
            })
          : bookings.map((booking, index) => {
              if (booking.dateTo < todayDate) {
                return (
                  <ModifiedVenueCard
                    name={booking.venue.name}
                    key={index}
                    img={booking.venue.media}
                    price={booking.venue.price}
                    id={booking.venue.id}
                    location={booking.venue.location}
                    bookingInfo={booking}
                  />
                );
              }
            })}
      </Row>
    </div>
  );
}
