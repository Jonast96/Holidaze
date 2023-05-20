import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";

import heroImg from "../../assets/media/hero.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Hero({ data, setFilteredData }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showMessage, setShowMessage] = useState(false);

  const [searchResult, setSearchResult] = useState({
    city: "",
    startDate: startDate,
    endDate: endDate,
  });
  useEffect(() => {
    setSearchResult((prevSearchResult) => ({
      ...prevSearchResult,
      startDate,
      endDate,
    }));
  }, [startDate, endDate]);

  function isDateRangeOverlapping(startDate1, endDate1, startDate2, endDate2) {
    return startDate1 < endDate2 && startDate2 < endDate1;
  }

  function handleSearch() {
    const searchStartDate = new Date(searchResult.startDate);
    const searchEndDate = new Date(searchResult.endDate);

    return data.filter((venue) => {
      if (
        !venue.location.city
          .toLowerCase()
          .includes(searchResult.city.toLowerCase())
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleSearch().length === 0) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      console.log(handleSearch().length);
      console.log(handleSearch());
      setFilteredData(handleSearch());
      window.location.hash = "";
      window.location.hash = "featuredVenues";
    }
  };
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

        <Form
          onSubmit={handleSubmit}
          className="booking rounded gap-2 d-flex flex-column flex-md-row align-items-center"
        >
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLocationArrow} />
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                setSearchResult((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }));
              }}
              size="lg"
              type="text"
              placeholder="Country"
            />
          </InputGroup>
          <div className="d-flex flex-row ">
            <DatePicker
              className="date left fs-5"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setSearchResult((prevState) => ({
                  ...prevState,
                  startDate: date,
                }));
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              className="date right fs-5"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setSearchResult((prevState) => ({
                  ...prevState,
                  endDate: date,
                }));
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <button
            type="submit"
            className="btn fs-5 fw-light btn-primary searchButton"
          >
            Search
          </button>
        </Form>
      </div>
    </section>
  );
}
