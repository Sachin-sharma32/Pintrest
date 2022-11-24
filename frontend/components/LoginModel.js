import React from "react";
import { Button } from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useRouter } from "next/router";

const LoginModel = ({ setToggleLogIn, setToggleSignUp }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        const request = { email, password };
        const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            request
        );
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setUser(response.data.data));
        console.log(response);
        setToggleLogIn(false);
        router.push("/");
    };
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-2 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500">
            <div className=" w-fit p-10 text-center shadow-lg z-50 bg-white h-[90vh] rounded-2xl overflow-y-scroll scrollbar">
                <PinterestIcon className=" text-red-500 text-5xl" />
                <h2 className=" text-2xl font-semibold">
                    Welcome to Pinterest
                </h2>
                <form
                    className=" mt-6 flex flex-col items-center"
                    onSubmit={submitHandler}
                >
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="email" className=" text-md">
                            Email
                        </label>
                        <input
                            type="email"
                            className=" p-3 w-60 outline-none bg-white border-2 border-red-400 rounded-lg"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="password" className=" text-md">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className=" p-3 w-60 outline-none bg-white border-2 border-red-400 rounded-lg"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <Link href="/forgot-password">
                        <a className=" text-sm w-60 text-left">
                            Foregot your password?
                        </a>
                    </Link>
                    <Button
                        className=" mt-3 w-60 bg-red-500 text-white hover:bg-red-400"
                        type="submit"
                    >
                        Log in
                    </Button>
                </form>
                <h5 className=" mt-6">OR</h5>
                <Button
                    className=" bg-blue-500 text-white mt-2 hover:bg-white hover:text-black"
                    onClick={() => {
                        signIn("google");
                    }}
                >
                    <GoogleIcon className=" mr-2" /> Continue with Google
                </Button>
                <Button
                    className=" bg-blue-500 text-white mt-2 hover:bg-white hover:text-black"
                    onClick={() => {
                        signIn("github");
                    }}
                >
                    <GitHubIcon className=" mr-2" /> Continue with GitHub
                </Button>
                <div className=" text-sm">
                    <div className=" mt-10 text-gray-500">
                        By continuing you agree to Pinterest's <br />{" "}
                        <span className=" text-black font-semibold">
                            Terms of Service
                        </span>{" "}
                        and asknowledge you've read our{" "}
                        <span className=" text-black font-semibold">
                            Privacy Policy
                        </span>
                    </div>
                    <div className=" mt-2 flex justify-center gap-2 items-center">
                        Not on Pinterest yet?{" "}
                        <Button
                            className=" text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => {
                                setToggleLogIn(false);
                                setToggleSignUp(true);
                            }}
                        >
                            Sign up
                        </Button>
                    </div>
                    <p className=" text-gray-500">
                        Are you a business? Get started here!
                    </p>
                </div>
                <CloseIcon
                    className=" absolute top-4 right-4 cursor-pointer"
                    onClick={() => {
                        setToggleLogIn(false);
                    }}
                />
            </div>
        </div>
    );
};

export default LoginModel;
