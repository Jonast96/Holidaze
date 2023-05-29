import Guest from ".././guest//Guest";
import ProfileHeader from "../ProfileHeader";
import React from "react";
import Button from "react-bootstrap/Button";
import "../profile.scss";
import Row from "react-bootstrap/Row";
import ModifiedVenueCard from "..//ModifiedVenueCard";
import VenueCard from "../..//VenueCard";
import noImg from "../..//../assets/media/no-photo.png";

/**
 * The anonymous functional component represents a user's profile page with user's bookings and hosted venues.
 * It displays 'upcoming', 'expired' bookings and 'hosted venues' and allows the user to switch between them.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The user's profile data.
 * @param {function} props.editInfo - Function to edit user's info.
 * @param {Array} props.bookings - Array of bookings of the user.
 * @param {Array} props.venues - Array of venues hosted by the user.
 *
 * @example
 * return (
 *   <AnonymousComponent data={userData} editInfo={handleEditInfo} bookings={userBookings} venues={userVenues} />
 * );
 *
 * @returns {ReactElement} A section of the profile page showcasing user's bookings and hosted venues.
 */
export default function ({ data, editInfo, bookings, venues }) {
  const [upcomingBookings, setUpcomingBookings] = React.useState(true);
  const [expiredBookings, setExpiredBookings] = React.useState(false);
  const [myVenues, setMyVenues] = React.useState(false);

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
          title={"Manage your bookings and venues"}
          description={
            "With Holidaze, control your hosting experience. Manage bookings, share reviews, and adjust your venues as needed. Your feedback informs the host community and perfects your venue's presence. Embrace your hosting journey."
          }
          user={data}
          editInfo={editInfo}
        />
      </div>
      <div className="mt-5 d-flex  ">
        <Button
          onClick={() => {
            setUpcomingBookings(true);
            setExpiredBookings(false);
            setMyVenues(false);
          }}
          className={"leftBtn fs-6 specialBtn w-100"}
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
            setMyVenues(false);
            setExpiredBookings(true);
          }}
          className={"middleButton fs-6 specialBtn w-100"}
          variant={
            expiredBookings
              ? `primary  fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          Expired Bookings
        </Button>
        <Button
          onClick={() => {
            setUpcomingBookings(false);
            setExpiredBookings(false);
            setMyVenues(true);
          }}
          className={"rightBtn fs-6 specialBtn w-100"}
          variant={
            myVenues
              ? `primary fw-light w-100`
              : `outline-primary text-black fw-light w-100`
          }
        >
          My Venues
        </Button>
      </div>
      <Row className="mt-5">
        {(() => {
          if (upcomingBookings) {
            return bookings.map((booking, index) => {
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
              return null;
            });
          } else if (myVenues) {
            return venues.map((venue) => {
              return (
                <VenueCard
                  name={venue.name}
                  key={venue.id}
                  img={venue.media}
                  placeholder={noImg}
                  price={venue.price}
                  id={venue.id}
                  location={venue.location}
                />
              );
            });
          } else {
            return bookings.map((booking, index) => {
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
              return null;
            });
          }
        })()}
      </Row>
    </div>
  );
}
