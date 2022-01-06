import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Notification,
  NotificationCreateParams,
  NotificationCreator,
} from "../models/notification.model";
import {
  AppThunk,
  notificationsSliceKey,
  NotificationState,
} from "./store.model";

const initialState: NotificationState = [];

export const notificationsSlice = createSlice({
  name: notificationsSliceKey,
  initialState,
  reducers: {
    setNotification: {
      reducer: (
        state,
        { payload: notification }: PayloadAction<Notification>
      ) => {
        state.push(notification);
        return state;
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

export const showNotification =
  ({
    notificationParams,
    duration = 5000,
  }: {
    notificationParams: NotificationCreateParams;
    duration?: number;
  }): AppThunk =>
  async (dispatch) => {
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

export const createWithNotification =
  ({
    notificationParams,
    duration = 5000,
    action,
  }: {
    action: AnyAction;
  } & Parameters<typeof showNotification>[0]): AppThunk =>
  async (dispatch) => {
    dispatch(action);
    dispatch(showNotification({ notificationParams, duration }));
  };
