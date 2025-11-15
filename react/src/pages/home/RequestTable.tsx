import styled from '@emotion/styled'

import { Checkbox } from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';

import { giftRequests } from '../../utils/dummyData'

const COLUMN_WIDTHS = [
    33, 33, 33
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

export const RequestTable = () => {

    const rows = giftRequests.map(rowObject => (
        <_s.Row>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>{rowObject.name}</_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>
                <a target='_blank' href={rowObject.link} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {rowObject.description}
                    <LaunchIcon sx={{ fontSize: '1rem' }}/>
                </a>
            </_s.Cell>
            <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>
                <Checkbox checked={rowObject.purchased}/>
            </_s.Cell>
        </_s.Row>
    ))

    return (
        <_s.Table style={{width: '400px'}}>
            {/* Header */}
            <_s.Row style={{ backgroundColor: '#eaeaea', fontWeight: 600 }}>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[0]}>Person</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[1]}>Item</_s.Cell>
                <_s.Cell widthPercentage={COLUMN_WIDTHS[2]}>Purchased</_s.Cell>
            </_s.Row>

            {/* Contents */}
            {rows}
        </_s.Table>
    )
}