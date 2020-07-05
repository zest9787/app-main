import React, {lazy} from 'react';
import {Route} from "react-router-dom";

const RenderComponent = lazy(() => import("./AppOne/AppOne"));
const RenderComponent2 = lazy(() => import("./AppTwo/AppTwo"));
const App = () => {
    return (
        <div>
            Main
            <React.Suspense fallback={<div>loading...</div>}>
                <Route path={'/one'} component={RenderComponent}/>
                <Route path={'/two'} component={RenderComponent2}/>
            </React.Suspense>
        </div>
    );
};

export default App;
