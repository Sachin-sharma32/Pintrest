import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import store from "../redux/store";
import {Provider} from "react-redux";

function MyApp({ Component, pageProps }) {
    const [toggleLogIn, setToggleLogIn] = useState(false);
    const [toggleSignUp, setToggleSignUp] = useState(false);
    return (
        <SessionProvider>
            <Provider store={store}>
                <Navbar
                    setToggleLogIn={setToggleLogIn}
                    setToggleSignUp={setToggleSignUp}
                    toggleLogIn={toggleLogIn}
                    toggleSignUp={toggleSignUp}
                />
                <div
                    className={`${(toggleLogIn || toggleSignUp) && "blur-sm"}`}
                >
                    <Component {...pageProps} />
                </div>
            </Provider>
        </SessionProvider>
    );
}

export default MyApp;
