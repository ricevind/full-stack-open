import React from "react";
import { useAppSelector } from "../store";

export const Notification = () => {
  const notifications = useAppSelector((state) => state.notifications);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {notifications.map((notification) => (
        <div key={notification.message} style={style}>
          {notification.message}
        </div>
      ))}
    </>
  );
};
