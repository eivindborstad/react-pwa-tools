import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import type { JSX } from 'react';

type InstallPWATutorialDialogProps = {
    controller: boolean,
    onClose: () => void,
};

function InstallPWATutorialDialog(props: InstallPWATutorialDialogProps): JSX.Element {

    return (
        <Dialog 
            open={props.controller} 
            onClose={props.onClose}
            maxWidth='md'
            fullWidth={false}
        >
            <DialogTitle>Tutorial - Install Application</DialogTitle>
            <DialogContent>
                <DialogContentText component='span'>
                    <ul>
                        <li className='tutorial-li-item'>K-Fleet Experience can either be accessed as a normal webpage, or be installed on your device.</li>
                        <li className='tutorial-li-item'>Installation has the advantages of supporting offline usage and easier accessability.</li>
                        <li className='tutorial-li-item'>The application will automatically update when you have an internet connection.</li>
                        <li className='tutorial-li-item'>A small number of browsers/devices do not support installation. Try switching browser or use the application as a normal webpage.</li>
                    </ul>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClose}
                    color='error'
                    variant='contained'
                    style={{
                        width: '90px',
                        height: '32px',
                        lineHeight: 'normal',
                        marginRight: '10px',
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default InstallPWATutorialDialog;