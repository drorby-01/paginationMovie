import React from "react"

export interface IImageProps {
    url: string,
    height?: number,
    width?: number
}

export default function ImageComponent(props: IImageProps) {
    const alternativeImage = "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
    const { url, height, width } = props
    // if (!url) return <CustomHeader text="No Image Availble" />
    return <img src={url || alternativeImage} height={height} width={width} />
}