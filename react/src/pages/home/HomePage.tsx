import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import {Box, Button, IconButton} from '@mui/joy'
import AddIcon from '@mui/icons-material/Add';

import { RequestTable } from './RequestTable'
import { AddItemModal } from './AddItemModal'
import EditItemModal from './EditItemModal'
import { giftRequestApi } from '../../services/giftRequestApi'
import type { GiftRequest, CreateGiftRequest } from '../../services/giftRequestApi'
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

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
        background-color: white;
        
        border-bottom: 1px solid #d9d9d9;
    `
}

export const HomePage = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GiftRequest | null>(null);
    const [requests, setRequests] = useState<GiftRequest[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch all requests on mount
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const data = await giftRequestApi.getAllRequests();
            setRequests(data);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
            alert('Failed to load gift requests. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRequest = async (data: CreateGiftRequest) => {
        await giftRequestApi.createRequest(data);
        await fetchRequests();
    };

    const handleUpdateRequest = async (id: number, data: CreateGiftRequest) => {
        await giftRequestApi.updateRequest(id, data);
        await fetchRequests();
    };

    const handleDeleteRequest = async (id: number) => {
        try {
            await giftRequestApi.deleteRequest(id);
            await fetchRequests();
        } catch (error) {
            console.error('Failed to delete request:', error);
            alert('Failed to delete gift request. Please try again.');
        }
    };

    const handleTogglePurchased = async (id: number) => {
        try {
            await giftRequestApi.togglePurchased(id);
            await fetchRequests();
        } catch (error) {
            console.error('Failed to toggle purchased status:', error);
            alert('Failed to update purchased status. Please try again.');
        }
    };

    const handleEdit = (request: GiftRequest) => {
        setSelectedItem(request);
        setEditModalOpen(true);
    };

    return (
        <>
            <AddItemModal
                open={addModalOpen}
                setOpen={setAddModalOpen}
                onSubmit={handleCreateRequest}
            />
            <EditItemModal
                open={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedItem(null);
                }}
                onSubmit={handleUpdateRequest}
                item={selectedItem}
            />
            <_s.Container>
                <_s.Header>
                    🎅🏻 Secret Santa
                </_s.Header>

                <Box p={2} gap={2} sx={{ width: '100%', maxWidth: 600, margin: 'auto', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    <RequestTable
                        requests={requests}
                        onTogglePurchased={handleTogglePurchased}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                        loading={loading}
                    />
                    <Box gap={1} sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Button sx={{ flexGrow: 1 }} startDecorator={<AddIcon/>} onClick={() => setAddModalOpen(true)}>
                            Add Item
                        </Button>
                        <IconButton variant="solid" sx={{ backgroundColor: "purple" }}>
                            <EditSharpIcon />
                        </IconButton>
                        <IconButton variant="solid" color="danger">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

            </_s.Container>
        </>
    )
}