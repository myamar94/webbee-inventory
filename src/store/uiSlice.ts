import { createSelector, createSlice, Selector } from '@reduxjs/toolkit';
import { FORM_FIELD_TYPE } from '../enums';
import { RootState } from './root-reducer';

interface UIState {
  formFieldOptions: Array<{ label: string; eventKey: FORM_FIELD_TYPE }>;
}

const initialState: UIState = {
  formFieldOptions: [
    { eventKey: FORM_FIELD_TYPE.TEXT, label: 'Text' },
    { eventKey: FORM_FIELD_TYPE.DATE, label: 'Date' },
    { eventKey: FORM_FIELD_TYPE.NUMBER, label: 'Number' },
    { eventKey: FORM_FIELD_TYPE.CHECKBOX, label: 'Checkbox' },
  ],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});

const selectSelf: Selector<RootState, UIState> = (state: RootState) => state.ui;

export const selectFormFields = createSelector(selectSelf, (state: UIState) => state.formFieldOptions);
export default uiSlice.reducer;
