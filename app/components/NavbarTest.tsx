import { useState, useEffect } from "react";

export default function NavbarTest() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Initiale Zeit setzen
    setTime(new Date().toLocaleTimeString());

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar w-full h-40 flex place-items-center justify-center shadow-customShadow rounded-md">
      <div className="navbar_elements flex text-3xl font-bold">
        <span className="pr-2">Time: </span>
        <span>{time}</span>
      </div>
    </div>
  );
}
