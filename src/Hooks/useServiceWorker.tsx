import { useState, useCallback, useEffect } from 'react';
import * as serviceWorkerRegistration from '../ServiceWorker/serviceWorkerRegistration';

//see: https://medium.com/toplyne-engineering/pwa-update-notifications-in-a-react-application-f5680d51bb2
export const useServiceWorker = (): {showReload: boolean, waitingWorker: ServiceWorker | null, reloadPage: () => void} => {

    const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
    const [showReload, setShowReload] = useState<boolean>(false);

    //Called when a service worker updates. This function is a callback to the actual service worker registration onUpdate.
    const onSWUpdate = useCallback((registration: ServiceWorkerRegistration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    }, []);

    //Simply put, this tells the service worker to skip the waiting phase and then reloads the page
    const reloadPage = useCallback(() => {
        waitingWorker?.postMessage({type: 'SKIP_WAITING'});
        setShowReload(false);
        window.location.reload();
    }, [waitingWorker]);

    //Register the service worker
    useEffect(() => {
        serviceWorkerRegistration.register({
            onUpdate: onSWUpdate,
        });
    }, [onSWUpdate]);

    return {showReload, waitingWorker, reloadPage};
};