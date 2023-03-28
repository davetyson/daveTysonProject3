// import { useState, useEffect } from "react";

const Error = (props) => {

    const { error, setError } = props;

    // const [ closeError, setCloseError ] = useState(false);
    // const { setError } = props;
    // useEffect( () => {
    //     if (closeError === true) {
    //         setError(false);
    //         setCloseError(false);
    //     } else {
    //         setTimeout( () => {
    //             setError(false);
    //             setCloseError(false);
    //         }, 5000)
    //     }
    // }, [])

    return (
        <>
            { error === true ?
            <div className="showError">
                <p>There has been an error</p>
                <button onClick={()=>{setError(false)}}>X</button>
            </div> : null }
            {/* <div className="showError">
                <p>There has been an error</p>
                <button>X</button>
            </div> */}
        </>
    )
}

export default Error;