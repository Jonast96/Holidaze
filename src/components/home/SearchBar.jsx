import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar({ onSearch }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [searchResult, setSearchResult] = useState({
    searchInput: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchResult);
  };

  return (
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
              searchInput: e.target.value,
            }));
          }}
          id="searchInput"
          size="lg"
          type="text"
          placeholder="Search"
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
  );
}
