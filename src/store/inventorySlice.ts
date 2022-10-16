import { Selector } from 'react-redux';
import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './root-reducer';
import { ICategory, IProduct } from '../interfaces';
import { FORM_FIELD_TYPE } from '../enums';

interface IInventoryList {
  [key: string]: ICategory;
}

interface IInventoryState {
  list: IInventoryList;
}

export const initialState: IInventoryState = {
  list: {},
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    createCategory: {
      reducer: (state: IInventoryState, action: PayloadAction<ICategory>) => {
        const { id: categoryId } = action.payload || {};
        if (categoryId) {
          state.list[categoryId] = action.payload;
        }
      },
      prepare: () => {
        const defaultFormFieldId = nanoid();
        const defaultFormField = { id: defaultFormFieldId, label: 'Title', type: FORM_FIELD_TYPE.TEXT };

        return {
          payload: {
            id: nanoid(),
            category: '',
            titleField: defaultFormFieldId,
            products: {},
            formFields: { [defaultFormFieldId]: defaultFormField },
          },
        };
      },
    },
    updateCategory: (state: IInventoryState, action: PayloadAction<ICategory>) => {
      const { id: categoryId } = action.payload;
      if (categoryId && state.list[categoryId]) {
        state.list[categoryId] = action.payload;
      }
    },
    deleteCategory: (state: IInventoryState, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      if (categoryId && state.list[categoryId]) {
        delete state.list[categoryId];
      }
    },
    deleteCategoryFormField: (state: IInventoryState, action: PayloadAction<{ categoryId: string; formFieldId: string }>) => {
      const { categoryId, formFieldId } = action.payload;
      if (categoryId && state.list[categoryId] && state.list[categoryId]?.formFields?.[formFieldId]) {
        delete state.list[categoryId]?.formFields?.[formFieldId];
      }
    },
    createInventoryItem: {
      reducer: (state: IInventoryState, action: PayloadAction<{ categoryId: string; item: IProduct }>) => {
        const { categoryId, item } = action.payload || {};
        if (categoryId && state.list[categoryId] && item?.id) {
          if (state.list[categoryId]?.products) {
            state.list[categoryId].products = { ...state.list[categoryId].products, [item.id]: item };
          } else {
            state.list[categoryId] = { ...state.list[categoryId], products: { [item.id]: item } };
          }
        }
      },
      prepare: (categoryId: string) => {
        const itemId = nanoid();
        const newInventoryItem = { id: itemId, fields: {} };

        return {
          payload: { categoryId, item: newInventoryItem },
        };
      },
    },
    updateInventoryItem: (
      state: IInventoryState,
      action: PayloadAction<{ categoryId: string; itemId: string; field: { id: string; value: string | number | Date | boolean } }>
    ) => {
      const { categoryId, itemId, field } = action.payload;
      if (
        categoryId &&
        state.list[categoryId] &&
        itemId &&
        state.list[categoryId].products?.[itemId] &&
        state.list[categoryId].products?.[itemId].fields
      ) {
        state.list[categoryId].products[itemId].fields[field.id] = field.value;
      }
    },
    deleteInventoryItem: (state: IInventoryState, action: PayloadAction<{ categoryId: string; itemId: string }>) => {
      const { categoryId, itemId } = action.payload;
      if (categoryId && itemId && state.list?.[categoryId]?.products?.[itemId]) {
        delete state.list?.[categoryId]?.products?.[itemId];
      }
    },
  },
});

const selectSelf: Selector<RootState, IInventoryState> = (state: RootState) => state.inventory;

export const selectInventoryList = createSelector(selectSelf, (state: IInventoryState) => {
  return state.list || {};
});

export const selectCategories = createSelector(selectSelf, (state: IInventoryState) => {
  if (state.list) {
    return Object.values(state.list);
  }

  return [];
});

export const selectCategoriesNavLinks = createSelector(selectCategories, (categories: Array<ICategory>) => {
  if (categories && categories.length) {
    return categories.filter(({ category }: ICategory) => category?.trim()).map(({ id, category }) => ({ id, category }));
  }

  return [];
});

export const selectCategory = (categoryId: string) =>
  createSelector(selectSelf, (state: IInventoryState) => {
    if (state.list && categoryId) {
      return state.list?.[categoryId];
    }

    return null;
  });

export const selectProducts = (categoryId: string) =>
  createSelector(selectSelf, (state: IInventoryState) => {
    if (state.list && categoryId) {
      return state.list?.[categoryId]?.products || {};
    }

    return {};
  });

export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;
