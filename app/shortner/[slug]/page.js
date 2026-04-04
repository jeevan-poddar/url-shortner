"use client";
import {useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const fetchLongUrl = async (code) => {
  const a = await fetch("/api/fetchLongUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const response = await a.json();
  return response;
};
const page = () => {
  const params = useParams();
  const route = useRouter();
  const code = params.slug;
  useEffect(() => {
    const loadLongUrl = async () => {
      const response = await fetchLongUrl(code);
      route.push(response.longURL);
    };

    if (code) {
      loadLongUrl();
    }
  }, [code]);
  return <div></div>;
};

export default page;
