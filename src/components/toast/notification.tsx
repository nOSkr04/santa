import React from "react";
import { ErrorToast } from "./error";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
export const renderType = {
    error: (toast: ToastProps) => <ErrorToast toast={toast}/>
};