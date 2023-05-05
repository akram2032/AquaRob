import Box from "@mui/material/Box";
import Navbar from "./topbar-et-sidbar/topbar";

const Bar = ({setSessionKey, indice, handleChange, total, isDevice}) => {
    return (
        <div>
            <Box>
                <Navbar setSessionKey={setSessionKey} handleChange={handleChange} indice={indice} total={total}
                        isDevice={isDevice}/>
            </Box>
        </div>
    );
};

export default Bar;
