// import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import AnimatedText from 'react-animated-text-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './Summarization/Index';
import Navbarr from './Navbar/Nabvarr';
import AboutUs from './AboutUs/AboutUs';
import TextAnimation from './Animations/TextAnimation';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div classNameName="font-monospace">
      <BrowserRouter>
        <Navbarr></Navbarr>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/Summary" element={<Index />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>

      <br /><br /><br /><br />
      <TextAnimation
          text={"© Automatic Text Summarization, 2023"}
          textTag = "h7"
        ></TextAnimation>
    </div>
  );
}

export default App;
