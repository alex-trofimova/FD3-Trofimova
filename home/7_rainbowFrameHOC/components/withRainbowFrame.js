import React from 'react';


function withRainbowFrame(colors) {

    return function(Component) {
        let func = props => {
            let z=<Component {...props} />;
            colors.forEach( elem => 
                {
                    z = <div style={{border:"solid 4px "+elem, 
                             textAlign:'center', padding:"4px"}}
                        >{z}</div>
                }
            );    
            return (<div className="Rainbow">{z}</div>)
        }
        return func;
    };
}

export { withRainbowFrame };