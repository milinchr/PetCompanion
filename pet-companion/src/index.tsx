import reportWebVitals from './reportWebVitals';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./components/auth-context";
import { PostProvider } from "./components/post-context";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Fallback() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>😿 Oops! Something went wrong.</h2>
      <button onClick={() => window.location.reload()}>🔁 Refresh</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();

