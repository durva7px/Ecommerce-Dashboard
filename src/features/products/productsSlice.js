import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const saved = JSON.parse(localStorage.getItem('ecom-product-overrides') || '{}')
const api = 'https://dummyjson.com'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try { const response = await fetch(`${api}/products?limit=100`); if (!response.ok) throw new Error('Unable to load products'); return response.json() }
  catch (error) { return rejectWithValue(error.message) }
})
export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try { const response = await fetch(`${api}/products/categories`); if (!response.ok) throw new Error('Unable to load categories'); return response.json() }
  catch (error) { return rejectWithValue(error.message) }
})
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id, { rejectWithValue }) => {
  try { const response = await fetch(`${api}/products/${id}`); if (!response.ok) throw new Error('Product not found'); return response.json() }
  catch (error) { return rejectWithValue(error.message) }
})
const persist = (state) => localStorage.setItem('ecom-product-overrides', JSON.stringify(state.overrides))
const slice = createSlice({
  name: 'products', initialState: { items: [], categories: [], selected: null, status: 'idle', detailStatus: 'idle', error: '', overrides: saved },
  reducers: {
    addProduct: (state, action) => { const id = Date.now(); state.items.unshift({ ...action.payload, id, thumbnail: action.payload.image }); state.overrides[id] = { ...action.payload, id, thumbnail: action.payload.image }; persist(state) },
    updateProduct: (state, action) => { const index = state.items.findIndex((item) => item.id === action.payload.id); if (index >= 0) state.items[index] = { ...state.items[index], ...action.payload, thumbnail: action.payload.image || state.items[index].thumbnail }; state.overrides[action.payload.id] = action.payload; persist(state) },
    deleteProduct: (state, action) => { state.items = state.items.filter((item) => item.id !== action.payload); state.overrides[action.payload] = { deleted: true }; persist(state) },
  },
  extraReducers: (builder) => builder
    .addCase(fetchProducts.pending, (state) => { state.status = 'loading' })
    .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload.products.map((item) => state.overrides[item.id]?.deleted ? null : ({ ...item, ...(state.overrides[item.id] || {}) })).filter(Boolean); Object.values(state.overrides).filter((item) => item.id && !item.deleted && item.id > 100).forEach((item) => state.items.unshift(item)) })
    .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
    .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload.map((item) => typeof item === 'string' ? item : item.slug) })
    .addCase(fetchProduct.pending, (state) => { state.detailStatus = 'loading' })
    .addCase(fetchProduct.fulfilled, (state, action) => { state.detailStatus = 'succeeded'; state.selected = state.overrides[action.payload.id]?.deleted ? null : { ...action.payload, ...(state.overrides[action.payload.id] || {}) } })
    .addCase(fetchProduct.rejected, (state, action) => { state.detailStatus = 'failed'; state.error = action.payload })
})
export const { addProduct, updateProduct, deleteProduct } = slice.actions
export default slice.reducer
