import React from "react";

const LoadingPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    flexDirection: "column",
  };

  const spinnerStyle: React.CSSProperties = {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTopColor: "#bc55ce",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

//   const textStyle: React.CSSProperties = {
//     marginTop: "20px",
//     fontSize: "1.5rem",
//     color: "#333",
//   };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        {/* <p style={textStyle}>Loading, please wait...</p> */}
      </div>
    </>
  );
};

export default LoadingPage;
