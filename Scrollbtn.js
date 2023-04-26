import React {useState} from "react"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


const ScrollBtn = () => {
    const [hasScorlled, setHasScrolled] = useState(false)
    const handleScroll = () => {
        if (window.scrollY > 0){
            setHasScrolled(true)
        }
    }
    window.addEventListener("scroll", handleScroll)

    const Bn = () => {
        return ()<button onClick(scrollHandle)> ArrowCircleUpIcon </button>)
    }
    return (
        <>
            {hasScrolled && <Btn/>}
        </>
    )
}

export default ScrollBtn
