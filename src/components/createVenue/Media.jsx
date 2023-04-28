import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./createVenue.scss";

function Media({ media, setMedia }) {
  const [urlInput, setUrlInput] = useState("");

  function addUrl() {
    if (urlInput !== "") {
      setMedia([...media, urlInput]);
      setUrlInput("");
    }
  }

  function removeUrl(index) {
    const newMediaUrls = [...media];
    newMediaUrls.splice(index, 1);
    setMedia(newMediaUrls);
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
        {media.map((url, index) => (
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
