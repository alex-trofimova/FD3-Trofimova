import React from 'react';
import { Link  } from 'react-router-dom';

import './Page_Home.css';

class Page_Home extends React.PureComponent {

  render() {

    return (
      <section>
        <div className="Page_Home">
          <div className="Page_Home_wrapper">
          <div className="Page_Home_block"> 
            <Link to="/catalog">
              <div className="Page_Home_item Page_Home_avto">  
              </div>
              <div className="Page_Home_itemName">Автомобильные аккумуляторы</div>
            </Link>
          </div>

          <div className="Page_Home_block">
            <Link to="/catalog">
              <div className="Page_Home_item Page_Home_truck">  
              </div>
              <div className="Page_Home_itemName">Грузовые аккумуляторы</div>
            </Link>
          </div>

          <div className="Page_Home_block">
            <Link to="/catalog">
              <div className="Page_Home_item Page_Home_moto">  
              </div>
              <div className="Page_Home_itemName">Мотоциклетные аккумуляторы</div>
            </Link>
          </div>
            
          </div>
        </div>
      </section>
    )
    ;
  }
}

export default Page_Home;