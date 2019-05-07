import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import autosuggest from './components/Common/AutoSuggest/reducers';
import userdetail from './components/User/Detail/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  autosuggest,
  userdetail
});

export default rootReducer;
