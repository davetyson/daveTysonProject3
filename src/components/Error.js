const Error = (props) => {

    const { error, setError } = props;

    return (
        <>
            { error === true ?
            <div className="showError">
                <p>There has been an error</p>
                <button onClick={()=>{setError(false)}}>X</button>
            </div> : null }
        </>
    )
}

export default Error;