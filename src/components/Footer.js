import { useState, useEffect } from "react";

const Footer = () => {

    let [currentYear, setCurrentYear] = useState();

    // // Footer Year function
    // const footerYear = () => {

    // };

    useEffect( () => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer>
            <p>© Dave Tyson {currentYear}. Created at Juno College.</p>
        </footer>
    )
}

export default Footer;