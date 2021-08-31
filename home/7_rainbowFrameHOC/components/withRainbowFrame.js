import React from 'react';


function withRainbowFrame(colors) {
    let colorsHash=colors;
    let modComp;
    let wrapComp = function(Component) {
        console.log(colorsHash[0]);
        modComp = props => (
            <div style={{border:"solid 4px "+colorsHash[0], padding:"4px"}}>
                <Component {...props} />
            </div>
        );
        colorsHash = colorsHash.slice(1);

        if (colorsHash.length==1) {
            return modComp;
        }

        else {
            return wrapComp(modComp);
        }

    };

    return wrapComp;                   

}



export { withRainbowFrame };