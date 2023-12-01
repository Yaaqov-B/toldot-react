import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Show from "./components/show";
import Create from "./components/create";
import About from "./components/about";
import Bibliography from "./components/bibliography";

const App = () => {
  return (
      <div dir={'rtl'} lang={'he'} >
        <Navbar />
        <div style={{ margin: 20 }} className={'text-right'}>
          <Routes>
            <Route exact path="/" element={<RecordList />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/bibliography" element={<Bibliography />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
