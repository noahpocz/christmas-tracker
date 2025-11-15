import { Modal, Sheet, Stack, Input, Button } from '@mui/joy';
import { useState, useEffect } from 'react';
import type { GiftRequest } from '../../services/giftRequestApi';

interface EditItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number, data: { personName: string; itemDescription: string; shoppingLink: string }) => Promise<void>;
  item: GiftRequest | null;
}

export default function EditItemModal({ open, onClose, onSubmit, item }: EditItemModalProps) {
  const [personName, setPersonName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [shoppingLink, setShoppingLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setPersonName(item.personName);
      setItemDescription(item.itemDescription);
      setShoppingLink(item.shoppingLink || '');
    }
  }, [item]);

  const handleSubmit = async () => {
    if (!item) return;

    if (!personName.trim() || !itemDescription.trim()) {
      alert('Person name and item description are required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(item.id, {
        personName,
        itemDescription,
        shoppingLink,
      });
      handleClose();
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPersonName('');
    setItemDescription('');
    setShoppingLink('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Sheet
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 3,
          borderRadius: 8,
        }}
      >
        <h2>Edit Gift Request</h2>
        <Stack spacing={2}>
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
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
}
