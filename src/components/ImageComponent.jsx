import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";

const ImageComponent = ({ src, hash, className, ...other }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div
        {...other}
        className={className}
        style={{
          display: imageLoaded ? "none" : "inline",
        }}
      >
        <Blurhash
          style={{ width: "100%", objectFit: "cover" }}
          hash={hash}
          width={"auto"}
          height={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img {...other} src={src} alt="" className={className} style={{ display: !imageLoaded ? "none" : "inline" }} />
    </>
  );
};

export default ImageComponent;
