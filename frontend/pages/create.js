/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import React from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Create = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);

    const user = useSelector((state) => state.user.user);

    const imageHandler = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("postImage", file);

        const response = await axios.post(
            "http://localhost:8000/api/uploads",
            formData
        );
        console.log(response);
        setImage(response.data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const request = { user: user._id, image, title, desc };
        const response = await axios.post(
            "http://localhost:8000/api/posts",
            request
        );
        console.log(response);
    };

    return (
        <div className=" bg-[#e9e9e9] min-h-screen flex justify-center items-center">
            <form
                className=" bg-white w-[50vw] h-[70vh] mx-auto shadow-lg rounded-lg flex items-center justify-around relative"
                onSubmit={submitHandler}
            >
                <div className=" border-2 border-black h-[70%] w-52 rounded-lg flex justify-center items-center text-gray-300 text-2xl cursor-pointer overflow-hidden relative border-dashed bg-[#e9e9e9] outline outline-8 outline-[#e9e9e9]">
                    <DriveFolderUploadIcon />
                    <input
                        type="file"
                        className="w-100 h-96 absolute cursor-pointer opacity-0 z-40"
                        onChange={imageHandler}
                    />
                    {image && <img src={image} alt="" className=" absolute" />}
                </div>
                <div className="flex flex-col  gap-2">
                    <Button
                        className=" absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700"
                        type="submit"
                    >
                        Save
                    </Button>
                    <input
                        type="text"
                        className=" bg-white outline-none border-2 rounded-lg p-2 text-2xl font-bold"
                        placeholder="Image Title"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className=" bg-white outline-none border-2 rounded-lg p-2"
                        placeholder="Tell up something about the image"
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default Create;
