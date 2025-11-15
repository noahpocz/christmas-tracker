import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { RequestTable } from './RequestTable'
import { AddItemModal } from './AddItemModal'

const _s = {
    Container: styled.div`
        width: 100vw;
        height: 100vh;
    `,

    Header: styled.div`
        width: 100vw;
        
        display: flex;
        justify-content: center;
        gap: 12px;
        
        padding: 12px;
        box-sizing: border-box;
    `
}

export const HomePage = () => {
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <>
        <AddItemModal open={modalOpen} setOpen={setModalOpen}/>
        <_s.Container>
            <_s.Header>
                <Button startDecorator={<AddIcon/>} onClick={() => setModalOpen(true)}>Add</Button>
                <Button variant="soft" startDecorator={<EditIcon/>}>Edit</Button>
            </_s.Header>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <RequestTable />
            </div>
        </_s.Container>
        </>
    )
}