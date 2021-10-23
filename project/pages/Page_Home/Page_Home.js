import React from 'react';
import { Link  } from 'react-router-dom';
//import PropTypes from 'prop-types';
import Categories from './../../components/Categories/Categories';

import './Page_Home.css';

class Page_Home extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <section>
        <div className="Page_Home">
          <div className="Page_Home_wrapper">
              <div className="Page_Home_block">
                <Link to="/catalog_avto">
                Автомобильные аккумуляторы
                </Link>
              </div>
            
              <div className="Page_Home_block">
                <Link to="/catalog_truck">
                Грузовые аккумуляторы
                </Link>
              </div>
            
            
              <div className="Page_Home_block">
              <Link to="/catalog_moto">  
                Мотоциклетные аккумуляторы
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
