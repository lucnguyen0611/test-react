import Paper from "@mui/material/Paper";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import type { Header } from '../../utils';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { memo } from 'react';

interface FTable {
    headers: Header[];
    rows: any[];
    onDelete?: (id: string) => void;
    width?: number;
}

const RenderActionBtn = (
    headers: Header[],
    rowId: number,
    onDelete?: () => void
) => {
    const keys = headers.map(header => header.name);
    if (!keys.includes('action')) return null;

    return (
        <TableCell size={"small"} key={`action-${rowId}`}>
            {onDelete && <DeleteOutlineIcon color={'error'} onClick={onDelete} sx={{ cursor: 'pointer' }} />}
        </TableCell>
    );
};

function FTableComponent({ headers, rows, onDelete, width }: FTable) {
    return (
        <TableContainer sx={{ maxWidth: width, margin: 'auto' }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            headers.map((header: Header) => (
                                <TableCell size={"small"} key={header.name}>{header.text}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        rows?.map((row: any) => (
                            <TableRow key={row.id}>
                                {
                                    headers.map((header: Header) => {
                                        if (header.name === 'action') {
                                            return RenderActionBtn(
                                                headers,
                                                row.id,
                                                () => onDelete?.(row.id)
                                            );
                                        }

                                        const rowKey: string = header.name;
                                        return (
                                            <TableCell size={"small"} key={`${rowKey}-${row.id}`}>
                                                {
                                                    row[rowKey]
                                                        ? header?.displayProperty
                                                            ? row[rowKey][header.displayProperty]
                                                            : row[rowKey]
                                                        : ''
                                                }
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default memo(FTableComponent);
