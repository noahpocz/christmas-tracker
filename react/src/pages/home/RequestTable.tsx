import styled from '@emotion/styled'

import {Checkbox, Box, Button} from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { TableRow } from './TableRow.tsx'

import type { GiftRequest } from '../../services/giftRequestApi';

const COLUMN_WIDTHS = [
    8, 22, 58, 12
]

const _s = {
    Table: styled(Box)`
        width: 100%;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
    selectedItemIds: number[];
    onSelectItem: (id: number) => void;
    onDeselectItem: (id: number) => void;
    onTogglePurchased: (id: number) => void;
    loading?: boolean;
}

export const RequestTable = ({ requests, selectedItemIds, onSelectItem, onDeselectItem, onTogglePurchased }: RequestTableProps) => {
    const handleSelectionToggle = (id: number) => {
        if (selectedItemIds.includes(id)) {
            onDeselectItem(id);
        } else {
            onSelectItem(id);
        }
    }

    const rows = requests.map((rowObject) => (
        <TableRow key={rowObject.id}>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[0]} style={{ justifyContent: 'center' }}>
                <Checkbox
                    checked={selectedItemIds.includes(rowObject.id)}
                    onChange={() => handleSelectionToggle(rowObject.id)}
                />
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>{rowObject.personName}</_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>
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
                        {"Yes"}
                      </Button>
                    : <Button
                        color="danger"
                        onClick={() => onTogglePurchased(rowObject.id)}
                        sx={{ fontSize: '12px', padding: '3px 9px', minHeight: 0 }}>
                        {"No"}
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