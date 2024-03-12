import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    //console.log("err",err.status);
    return (
        <div>
            <p>oops! page not found {err.status} {err.statusText}</p>
           
        </div>

    )

}

export default Error;