import React from "react";
import {Circles} from "react-loader-spinner";

const Spinner = ({loading}) => {
    return (
        <div className=" w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Circles
                height="80"
                width="80"
                color="red"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Spinner;
