import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Scissors } from "react-bootstrap-icons";

import _ from "lodash";

import kiss1 from "./resources/kiss1.m4a";
import kiss2 from "./resources/kiss2.m4a";
import kiss3 from "./resources/kiss3.m4a";
import kiss4 from "./resources/kiss4.m4a";
import kiss5 from "./resources/kiss5.m4a";
import kiss6 from "./resources/kiss6.m4a";
import kiss7 from "./resources/kiss7.m4a";
import kiss8 from "./resources/kiss8.m4a";

const audios = [kiss1, kiss2, kiss3, kiss4, kiss5, kiss6, kiss7, kiss8];

function playRandomAudio() {
  const pick = Math.floor((Math.random() * 100) % audios.length);
  return new Audio(audios[pick]).play();
}

function RatioTool() {
  const [originalRatio, setOriginalRatio] = useState(1000);
  const [newRawRatio, setNewRawRatio] = useState(50);
  const [copied, setCopied] = useState(false);
  const numZeros = useMemo(
    () =>
      Array.from(String(originalRatio))
        .reverse()
        .findIndex((v) => v !== "0"),
    [originalRatio, newRawRatio]
  );
  const newRawSnappedRatio = useMemo(
    () => (originalRatio / Number(newRawRatio)) * 100,
    [originalRatio, newRawRatio]
  );
  const numUsedZeros = useMemo(() => {
    const numDigits = String(_.round(newRawSnappedRatio)).length;
    return Math.min(numZeros, numDigits - 1);
  }, [newRawSnappedRatio, numZeros]);
  const finalSnappedRatio = useMemo(
    () => _.round(newRawSnappedRatio, -numUsedZeros),
    [newRawSnappedRatio, numUsedZeros]
  );
  const answer = useMemo(
    () => _.round((originalRatio / finalSnappedRatio) * 100, 4),
    [originalRatio, finalSnappedRatio]
  );
  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    playRandomAudio();
  };

  useEffect(() => {
    setCopied(false);
  }, [answer]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>幾比幾～？</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>1 : </InputGroup.Text>
          <Form.Control
            value={originalRatio}
            onChange={(v) => setOriginalRatio(v.target.value)}
            type="number"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>想縮放</InputGroup.Text>
          <Form.Control
            value={newRawRatio}
            onChange={(v) => setNewRawRatio(v.target.value)}
            type="number"
          />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">會變成</InputGroup.Text>
          <InputGroup.Text id="basic-addon1">
            {Number.isFinite(newRawSnappedRatio)
              ? `1 : ${newRawSnappedRatio}`
              : ""}
          </InputGroup.Text>
        </InputGroup>
        <hr />
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">要變成</InputGroup.Text>
          <InputGroup.Text id="basic-addon1">
            {Number.isFinite(finalSnappedRatio)
              ? `1 : ${finalSnappedRatio}`
              : ""}
          </InputGroup.Text>
          <InputGroup.Text id="basic-addon1">的話</InputGroup.Text>
        </InputGroup>
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text>應該縮放</InputGroup.Text>
          <InputGroup.Text>
            <b>{answer || ""}</b>
          </InputGroup.Text>
          <InputGroup.Text style={{ cursor: "pointer" }} onClick={handleCopy}>
            <Scissors /> {copied ? "(已複製)" : ""}
          </InputGroup.Text>
        </InputGroup>
      </Modal.Body>
    </>
  );
}

function App() {
  const [isActive, setActive] = useState(false);
  const handleHeartClick = () => {
    playRandomAudio();
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 1000);
  };
  const classNames = ["heart", isActive ? "heart-active" : ""];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className={classNames.join(" ")} onClick={handleHeartClick}></div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          幾比幾～？
        </Button>
        <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
          <RatioTool />
        </Modal>

        <div className="made-for">Made for my love Janna</div>
      </header>
    </div>
  );
}

export default App;
