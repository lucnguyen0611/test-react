import DialogContainer from '../../Dialog/Container/index.tsx';
import { Stack, TextField } from "@mui/material";
import type { CustomerDialogProp} from "../../../utils";

export default ({isOpen, onClose, order, setOrder, onSave}: CustomerDialogProp) => {

    const onChange = (event: any) => {
        setOrder({...order, [event.target.name]: event.target.value})
    }

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
        >
            <Stack sx={{ width: 450 }} spacing={2}>
                <TextField
                    fullWidth
                    name={'name'}
                    label="Name"
                    variant="standard"
                    value={order.name}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    name={'companyName'}
                    label="Company Name"
                    variant="standard"
                    value={order.quantity}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    name={'address'}
                    label="Address"
                    variant="standard"
                    value={order.amount}
                    onChange={onChange}
                />
            </Stack>
        </DialogContainer>
    )
}