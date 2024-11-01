import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    text: string;
}

const initialState: ModalState = {
    isOpen: false,
    text: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.text = action.payload; // Устанавливаем текст модалки при открытии
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.text = ''; // Сбрасываем текст при закрытии
        },
    },
});

// Экспортируем действия и редюсер   хелпаните кто-нибудь
export const { openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
