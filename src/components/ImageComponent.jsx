import React, { useState, useEffect } from "react";
import Loading from "./LoadingIndicator";

const ImageComponent = ({ src, hash, className, ...other }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return <>{!imageLoaded ? <Loading style={{}} /> : <img {...other} src={src} alt="" className={className} />}</>;
};

export default ImageComponent;
