import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Summary from "./components/Summary";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [summary, setSummary] = useState("");
  return (
    <div className=" text-center ">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home showSummary={(sumry) => setSummary(sumry)} />}
        />
        <Route path="/summary" element={<Summary summary={summary} />} />
      </Routes>
      <br />
      <hr />
    </div>
  );
}

export default App;
