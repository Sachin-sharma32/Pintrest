import React, { useState } from "react";
import { Button } from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";

const SignupModel = ({ setToggleSignUp, setToggleLogIn }) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const request = { name, email, password, passwordConfirm };
        const response = await axios.post(
            "http://localhost:8000/api/auth/register",
            request
        );
        console.log(response);
        setToggleLogIn(true);
        setToggleSignUp(false);
    };

    return (
        <div className=" p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500">
            <div className=" w-fit p-10 text-center z-50 rounded-lg bg-white h-[90vh] overflow-y-scroll scrollbar">
                <PinterestIcon className=" text-red-500 text-5xl" />
                <h2 className=" text-2xl font-semibold">
                    Welcome to Pinterest
                </h2>
                <form
                    className=" mt-6 flex flex-col items-center"
                    onSubmit={submitHandler}
                >
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="name" className=" text-md">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className=" p-3 w-60 outline-none bg-white border-2 border-red-400 rounded-lg"
                            required
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="email" className=" text-md">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className=" p-3 w-60 outline-none bg-white border-2 border-red-400 rounded-lg"
                            required
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
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="password" className=" text-md">
                            Password Confirm
                        </label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            className=" p-3 w-60 outline-none bg-white border-2 border-red-400 rounded-lg"
                            required
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        className=" mt-3 w-60 bg-red-500 text-white hover:bg-red-400"
                        type="submit"
                    >
                        Sign Up
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
                        Already on Pinterest?{" "}
                        <Button
                            className=" text-black hover:bg-red-500 hover:text-white"
                            onClick={() => {
                                setToggleLogIn(true);
                                setToggleSignUp(false);
                            }}
                        >
                            Login
                        </Button>
                    </div>
                    <p className=" text-gray-500">
                        Are you a business? Get started here!
                    </p>
                </div>
                <CloseIcon
                    className=" absolute top-4 right-4 cursor-pointer"
                    onClick={() => {
                        setToggleSignUp(false);
                    }}
                />
            </div>
        </div>
    );
};

export default SignupModel;
