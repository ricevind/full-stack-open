import { getId, Id } from "../utils/get-id";

export enum NotificationType {
  Info,
  Success,
  Error,
}

export type Notification = {
  readonly message: string;
  readonly id: Id;
  readonly type: NotificationType;
};

export class NotificationCreator {
  static create({
    message,
    type,
  }: Pick<Notification, "message" | "type">): Notification {
    return { message, id: getId(), type };
  }
}

export type NotificationCreateParams = Parameters<
  typeof NotificationCreator.create
>[0];
