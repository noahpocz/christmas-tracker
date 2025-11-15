import React from 'react'
import styled from '@emotion/styled'

import { Box, IconButton } from '@mui/joy'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';

import { Collapse } from '../../components/Collapse.tsx'

const _s = {
    OuterContainer: styled(Box)`
        padding: ${props => props.selected ? '12px 0' : '0'};
    `,

    InnerRowContainer: styled(Box)`
        display: flex;
        width: 100%;
        background-color: white;
        
        border-bottom: 1px solid #d9d9d9;
        &:last-child {
            border-bottom: none;
        }
    `,

    ControlBox: styled(Box)`
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding: 6px 0;
        
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: #d9d9d9;
        border-radius: 0 0 5px 5px;
        
    `
}

export const TableRow = ({ children, selected = false, onSelect = () => {}, onEdit, onDelete, ...otherProps }) => {
    return (
        <_s.OuterContainer onClick={onSelect} selected={selected}>
            <_s.InnerRowContainer {...otherProps}>
                {children}
            </_s.InnerRowContainer>
            <Collapse isOpen={selected}>
                <_s.ControlBox>
                    <IconButton size="sm" variant="outlined">
                        <EditSharpIcon onClick={onEdit} />
                    </IconButton>
                    <IconButton color="danger" size="sm">
                        <DeleteIcon onClick={onDelete} />
                    </IconButton>
                </_s.ControlBox>
            </Collapse>
        </_s.OuterContainer>
    )
}
