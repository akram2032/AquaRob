import Box from "@mui/material/Box";
import Navbar from "./topbar-et-sidbar/topbar";
const Bar = ({indice, handleChange, total, isDevice}) => {
  return (
    <div>
      <Box>
        <Navbar handleChange={handleChange} indice={indice} total={total} isDevice={isDevice}/>
      </Box>
    </div>
  );
};

export default Bar;
