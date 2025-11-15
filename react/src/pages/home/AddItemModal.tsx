import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Input, Stack, Button } from '@mui/joy';
import { useState } from 'react';

interface AddItemModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: { personName: string; itemDescription: string; shoppingLink: string }) => Promise<void>;
}

export const AddItemModal = ({ open, setOpen, onSubmit }: AddItemModalProps) => {
    const [personName, setPersonName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [shoppingLink, setShoppingLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!personName.trim() || !itemDescription.trim()) {
            alert('Person name and item description are required');
            return;
        }

        setLoading(true);
        try {
            await onSubmit({
                personName,
                itemDescription,
                shoppingLink,
            });
            handleClose();
        } catch (error) {
            console.error('Failed to create item:', error);
            alert('Failed to create item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPersonName('');
        setItemDescription('');
        setShoppingLink('');
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
            >
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    sx={{ fontWeight: 'lg', mb: 2 }}
                >
                    Add Gift Request
                </Typography>
                <Stack gap={2}>
                    <Input
                        placeholder="Name"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        disabled={loading}
                    />
                    <Input
                        placeholder="Item Description"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        disabled={loading}
                    />
                    <Input
                        placeholder="Shopping Link"
                        value={shoppingLink}
                        onChange={(e) => setShoppingLink(e.target.value)}
                        disabled={loading}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </Stack>
                </Stack>
            </Sheet>
        </Modal>
    );
}
