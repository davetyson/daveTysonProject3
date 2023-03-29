// Build component
const Error = (props) => {

    // Deconstruct some props
    const { error, setError } = props;

    return (
        <>
            {/* If there is an error and the user hasn't clicked to close it, show the error window */}
            { error === true ?
            <div className="showError">
                <p>There has been an error</p>
                <button onClick={()=>{setError(false)}}>X</button>
            </div> : null }
        </>
    )
}

export default Error;