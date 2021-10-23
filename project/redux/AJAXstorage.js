"use strict";
import $ from 'jquery';

let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let stringName = 'TROFIMOVA_PROJECT_VARTA_CART';
let updatePassword;

function saveDataToAJAX(state) {
    const {cart} = state;
    updatePassword=Math.random();
    $.ajax( {   url : ajaxHandlerScript, 
                type : 'POST', dataType:'json',
                data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                cache : false,
                success : lockGetReady, error : errorHandler
                }
            );

    function lockGetReady(callresult) {
        if ( callresult.error!=undefined )
             alert(callresult.error);
        else {
            
            $.ajax( {
                    url : ajaxHandlerScript, 
                    type : 'POST',  dataType:'json',
                    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(cart), p : updatePassword },
                    cache : false,
                    success : updateReady, error : errorHandler
                }
            );
         }
     }

    function updateReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }
}

function loadDataFromAJAX() {
    
    $.ajax(
        {
            url : ajaxHandlerScript, 
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false, 
            success : readReady, error : errorHandler
        }
    );
    
    function readReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            return JSON.parse(callresult.result);
        }
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }
}



export {
    saveDataToAJAX, loadDataFromAJAX
}

