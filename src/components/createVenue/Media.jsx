import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createVenue.scss";

function Media({ mediaUrls, setMediaUrls }) {
  const [urlInput, setUrlInput] = useState("");

  function addUrl() {
    if (urlInput !== "") {
      setMediaUrls([...mediaUrls, urlInput]);
      setUrlInput("");
    }
  }

  function removeUrl(index) {
    const newMediaUrls = [...mediaUrls];
    newMediaUrls.splice(index, 1);
    setMediaUrls(newMediaUrls);
  }

  return (
    <div className="media">
      <h4>Media Upload</h4>
      <Form.Group controlId="urlInput">
        <Form.Label className="p-0 m-0">Photo URL</Form.Label>
        <Form.Control
          className="mb-2"
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL"
        />
      </Form.Group>
      <Button onClick={addUrl}>Add URL</Button>
      <div className="d-flex flex-wrap justify-content-center">
        {mediaUrls.map((url, index) => (
          <div className="text-center" key={index}>
            <div>
              <img className="img-thumbnail " src={url} alt={url} />
            </div>
            <Button
              className="text-center"
              variant="dark"
              size="sm"
              onClick={() => removeUrl(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Media;
