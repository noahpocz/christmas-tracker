import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Box, Button, IconButton } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add';
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

import { RequestTable } from './RequestTable'
import { AddItemModal } from './AddItemModal'
import EditItemModal from './EditItemModal'

import { giftRequestApi } from '../../services/giftRequestApi'
import type { GiftRequest, CreateGiftRequest } from '../../services/giftRequestApi'

const _s = {
    Container: styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    `,

    TableContainer: styled(Box)`
        flex-grow: 1;
        width: 100%;
        max-width: 600px;
        
        margin: auto;
        display: flex;
        flex-direction: column;
        
        box-sizing: border-box;
        padding: 12px 12px 72px 12px;
    `,

    Controls: styled(Box)`
        position: fixed;
        bottom: 0;
        
        width: 100%;
        height: 60px;
        
        display: flex;
        justify-content: center;
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
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
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
        setSelectedItemIds([]);
        await fetchRequests();
    };

    const handleUpdateRequest = async (id: number, data: CreateGiftRequest) => {
        await giftRequestApi.updateRequest(id, data);
        await fetchRequests();
    };

    const handleDelete = async () => {
        try {
            for (let i = 0; i < selectedItemIds.length; i++) {
                const id = selectedItemIds[i];
                await giftRequestApi.deleteRequest(id);
            }
            setSelectedItemIds([]);
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

    const handleEdit = () => {
        const id = selectedItemIds[0];
        const giftRequest = requests.filter((item) => item.id === id)[0];
        setSelectedItem(giftRequest);
        setEditModalOpen(true);
        setSelectedItemIds([]);
    };

    const handleSelectItem = (id: number) => {
        setSelectedItemIds([...selectedItemIds, id]);
    }

    const handleDeselectItem = (id: number) => {
        setSelectedItemIds(selectedItemIds.filter(el => el !== id));
    }

    const editEnabled = selectedItemIds.length === 1;
    const deleteEnabled = selectedItemIds.length >= 1;

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
                <_s.TableContainer>
                    <RequestTable
                        requests={requests}
                        selectedItemIds={selectedItemIds}
                        onSelectItem={handleSelectItem}
                        onDeselectItem={handleDeselectItem}
                        onTogglePurchased={handleTogglePurchased}
                        loading={loading}
                    />
                </_s.TableContainer>
                <_s.Controls>
                    <Box gap={1} sx={{ padding: '12px', backgroundColor: 'white', borderTop: '1px solid #d9d9d9', boxSizing: 'border-box', maxWidth: '600px', display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Button sx={{ flexGrow: 1 }} startDecorator={<AddIcon/>} onClick={() => setAddModalOpen(true)}>
                            Add Item
                        </Button>
                        <IconButton
                            onClick={() => handleEdit()}
                            disabled={!editEnabled}
                            variant="solid"
                            sx={{ backgroundColor: "purple" }}>
                            <EditSharpIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDelete()}
                            disabled={!deleteEnabled}
                            variant="solid"
                            color="danger">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </_s.Controls>
            </_s.Container>
        </>
    )
}