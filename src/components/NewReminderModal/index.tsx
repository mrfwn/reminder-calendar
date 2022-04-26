import { useCallback, useState } from "react";
import { Container } from "./styles"
import Modal from 'react-modal';
import { ManagerReminderForm } from "../ManagerReminderForm";

export const NewReminderModal = () => {

    const [isManagerRemindersModalOpen, setIsManagerRemindersModalOpen] = useState(false);
    const handleOpenManagerRemindersModal = useCallback(() => {
        setIsManagerRemindersModalOpen(true);
    }, [setIsManagerRemindersModalOpen])

    const handleCloseManagerRemindersModal = () => {
        setIsManagerRemindersModalOpen(false);
    }

    return (
        <Container>
            <button onClick={handleOpenManagerRemindersModal}>Add new Reminder</button>
            <Modal
                isOpen={isManagerRemindersModalOpen}
                onRequestClose={handleCloseManagerRemindersModal}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <ManagerReminderForm
                    title="Add new reminder"
                    handleCloseManagerRemindersModal={handleCloseManagerRemindersModal}
                />
            </Modal>
        </Container>
    )
}