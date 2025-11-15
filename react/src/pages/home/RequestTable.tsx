import styled from '@emotion/styled'

import { Checkbox, IconButton } from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import type { GiftRequest } from '../../services/giftRequestApi';

const COLUMN_WIDTHS = [
    25, 30, 15, 15, 15
]

const _s = {
    Table: styled.div`
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        overflow: hidden;
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

    const handleDelete = (id: number, personName: string) => {
        if (window.confirm(`Are you sure you want to delete the gift request for ${personName}?`)) {
            onDelete(id);
        }
    };

    const rows = requests.map(rowObject => (
        <_s.Row key={rowObject.id}>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>{rowObject.personName}</_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>
                {rowObject.shoppingLink ? (
                    <a target='_blank' href={rowObject.shoppingLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {rowObject.itemDescription}
                        <LaunchIcon sx={{ fontSize: '1rem' }}/>
                    </a>
                ) : (
                    rowObject.itemDescription
                )}
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>
                <Checkbox
                    checked={rowObject.purchased}
                    onChange={() => onTogglePurchased(rowObject.id)}
                    disabled={loading}
                />
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[3]}>
                <IconButton
                    size="sm"
                    variant="plain"
                    onClick={() => onEdit(rowObject)}
                    disabled={loading}
                >
                    <EditIcon />
                </IconButton>
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[4]}>
                <IconButton
                    size="sm"
                    variant="plain"
                    color="danger"
                    onClick={() => handleDelete(rowObject.id, rowObject.personName)}
                    disabled={loading}
                >
                    <DeleteIcon />
                </IconButton>
            </_s.Cell>
        </_s.Row>
    ))

    return (
        <_s.Table style={{width: '600px'}}>
            {/* Header */}
            <_s.Row style={{ backgroundColor: '#eaeaea', fontWeight: 600 }}>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>Person</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>Item</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>Purchased</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[3]}>Edit</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[4]}>Delete</_s.Cell>
            </_s.Row>

            {/* Contents */}
            {loading ? (
                <_s.Row>
                    <_s.Cell widthPercentage={100} style={{ justifyContent: 'center', padding: '20px' }}>
                        Loading...
                    </_s.Cell>
                </_s.Row>
            ) : requests.length === 0 ? (
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