"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();
  const [longUrl, setLongUrl] = useState("");
  const [shortenedURl, setShortenedURl] = useState("");
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(`${process.env.host}/shortner/${shortenedURl}`);
        alert("Copied to clipboard!");
      } catch (err) {
        console.log("Failed to copy!", err);
      }
    };
  const base62 = (num) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    while (num > 0) {
      const remainder = num % 62;
      result = chars[remainder] + result;
      num = Math.floor(num / 62);
    }
    return result;
  };
  const base10 = (str) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const value = chars.indexOf(char);
      result = result * 62 + value;
    }
    return result;
  };

  const onSubmit = async (data) => {
    const a = await fetch("/api/fetchUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: data.url }),
    });
    const response = await a.json();
    if (response.message === "URL not found") {
      const counterResponse = await fetch("/api/fetchLatestCode");
      const counterData = await counterResponse.json();
      const latestCode = counterData.latestCode || "0";
      const newCode = base62(base10(latestCode) + 1);

      const dataToSend = { longUrl: data.url, shortUrl: newCode };
      const b = await fetch("/api/createUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const res = await b.json();
      console.log("Response from createUrl:", res);
      if (res.message === "URL saved successfully") {
        setLongUrl(data.url);
        setShortenedURl(newCode);
      } else {
        console.error("Failed to save URL");
      }
    } else if (response.message === "URL found") {
      setLongUrl(data.url);
      setShortenedURl(response.shortURL);
    } else {
      console.error("Failed to fetch URL");
    }
  };
  return (
    <div className=" flex flex-col items-center gap-4 bg-gray-100 h-screen  text-black py-30">
      <h1 className=" text-2xl font-bold"> URL Shortener </h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter URL"
          {...register("url", { required: true })}
          className=" p-2 rounded-md border border-gray-300 focus:outline-none "
        />
        <input
          type="submit"
          className=" bg-purple-500 rounded-md text-white py-2 px-4 hover:bg-purple-600"
        />
      </form>
      <div className="">
        {shortenedURl == "" ? (
          <div className=" p-2 bg-white rounded-md border border-gray-300">
            The shortened URL will appear here after you submit the form.
          </div>
        ) : (
          <div className=" p-2 bg-white rounded-md border border-gray-300">
            <p className=" text-lg font-semibold">Shortened URL of {longUrl}</p>
            <a
              href={`${process.env.host}/shortner/${shortenedURl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-500 hover:underline"
            >
              ${process.env.host}/shortner/{shortenedURl}
            </a>
            <div className=" mt-2">
              <button className=" bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleCopy}>
                Copy URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
