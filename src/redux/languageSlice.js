import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        language: "Português",
        title: "Como está o tempo hoje?",
        placeholder: "Digite o nome da cidade",
        select: "Idioma selecionado:",
        nextDays: "Ver previsão para os próximos 5 dias",
        api: "pt_br",
        error: "Volte a página"
    },
}

export const LanguageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeLanguage } = LanguageSlice.actions

export default LanguageSlice.reducer