import { useEffect, useContext, useState } from "react";
// eslint-disable-next-line import/no-unassigned-import
import "./teacherTool.css";
import { AppStateContext, AppStateReady } from "./state/appStateContext";
import { usePromise } from "./hooks";
import HeaderBar from "./components/HeaderBar";
import Notifications from "./components/Notifications";
import * as NotificationService from "./services/notificationService";
import { postNotification } from "./transforms/postNotification";
import { makeNotification } from "./utils";
import DebugInput from "./components/DebugInput";
import { MakeCodeFrame } from "./components/MakecodeFrame";
import EvalResultDisplay from "./components/EvalResultDisplay";


function App() {
    const { state, dispatch } = useContext(AppStateContext);
    const [didNotify, setDidNotify] = useState(false);

    const ready = usePromise(AppStateReady, false);

    useEffect(() => {
        // Init subsystems.
        NotificationService.initialize();
    }, [ready]);

    // Test notification
    useEffect(() => {
        if (ready && !didNotify) {
            postNotification(makeNotification("🎓", 2000));
            setDidNotify(true);
        }
    }, [ready]);

    return (
        <div className="app-container">
            <HeaderBar />
            <div className="inner-app-container">
                <DebugInput />
                <EvalResultDisplay />
                <MakeCodeFrame />
            </div>
            <Notifications />
        </div>
    );
}

export default App;
