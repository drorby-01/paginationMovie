import React from "react";
import ErrorComponent from "../error";


interface IPropsCustomeHeader {
    text: string,
    style?: any
}


export default function CustomHeader({ text, style = { color: "red" } }: IPropsCustomeHeader) {
    if (!text) return <ErrorComponent />
    return <h1 style={style}> {text} </h1>
}