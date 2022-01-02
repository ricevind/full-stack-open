import { nanoid } from "@reduxjs/toolkit";

export const getId = () => nanoid();
export type Id = ReturnType<typeof getId>;
