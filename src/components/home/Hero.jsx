import heroImg from "../../assets/media/hero.jpg";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Hero({ data, setFilteredData }) {
  const [showMessage, setShowMessage] = useState(false);

  function isDateRangeOverlapping(startDate1, endDate1, startDate2, endDate2) {
    return startDate1 < endDate2 && startDate2 < endDate1;
  }

  function handleSearch(searchResult) {
    const searchStartDate = new Date(searchResult.startDate);
    const searchEndDate = new Date(searchResult.endDate);

    const results = data.filter((venue) => {
      if (
        !venue.location.city ||
        !venue.location.country ||
        !venue.name
          .toLowerCase()
          .includes(searchResult.searchInput.toLowerCase())
      ) {
        return false;
      }

      const hasOverlappingBooking = venue.bookings.some((booking) => {
        const bookingStartDate = new Date(booking.dateFrom);
        const bookingEndDate = new Date(booking.dateTo);

        return isDateRangeOverlapping(
          searchStartDate,
          searchEndDate,
          bookingStartDate,
          bookingEndDate
        );
      });

      return !hasOverlappingBooking;
    });

    if (results.length === 0) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      console.log(results.length);
      console.log(results);
      setFilteredData(results);
      window.location.hash = "";
      window.location.hash = "featuredVenues";
    }
  }

  return (
    <section className="position-relative mt-5 mainHero ">
      <img className="img-fluid" src={heroImg} alt="" />
      <div className="overlay"></div>
      <div className="hero-center p-3">
        <h1 className="fw-light ">Your home, away from home</h1>
        {showMessage && (
          <div className=" fs-4 text-danger mt-3 noSearchResults rounded">
            No matches for this result.
          </div>
        )}

        <SearchBar onSearch={handleSearch} />
      </div>
    </section>
  );
}
