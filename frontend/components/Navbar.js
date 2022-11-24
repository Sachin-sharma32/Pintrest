/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import Link from "next/link";
import LoginModel from "./LoginModel";
import SignupModel from "./SignupModel";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryBox from "./CategoryBox";
import { setUser } from "../redux/userSlice";
import { fetchPosts } from "../redux/postSlice";

const Navbar = ({
    setToggleLogIn,
    setToggleSignUp,
    toggleLogIn,
    toggleSignUp,
}) => {
    const [toggleCategories, setToggleCategories] = useState(false);
    const { data: session } = useSession();

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    console.log(session);
    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
        dispatch(fetchPosts());
    }, [dispatch]);

    const signOut = () => {
        {
            session && signOut();
        }
        {
            user && dispatch(setUser(null));
            localStorage.setItem("user", null);
        }
    };

    return (
        <div className="">
            <div className=" mx-auto px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Link href="/">
                        <PinterestIcon className=" text-red-600 cursor-pointer" />
                    </Link>
                    <h3 className=" text-xl text-red-500 mr-4">Pinterest</h3>
                    {(session || user) && (
                        <Link href="/create">
                            <a className=" px-2 rounded-lg bg-red-500 text-white hover:bg-red-700 py-1">
                                Create
                            </a>
                        </Link>
                    )}
                </div>
                <div className=" relative">
                    {(session || user) && (
                        <button
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setToggleCategories((current) => !current);
                            }}
                        >
                            <h5 className=" text-sm font-semibold">
                                Categories
                            </h5>
                            {toggleCategories ? (
                                <ArrowDropUpIcon />
                            ) : (
                                <ArrowDropDownIcon />
                            )}
                        </button>
                    )}
                    {toggleCategories && <CategoryBox />}
                </div>
                {!session && !user && (
                    <div className="flex gap-2">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                height: "30px",
                            }}
                            onClick={() => {
                                setToggleLogIn(true);
                                setToggleSignUp(false);
                            }}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                height: "30px",
                            }}
                            onClick={() => {
                                setToggleSignUp(true);
                                setToggleLogIn(false);
                            }}
                        >
                            Sign up
                        </Button>
                    </div>
                )}
                {(session || user) && (
                    <div className="flex gap-6 items-center">
                        <div className=" relative">
                            <SearchIcon className=" absolute top-1/2 -translate-y-1/2 right-1 text-gray-400" />
                            <input
                                type="text"
                                name="text"
                                className=" bg-white border-red-200 border-2 rounded-lg pl-2 outline-none h-10"
                                placeholder="search"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {session && (
                                <>
                                    <img
                                        src={session.user.image}
                                        alt=""
                                        className=" w-10 rounded-full"
                                    />
                                    <p classNam e=" text-sm">
                                        {session.user.name}
                                    </p>
                                </>
                            )}
                            {user && (
                                <div className="flex flex-col justify-center items-center">
                                    <p>Welcome</p>
                                    <p className="font-bold">{user.name}</p>
                                </div>
                            )}
                        </div>
                        <Button
                            className=" bg-red-500 text-white hover:bg-red-400 h-[30px]"
                            onClick={signOut}
                        >
                            Log Out
                        </Button>
                    </div>
                )}
            </div>
            {toggleLogIn && (
                <LoginModel
                    setToggleLogIn={setToggleLogIn}
                    setToggleSignUp={setToggleSignUp}
                />
            )}
            {toggleSignUp && (
                <SignupModel
                    setToggleSignUp={setToggleSignUp}
                    setToggleLogIn={setToggleLogIn}
                />
            )}
        </div>
    );
    
};

export default Navbar;
