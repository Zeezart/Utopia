import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for createRoot
import App from "./App";
import { UserProfileContextProvider } from "./ContextApi/GetUserProfileContext";
import { AuthProvider } from "./ContextApi/UserAuthContext"; 

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProfileContextProvider>
        <App />
      </UserProfileContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
