import "../styles/Toast.css";

function Toast({ message, show }) {
  if (!show) return null;

  return (
    <div className="toast-success">
      {message}
    </div>
  );
}

export default Toast;
