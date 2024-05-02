// reducers.js
import { SET_FILTER } from '../Action-creators/actions';

// reducers.js
const initialState = {
    filters: [
        { name: 'Roles', values: '' },
        { name: 'Number of Employees', values: '' },
        { name: 'Experience', values: '' },
        { name: 'Remote', values: '' },
        { name: 'Minimum Base Pay Salary', values: '' },
    ],
};


const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                filters: state.filters.map((filter) =>
                    filter.name === action.payload.filterName
                        ? { ...filter, values: action.payload.values }
                        : filter
                ),
            };
        default:
            return state;
    }
};

export default filtersReducer;
