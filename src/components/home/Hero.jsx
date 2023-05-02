import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import _ from "lodash";

import heroImg from "../../assets/media/hero.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Hero(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchResult, setSearchResult] = useState({});

  const handleChange = _.debounce((value) => {
    setSearchResult((prevState) => ({ ...prevState, city: value }));
  }, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchResult);
  };

  console.log(props.data);

  return (
    <section className="position-relative mt-5 mainHero ">
      <img className="img-fluid" src={heroImg} alt="" />
      <div className="overlay"></div>
      <div className="hero-center p-3">
        <h1 className="fw-light ">Your home, away from home</h1>

        <Form
          onSubmit={handleSubmit}
          className="booking rounded gap-2 d-flex flex-column flex-md-row align-items-center"
        >
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLocationArrow} />
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => handleChange(e.target.value)}
              size="lg"
              type="text"
              placeholder="Country"
            />
          </InputGroup>
          <div className="d-flex flex-row ">
            <DatePicker
              className="form-control fs-5"
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
              className="form-control fs-5"
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
            onClick={() => console.log(searchResult)}
            className="btn btn-primary"
          >
            Search
          </button>
        </Form>
      </div>
    </section>
  );
}
