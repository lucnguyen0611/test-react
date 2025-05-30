import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FDrawer from '../FDrawer'
import {useState} from "react";

interface Header {
    title: string
}

export default function Header({title}: Header) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={() => setIsOpen(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ margin: 'auto' }}>
                        <Typography variant="h6" color="inherit">
                            {title}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <FDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
        </Box>
    );
}