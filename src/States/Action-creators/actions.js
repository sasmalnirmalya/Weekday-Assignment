export const SET_FILTER = 'SET_FILTER';

export const setFilter = (filterName, values) => ({
    type: SET_FILTER,
    payload: { filterName, values },
});

export const initializeFilters = (filters) => ({
    type: 'INITIALIZE_FILTERS',
    payload: filters,
});