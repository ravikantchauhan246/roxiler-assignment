import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div>Hello, This is Ravikant Chauhan</div>
    </>
  );
}

export default App;
