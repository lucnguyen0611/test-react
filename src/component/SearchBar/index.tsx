import {TextField, Button, Box} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


interface SearchBarI {
    onAdd: () => void
}


export default function ({onAdd}: SearchBarI) {
    return (
        <Box sx={{display: 'flex', marginBottom: 5, marginTop: 5}}>
            <TextField
                label={'Search'}
                sx={{flexGrow: 1, marginRight: 1}}
                size={"small"}
                variant={"outlined"}
            />
            <Button variant={"outlined"} onClick={onAdd}>
                <ControlPointIcon/>
                &nbsp;
                Add New
            </Button>
        </Box>
    )
}