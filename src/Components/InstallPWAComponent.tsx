import React, { useCallback, useEffect, useState } from 'react';
import type { Theme} from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import type { JSX } from 'react';
import InstallPWATutorialDialog from '../Dialogs/TutorialDialogs/InstallPWATutorialDialog';
import { TutorialDialogButton } from 'shouldve-been-mui';
import { isInstalled, isSafari } from 'shouldve-been-js';

export function InstallPWAComponent(): JSX.Element {

    const currentTheme: Theme = useTheme();
    
    const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const [promptInstall, setPromptInstall] = useState<any>(null);
    
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handler(e: any): void {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        }
        
        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('transitionend', handler);
    }, []);

    const dialogGenerator: (controller: boolean, onClose: () => void) => JSX.Element = useCallback((controller: boolean, onClose: () => void) => {
        return (
            <InstallPWATutorialDialog
                controller={controller}
                onClose={onClose}
            />
        );
    }, []);

    function handleInstall(e: React.MouseEvent): void {
        
        e.preventDefault();
        
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!promptInstall) {
            return;
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        promptInstall.prompt();
    }

    

    return (
        <div>
            {!isInstalled() &&
                <>
                    <>
                        {supportsPWA
                            ? (
                                <Button 
                                    onClick={handleInstall}
                                    color='primary'
                                    variant='contained'
                                    style={{
                                        minWidth: '150px',
                                        maxWidth: '150px',
                                        minHeight: '40px',
                                        maxHeight: '40px',
                                    }}
                                >
                                    Install App
                                </Button>
                            )
                            : (isSafari()
                                ?   (
                                    <span style={{
                                        color: currentTheme.palette.text.primary,
                                    }}>
                                        In Safari, choose &quot;Add to Home Screen&quot; to install this app
                                    </span>
                                )
                                : (
                                    <span style={{
                                        color: currentTheme.palette.text.primary,
                                    }}>
                                        This browser/device does not support installation
                                    </span>
                                )
                            )
                        }
                    </>
                    <br />
                    <TutorialDialogButton
                        dialog={dialogGenerator}
                    />
                </>
            }
        </div>
    );
}