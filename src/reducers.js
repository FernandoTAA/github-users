import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import autosuggest from './components/Common/AutoSuggest/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  autosuggest
});

export default rootReducer;
