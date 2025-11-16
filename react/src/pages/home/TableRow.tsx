import styled from '@emotion/styled'

import { Box, IconButton } from '@mui/joy'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';

import { Collapse } from '../../components/Collapse.tsx'

const _s = {
    OuterContainer: styled(Box)`
        margin: ${props => props.selected ? '12px 0' : '0'};
        border-radius: ${props => props.selected ? '5px' : '0'};
        overflow: hidden;
        transition: all 0.3s;
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
        padding: 6px;

        border-radius: 0 0 5px 5px;
        background-color: white;
    `
}

export const TableRow = ({ children, selected = false, onEdit, onDelete, ...otherProps }) => {
    return (
        <_s.OuterContainer selected={selected}>
            <_s.InnerRowContainer {...otherProps}>
                {children}
            </_s.InnerRowContainer>
            <Collapse isOpen={selected}>
                <_s.ControlBox gap={1}>
                    <IconButton variant="solid" size="sm" onClick={onEdit}>
                        <EditSharpIcon />
                    </IconButton>
                    <IconButton variant="solid" color="danger" size="sm" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </_s.ControlBox>
            </Collapse>
        </_s.OuterContainer>
    )
}
