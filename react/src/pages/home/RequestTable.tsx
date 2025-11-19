import styled from '@emotion/styled'

import {Checkbox, Box, Button} from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { TableRow } from './TableRow.tsx'

import type { GiftRequest } from '../../services/giftRequestApi';
import {useState} from "react";

const COLUMN_WIDTHS = [
    8, 25, 55, 12
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
        justify-content: start;
        align-items: center;
        
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

export const RequestTable = ({ requests, onTogglePurchased, onEdit, onDelete }: RequestTableProps) => {

    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

    const handleClick = (rowIndex: number) => {
        if (rowIndex === selectedRowIndex) {
            setSelectedRowIndex(-1);
        } else {
            setSelectedRowIndex(rowIndex);
        }
    }

    const handleDelete = (id: number) => {
        setSelectedRowIndex(-1);
        onDelete(id);
    }

    const rows = requests.map((rowObject, i: number) => (
        <TableRow
            key={rowObject.id}
            selected={selectedRowIndex === i}
            onEdit={() => onEdit(rowObject)}
            onDelete={() => handleDelete(rowObject.id)}
        >
            <_s.Cell widthPercentage={COLUMN_WIDTHS[0]} style={{ justifyContent: 'center' }}>
                <Checkbox/>
            </_s.Cell>
            <_s.Cell onClick={() => handleClick(i)} widthPercentage={COLUMN_WIDTHS[1]}>{rowObject.personName}</_s.Cell>
            <_s.Cell onClick={() => handleClick(i)} widthPercentage={COLUMN_WIDTHS[2]}>
                {rowObject.shoppingLink ? (
                    <a target='_blank' href={rowObject.shoppingLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LaunchIcon sx={{ fontSize: '1rem' }}/>
                        {rowObject.itemDescription}
                    </a>
                ) : (
                    rowObject.itemDescription
                )}
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[3]} style={{ justifyContent: 'center' }}>
                {rowObject.purchased
                    ? <Button
                        color="success"
                        onClick={() => onTogglePurchased(rowObject.id)}
                        sx={{ fontSize: '12px', padding: '3px 9px', minHeight: 0 }}>
                        Yes
                      </Button>
                    : <Button
                        color="danger"
                        onClick={() => onTogglePurchased(rowObject.id)}
                        sx={{ fontSize: '12px', padding: '3px 9px', minHeight: 0 }}>
                        No
                      </Button>
                }
            </_s.Cell>
        </TableRow>
    ))

    return (
        <_s.Table>
            {/* Header */}
            <TableRow>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}/>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>Person</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>Item</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[3]} style={{ justifyContent: 'center', alignItems: 'center' }}>
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