import React, { useEffect, useState } from "react";

const HomeFullscreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <button
      className="flex h-full w-full border-8 bg-[#242424] border-[#1D1E1E] rounded-xl justify-center items-center whitespace-pre-wrap break-words text-white font-bold ~text-2xl/5xl text-center p-2"
      onClick={() => {
        if (isFullScreen) {
          let elem = document.documentElement; 
          
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            // Firefox
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            // Chrome, Safari, and Opera
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            // IE/Edge
            elem.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            // Firefox
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            // IE/Edge
            document.msExitFullscreen();
          }
        }
        setIsFullScreen(!isFullScreen);
      }}
    >
      Full Screen
    </button>
  );
};

export default HomeFullscreenButton;
