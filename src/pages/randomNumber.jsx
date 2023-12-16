import React, { useState } from "react";

function RandomNumber() {
  const [randomYear, setRandomYear] = useState(null);

  const generateRandomYear = () => {
    const minYear = 1900;
    const maxYear = 2023;
    const randomYear =
      Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    setRandomYear(randomYear);
  };

  return (
    <div>
      <h1>Random Year Generator</h1>
      <button onClick={generateRandomYear}>Generate Random Year</button>
      {randomYear && <div>Random Year: {randomYear}</div>}
    </div>
  );
}

export default RandomNumber;
