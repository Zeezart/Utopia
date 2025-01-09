import React from "react";
// import { useAuth } from "../ContextApi/UserAuthContext";

const UserNotFoundPage: React.FC = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "#f4f4f4",
      color: "#333",
    } as React.CSSProperties,

    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
    } as React.CSSProperties,

    message: {
      fontSize: "1rem",
      marginBottom: "30px",
      color: "#555",
    } as React.CSSProperties,

    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    } as React.CSSProperties,

    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

//   const {userData} = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Not Found</h1>
      <p style={styles.message}>
        We couldn’t find the user you’re looking for. Please check the spelling.
      </p>
      {/* <button
        style={styles.button}
        onClick={() => (window.location.href = `/${userData?.username}`)}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        
      >
        Go to Profile
      </button> */}
    </div>
  );
};

export default UserNotFoundPage;
