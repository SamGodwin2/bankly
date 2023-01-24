import React from "react";
import "./index.css";

const ErrorWrapper = ({
  onClick,
  err,
  children,
}: {
  onClick: () => void;
  err: any;
  children: React.ReactNode;
}) => {
  //   if (err) console.error(err); // Using this but could be any logging implementation
  return (
    <>
      {err ? (
        <div className="error-container">
          <div>Uh oh looks like something's gone wrong...</div>
          <button onClick={() => onClick()}>Try again</button>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ErrorWrapper;
