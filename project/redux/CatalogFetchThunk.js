import isoFetch from 'isomorphic-fetch';

import { data_load, loading_error_show, data_set } from "./CatalogAC";

function CatalogThunkAC(dispatch) {
    return function() {
        dispatch( data_load() );
        isoFetch("https://alex-trofimova.github.io/FD3-Trofimova/public/productsData.json")
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                dispatch( data_set(data) );
                console.log(data);
            })
            .catch( (error) => {
                console.error(error);
                dispatch( loading_error_show() );
            })
        ;
    }
}

export {CatalogThunkAC};
