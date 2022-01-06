import React, { CSSProperties } from "react";
import { useAppSelector } from "../store/hooks";

export const Notification = () => {
  const notifications = useAppSelector((state) => state.notifications);

  const style: CSSProperties = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={{ position: "fixed", top: 0, right: 0 }}>
      {notifications.map((notification) => (
        <div key={notification.message} style={style}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};
