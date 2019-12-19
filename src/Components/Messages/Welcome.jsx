import React from "react";

export default function Welcome(props) {
  let welcome = () => {
    let message, user;

    if (props.userObj) {
      user = props.userObj;
      if (user.firstName) {
        message = (
          <>
            <h2>Welcome {user.firstName}</h2>
          </>
        );
      } else {
        message = (
          <>
            <h2>Welcome {user.username}</h2>
          </>
        );
      }
    }

    return message;
  };

  return <>{welcome()}</>;
}
