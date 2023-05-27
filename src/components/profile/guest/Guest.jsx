import React from "react";
import ProfileHeader from "../ProfileHeader";
import Button from "react-bootstrap/Button";
import ModifiedVenueCard from "../ModifiedVenueCard";
import Row from "react-bootstrap/Row";

/**
 * The anonymous functional component represents a user's profile page with user's bookings.
 * It shows either 'upcoming' or 'expired' bookings and allows the user to switch between them.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The user's profile data.
 * @param {function} props.editInfo - Function to edit user's info.
 * @param {Array} props.bookings - Array of bookings of the user.
 *
 * @example
 * return (
 *   <AnonymousComponent data={userData} editInfo={handleEditInfo} bookings={userBookings} />
 * );
 *
 * @returns {ReactElement} A section of the profile page showcasing user's bookings.
 */
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
            "Stay on top of your venue rentals with Holidaze. Here, you have the ability to overview the specifics of your upcoming and past bookings. For any changes to your upcoming bookings, please contact us directly. Once your booking has expired, we encourage you to leave reviews and share your experiences. This helps fellow venue owners understand and make informed decisions."
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
