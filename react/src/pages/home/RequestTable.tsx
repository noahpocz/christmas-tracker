import styled from '@emotion/styled'

import { Checkbox, Box } from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { TableRow } from './TableRow.tsx'

import type { GiftRequest } from '../../services/giftRequestApi';
import {useState} from "react";

const COLUMN_WIDTHS = [
    45, 45, 10
]

const _s = {
    Table: styled(Box)`
        width: 100%;
    `,

    Row: styled.div`
        display: flex;
        width: 100%;
        gap: 12px;

        border-bottom: 1px solid #d9d9d9;
        &:last-child {
            border-bottom: none;
        }
    `,

    Cell: styled.div<{widthPercentage: number}>`
        width: ${props => props.widthPercentage}%;
        display: flex;
        
        padding: 6px;

        border-left: 1px solid #d9d9d9;
        &:first-child {
            border-left: 1px solid transparent;
        }
        
        overflow: hidden;
    `
}

interface RequestTableProps {
    requests: GiftRequest[];
    onTogglePurchased: (id: number) => void;
    onEdit: (request: GiftRequest) => void;
    onDelete: (id: number) => void;
    loading?: boolean;
}

export const RequestTable = ({ requests, onTogglePurchased, onEdit, onDelete, loading }: RequestTableProps) => {

    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

    const handleDelete = (id: number, personName: string) => {
        if (window.confirm(`Are you sure you want to delete the gift request for ${personName}?`)) {
            setSelectedRowIndex(-1);
            onDelete(id);
        }
    };

    const rows = requests.map((rowObject, i: number) => (
        <TableRow
            key={rowObject.id}
            selected={selectedRowIndex === i}
            onSelect={() => setSelectedRowIndex(i)}
            onEdit={() => onEdit(rowObject)}
            onDelete={() => handleDelete(rowObject.id, rowObject.personName)}
        >
            <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>{rowObject.personName}</_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>
                {rowObject.shoppingLink ? (
                    <a target='_blank' href={rowObject.shoppingLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LaunchIcon sx={{ fontSize: '1rem' }}/>
                        {rowObject.itemDescription}
                    </a>
                ) : (
                    rowObject.itemDescription
                )}
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[2]} style={{ justifyContent: 'center' }}>
                <Checkbox
                    checked={rowObject.purchased}
                    onChange={() => onTogglePurchased(rowObject.id)}
                    disabled={loading}
                />
            </_s.Cell>
        </TableRow>
    ))

    return (
        <_s.Table>
            {/* Header */}
            <TableRow style={{ fontWeight: 600 }}>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>Person</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>Item</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[2]} style={{ justifyContent: 'center' }}>
                    <ShoppingCartIcon/>
                </_s.Cell>
            </TableRow>

            {/* Contents */}
            {requests.length === 0 ? (
                <_s.Row>
                    <_s.Cell widthPercentage={100} style={{ justifyContent: 'center', padding: '20px' }}>
                        No gift requests yet. Click "Add" to create one!
                    </_s.Cell>
                </_s.Row>
            ) : (
                rows
            )}
        </_s.Table>
    )
}