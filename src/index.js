import React from 'react';
import ReactDOM from 'react-dom';

import HookSwitcher from "./use-state";
import ContextConsumer from "./use-context";
import {Counters} from "./use-effect";

const MyContext = React.createContext();

const App = () => {
    return (
        <div>
            <HookSwitcher/>

            <MyContext.Provider value ='Context value'>
                <ContextConsumer/>
            </MyContext.Provider>

            <Counters/>
        </div>
    );
};

export {MyContext};

ReactDOM.render(<App />, document.getElementById('root'));