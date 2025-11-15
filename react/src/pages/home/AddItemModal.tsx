import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import { Input, Stack } from '@mui/joy'

interface AddItemModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const AddItemModal = ({ open, setOpen }: AddItemModalProps) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
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
                <Stack gap={1}>
                    <Input placeholder="Name"/>
                    <Input placeholder="Item Description"/>
                    <Input placeholder="Shopping Link"/>
                </Stack>
            </Sheet>
        </Modal>
    );
}
