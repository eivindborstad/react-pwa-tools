import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import type { Theme} from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import type { JSX } from 'react';

type ErrorSnackbarProps = {
    open: boolean,
    setOpen: (value: boolean) => void,
    onRefresh: () => void,
};

function ErrorSnackbar(props: Readonly<ErrorSnackbarProps>): JSX.Element {

    const currentTheme: Theme = useTheme();

    return (
        <Snackbar
            open={props.open}
            onClose={(): void => props.setOpen(false)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <SnackbarContent
                action={
                    <Button
                        size='small'
                        onClick={props.onRefresh}
                        style={{
                            color: '#FFFFFF',
                        }}
                    >
                        Refresh
                    </Button>
                }
                style={{
                    backgroundColor: currentTheme.palette.info.main,
                }}
                message={
                    <span style={{
                        color: '#FFFFFF',
                    }}>
                        An update is available
                    </span>
                }
            />
        </Snackbar>
    );
}

export default ErrorSnackbar;