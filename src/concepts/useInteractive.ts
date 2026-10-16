import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
const client = () => true;
const server = () => false;
export const useInteractive = () => useSyncExternalStore(subscribe, client, server);
