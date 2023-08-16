#npm start

export const getFilterProducts = createAsyncThunk(
'filter/getFilterProducts',
async (filters, thunkAPI) => {
try {
const productsResponse = await fetchDataWithFilters(filters);
return productsResponse;
} catch (error) {
throw error;
}
}
);
