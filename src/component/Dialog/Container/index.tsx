import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type {DialogProp} from "../../../utils";

export default ({isOpen, onClose, children, onSave}: DialogProp)=> {
    return (
        <Dialog open={isOpen} sx={{margin: 'auto'}}>
            <DialogTitle>Dialog Container</DialogTitle>
            <DialogContent>
                {
                    children
                }
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>Close</Button>
                <Button variant="outlined" onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}