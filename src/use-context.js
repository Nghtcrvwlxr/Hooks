import React, {useContext} from "react";

import {MyContext} from "./index";

const ContextConsumer = () => {
    const value = useContext(MyContext);

    return (
        <span>{value}</span>
    );
};

export default ContextConsumer;
