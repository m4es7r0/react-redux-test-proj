import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp()
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState: filtersAdapter.getInitialState({
        filtersLoadingStatus: 'idle',
        activeFilter: 'all'
    }),
    reducers: {
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.rejected, (state) => { state.filtersLoadingStatus = 'error' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload)
            })
            .addDefaultCase(() => { })
    }
});

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)

export default filtersSlice.reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = filtersSlice.actions;