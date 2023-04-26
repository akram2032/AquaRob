import React, { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const ScrollBtn = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
    }else setHasScrolled(false)
  };
  
  const scrollHandle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  window.addEventListener("scroll", handleScroll);
  
  const Btn = () => {
    return (
      <button className="button" id="scrollbtn" onClick={scrollHandle}>
        <ArrowUpwardIcon />
      </button>
    );
  };
  
  return (
    <>
      {hasScrolled && <Btn />}
    </>
  );
};

export default ScrollBtn;
