/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const Feed = () => {
    const posts = useSelector((state) => state.post.posts);
    const loading = useSelector((state) => state.post.loading);
    console.log(posts);

    const imgReplace = (img) => {
        return img.replace("http://localhost:8000/", " ");
    };

    return (
        <div className=" columns-4 masonry h-fit">
            {loading && <Spinner />}
            {posts &&
                posts.map((post, index) => (
                    <div key={index} className=" m-6 relative hider">
                        <img
                            src={post.image}
                            alt=""
                            className=" rounded-lg h-auto cursor-pointer hover:opacity-50"
                        />
                        <Button className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 opacity-0 hide">
                            Save
                        </Button>
                        <a
                            href={`../../backend/uploads/${imgReplace(
                                post.image
                            )}`}
                            download
                        >
                            <DownloadForOfflineIcon className=" text-white absolute bottom-2 right-2 text-3xl opacity-0 hide cursor-pointer" />
                        </a>
                    </div>
                ))}
        </div>
    );
};

export default Feed;
