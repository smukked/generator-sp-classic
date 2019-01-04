import { Dispatcher } from "flux";

const dispatcherInstance: Dispatcher<any> = new Dispatcher();

export const AppDispatcher = dispatcherInstance;