import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Button = ({ number, handleClick }) => {
  function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const [left, setLeft] = useState(rand(350));
  const [top, setTop] = useState(rand(550));
  const [x, setX] = useState(rand(2));
  const [y, setY] = useState(rand(2));
  const speed = 2;


  useInterval(() => {
    if (x) {
      setLeft(left + 1);
    } else {
      setLeft(left - 1);
    }
    if (left === 350) {
      setX(false);
    }
    if (left === 0) {
      setX(true);
    }
    if (y) {
      setTop(top + 1);
    } else {
      setTop(top - 1);
    }
    if (top === 550) {
      setY(false);
    }
    if (top === 0) {
      setY(true);
    }
  }, 10);

  const button = {
    top: top,
    left: left,
  };
  return <button style={button} onClick={() => handleClick(number)}>{number}</button>;
};

function App() {
  const [phone, setPhone] = useState('');
  const handleClick = (n) => {
    setPhone(phone + n);
  }
  const box = {
    margin: `0 auto`,
    width: `400px`,
    height: `600px`,
    border: `2px solid black`,
    position: `relative`
  };
  return (
    <div className="App">
      <main>
        <p>Enter your phone number</p>
        <h1 style={{height: 40}}>{phone}</h1>
        <h3 onClick={() => setPhone('')}>Clear</h3>
        <div style={box}>
          {[0,1,2,3,4,5,6,7,8,9].map((number, i) => {
            return <Button key={i} number={number} handleClick={handleClick} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
