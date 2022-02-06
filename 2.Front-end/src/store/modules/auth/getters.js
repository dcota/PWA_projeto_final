/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of getters to return the stored token, the state of the autentication and the user level
*/

import { 
    GET_USER_TOKEN_GETTER, 
    IS_USER_AUTHENTICATED_GETTER , 
    GET_USER_LEVEL_GETTER
} from "../../storeconstants";

export default {
    [GET_USER_TOKEN_GETTER]: state => {
        return state.token
    },
    [IS_USER_AUTHENTICATED_GETTER]: state => {
        return !!state.token
    },

    //noov
    [GET_USER_LEVEL_GETTER]: state => {
        return state.level
    }
}