import React from "react";

import EditableTimebox from "./EditableTimebox";
import { TimeboxList } from "./remaining-components";

function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    )
}

export default App