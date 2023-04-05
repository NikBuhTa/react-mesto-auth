import React from "react";

function Spinner(props) {
    return(
        <div className={`spinner spinner_position_${props.position} spinner_active`}><i></i></div>
    );
}

export default Spinner;