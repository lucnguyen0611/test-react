import {Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import {useState} from "react";
import { useNavigate } from "react-router";

interface FDrawer {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export default function ({isOpen, setIsOpen}: FDrawer) {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate()

    const handleClick = () => {
        setOpen(!open);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const goTo = (path: string) => {
        navigate(path)
    }

    return (
        <div>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                <h2 className={'pa-10'}>F8 Management</h2>

                <List
                    className={'pa-10'}
                    sx={{ width: '100%', maxWidth: 360}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Masters" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton  sx={{ pl: 4 }} onClick={() => goTo('/employee/')}>
                                <ListItemIcon>
                                    <PeopleAltOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Employees" />
                            </ListItemButton>
                            <ListItemButton  sx={{ pl: 4 }} onClick={() => goTo('/product/')}>
                                <ListItemIcon>
                                    <HorizontalSplitOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItemButton>

                            <ListItemButton  sx={{ pl: 4 }} onClick={() => goTo('/color/')}>
                                <ListItemIcon>
                                    <ColorLensOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Color" />
                            </ListItemButton>

                            <ListItemButton  sx={{ pl: 4 }} onClick={() => goTo('/customer/')}>
                                <ListItemIcon>
                                    <GroupOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Customer" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </div>
    )
}