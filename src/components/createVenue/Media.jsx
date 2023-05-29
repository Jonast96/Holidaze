import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import "./createVenue.scss";

/**
 * The `Media` functional component allows users to handle media upload through URLs.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.media - An array of media URLs.
 * @param {Function} props.setMedia - A function to set the media array.
 *
 * @example
 * const media = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"];
 * const setMedia = newMedia => console.log(newMedia);
 * return (
 *   <Media media={media} setMedia={setMedia} />
 * );
 *
 * @returns {ReactElement} The `Media` component, a form for handling media upload through URLs.
 */
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

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter URL"
          />
          <Button onClick={addUrl}>
            <FontAwesomeIcon icon={faAdd} />
          </Button>
        </InputGroup>
      </Form.Group>
      <div className="d-flex flex-wrap justify-content-center">
        {media.map((url, index) => (
          <div className="text-center" key={index}>
            <div className="mb-2 addImagePreviewContainer">
              <img className="img-thumbnail" src={url} alt={url} />
              <Button
                className="text-center addImagePreviewButton"
                variant="dark"
                size="sm"
                onClick={() => removeUrl(index)}
              >
                <FontAwesomeIcon icon={faRemove} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Media;
