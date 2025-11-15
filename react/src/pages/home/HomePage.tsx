import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add';

import { RequestTable } from './RequestTable'
import { AddItemModal } from './AddItemModal'
import EditItemModal from './EditItemModal'
import { giftRequestApi } from '../../services/giftRequestApi'
import type { GiftRequest, CreateGiftRequest } from '../../services/giftRequestApi'

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
                    <Button startDecorator={<AddIcon/>} onClick={() => setAddModalOpen(true)}>
                        Add
                    </Button>
                </_s.Header>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <RequestTable
                        requests={requests}
                        onTogglePurchased={handleTogglePurchased}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                        loading={loading}
                    />
                </div>
            </_s.Container>
        </>
    )
}