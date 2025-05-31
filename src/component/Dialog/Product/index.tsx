import DialogContainer from '../../Dialog/Container/index.tsx';
import {Stack, TextField} from "@mui/material";
import type {ProductDialogProp} from "../../../utils";

export default ({isOpen, onClose, product, setProduct, onSave}: ProductDialogProp) => {

    const onChange = (event: any) => {
        setProduct({...product, [event.target.name]: event.target.value})
    }

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
        >
            <Stack sx={{ width: 450 }} spacing={2}>
                <TextField
                    fullWidth name={"name"} label="Name" variant="standard"  onChange={onChange}
                />
                <TextField
                    fullWidth name={"price"} label="Price" variant="standard" onChange={onChange}
                />
                <TextField
                    fullWidth name={"remaining"} label="Remaining" variant="standard" onChange={onChange}
                />

            </Stack>
        </DialogContainer>
    )
}