import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./index";
import {
  Notification,
  NotificationCreateParams,
  NotificationCreator,
} from "../models/notification.model";

const initialState: Notification[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: {
      reducer: (
        state,
        { payload: notification }: PayloadAction<Notification>
      ) => {
        state.push(notification);
      },
      prepare: (notificationCreateParams: NotificationCreateParams) => ({
        payload: NotificationCreator.create(notificationCreateParams),
      }),
    },
    clearNotification: (
      state,
      { payload: idToRemove }: PayloadAction<Notification["id"]>
    ) => state.filter((notification) => notification.id !== idToRemove),
  },
});

export const createWithNotification =
  ({
    notificationParams,
    duration = 5000,
    action,
  }: {
    notificationParams: NotificationCreateParams;
    action: AnyAction;
    duration?: number;
  }): AppThunk =>
  async (dispatch) => {
    dispatch(action);
    const setNotificationAction =
      notificationsSlice.actions.setNotification(notificationParams);
    dispatch(setNotificationAction);

    const removeNotificationPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        dispatch(
          notificationsSlice.actions.clearNotification(
            setNotificationAction.payload.id
          )
        );
        resolve();
      }, duration);
    });

    await removeNotificationPromise;
  };
