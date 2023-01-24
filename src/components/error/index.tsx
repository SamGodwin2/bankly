import React from "react";

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
        <>
          <div>Uh oh looks like something's gone wrong...</div>
          <button onClick={() => onClick()}>Try again</button>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default ErrorWrapper;
