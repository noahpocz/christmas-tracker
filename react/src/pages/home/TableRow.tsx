import styled from '@emotion/styled'

import { Box } from '@mui/joy'

const _s = {
    Container: styled(Box)`
        display: flex;
        width: 100%;
        background-color: white;
        
        border-bottom: 1px solid #d9d9d9;
        &:last-child {
            border-bottom: none;
        }
    `
}

interface TableRowProps {
    children: React.ReactNode
}

export const TableRow = ({ children }: TableRowProps) => {
    return (
        <_s.Container>
            {children}
        </_s.Container>
    )
}
