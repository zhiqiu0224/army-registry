import { combineReducers } from 'redux';
import soldierList from './soldierList';
import validSuperiors from './validSuperiors';
import allSoldiers from './allSoldiers';
import linkSuperior from './linkSuperior';
import linkDs from './linkDs';


const reducer = combineReducers({
    soldierList,
    validSuperiors,
    allSoldiers,
    linkSuperior,
    linkDs
});

export default reducer;