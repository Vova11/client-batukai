import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  showLoading,
  hideLoading,
  getAllProducts,
} from '../allProducts/allProductsSlice'

const initialState = {
  isLoading: false,
  filtered_products: [],
  all_products: [],
  grid_view: true,
  totalProducts: 0,
  numOfPages: 1,
  currentPage: 1,
  page: 1,
  sort: 'price-lowest',
  companies: [],
  filters: {
    search: '',
    company: 'all',
    category: 'all',
    nicotine: 'all',
    colour: '',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

export const getFilterProducts = createAsyncThunk(
  'filter/getFilterProducts',
  async (filters, thunkAPI) => {
    try {
      const productsResponse = await thunkAPI.dispatch(getAllProducts(filters))
      return productsResponse
    } catch (error) {
      throw error
    }
  }
)

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGridView: (state) => {
      state.grid_view = true
    },
    setListView: (state) => {
      state.grid_view = false
    },
    updateSort: (state, action) => {
      state.sort = action.payload
      // Sort the products based on the selected sort value
      let tempProducts = [...state.filtered_products]
      // Update filtered_products with the sorted array
      state.filtered_products = tempProducts
    },
    updateFilters: (state, action) => {
      console.log('Vo filter Slice')
      const { name, value } = action.payload
      // Update state.filters with the new value for the specified filter
      state.filters[name] = value
      // Convert value to number for numerical fields
      // const numericalFields = ['min_price', 'max_price', 'price'];
      // if (numericalFields.includes(name)) {
      // 	state.filters[name] = Number(value);
      // }
      // const { search, category, company, color, price, shipping, nicotine } =
      // 	state.filters;
      // let tempProducts = [...state.all_products];
      // Apply the filter logic based on the filter name

      // filter by text
      // if (search) {
      // 	tempProducts = [...tempProducts].filter((product) =>
      // 		product.name.toLowerCase().startsWith(search.toLowerCase())
      // 	);
      // }

      // if (company !== 'all') {
      // 	tempProducts = [...tempProducts].filter(
      // 		(product) => company === 'all' || product.company === company
      // 	);
      // }

      // tempProducts = tempProducts.filter((product) => product.price <= price);

      // state.filtered_products = tempProducts;
    },
    updateStateByBrandProducts: (state, action) => {
      console.log(action.payload)
      const { companies,  products } = action.payload
      state.filtered_products = products
      console.log(companies);
      // If 'companies' is an array, merge it with state.companies using the spread operator
      // If 'companies' is a single object, use state.companies.push(companies) instead
      // state.companies = [...companies]; 
    },
    clearFilters: (state) => {
      state.filtered_products = state.all_products
      const updatedFilters = {
        ...state.filters,
        search: '',
        nicotine: 'all',
        company: 'all',
        category: 'all',
        price: state.filters.max_price,
      }
      // Update state.filters with the new filters object
      state.filters = updatedFilters
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        // pagination
        state.totalProducts = action.payload.totalProducts
        state.numOfPages = action.payload.numOfPages
        const onlyPublishedProducts = action.payload.products.filter(
          (product) => product.published === true
        )

        state.all_products = [...onlyPublishedProducts]
        state.filtered_products = [...onlyPublishedProducts]

        if (action.payload.companies) {
          state.companies = [
            'all',
            ...action.payload.companies.map((company) => company.name),
          ]
        } else {
          state.companies = ['all']
        }

        let maxPrice = onlyPublishedProducts.map((p) => p.price)
        maxPrice = Math.max(...maxPrice)
        const updatedFilters = {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        }
        // Update state.filters with the new filters object
        state.filters = updatedFilters
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true
      })
  },
})

export const {
  setGridView,
  setListView,
  updateSort,
  updateFilters,
  clearFilters,
  updateStateByBrandProducts,
} = filterSlice.actions

export default filterSlice.reducer
