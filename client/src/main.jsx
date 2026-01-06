import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// #region agent log - Global error handler
window.addEventListener('error', (event) => {
  fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:8',message:'Global error caught',data:{error:event.message,filename:event.filename,lineno:event.lineno},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
});
window.addEventListener('unhandledrejection', (event) => {
  fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:11',message:'Unhandled promise rejection',data:{reason:event.reason?.message||event.reason},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
});
// #endregion

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
