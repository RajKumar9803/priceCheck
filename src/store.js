import { legacy_createStore as createStore } from 'redux';
import rootReducer from './redux/reducers/main';

const store = createStore(
    rootReducer
)
export default store;