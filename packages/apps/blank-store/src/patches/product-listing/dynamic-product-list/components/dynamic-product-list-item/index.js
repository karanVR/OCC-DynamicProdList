/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-list/components/dynamic-product-list-item/styles.css';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';
// import {Image} from 'react-bootstrap';
import Img from '@oracle-cx-commerce/react-components/img';

/**
 * A component for a product result item.
 *
 * @param {object} props.record The product result data, from the getSearchResults selector
 * @param {array} props.regions The regions to display in the product result, defined in page layout.
 */
const DynamicProductListItem = props => {
  const {record = {attributes: {}}, regions, labelSelect} = props;
  // Used to keep track of color swatch selections. Object with properties:
  // - colorParameters: a url segment with query parameters for pre-selecting the correct color variant
  // - imageUrl: url for the product image in the selected color variant
  const [selection, setSelection] = useState({});

  // Get product route
  let route = record.attributes['product.route'] && record.attributes['product.route'][0];
  let productId = record.attributes['product.repositoryId'];
  // let productDescription = record.attributes['product.description'];
  const productItemCode = record.attributes['W22-RFID.x_itemCode'];
  const navigator = useNavigator();

  if (route && route.charAt(0) === '/') {
    route = route.substring(1);
  }
  if (selection && selection['colorParameters']) {
    // If a color variant has been set by selecting a swatch, append this selection to the url
    route += selection['colorParameters'];
  }
  let configuratorRoute = './configurator/' + productId;

  // const handleOnClick = () => {
  //   localStorage.setItem('currentSelection', 'product');
  //   navigator(route);
  // };

  return (
    // Pass down product context to any children.
    <Styled id="DynamicProductListItem" css={css}>
      <ProductContext.Provider value={{record, route, selection, setSelection}}>
        <div className="DynamicProductListItem__Product Container__Section">
          <div>
          <img className="like_icon" src="/file/general/like.png"></img>
          </div>
          {regions.map((regionId, index) => (
            /*
                Using region ids as keys causes unnecessary DOM reconciliation.
                  
                https://reactjs.org/docs/reconciliation.html#keys
              */
            <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
          ))}
          {record.attributes['product.route'] && record.attributes['product.route'][0] && (
            <div className="hvr-bob">
              <img src={record.attributes['product.primaryFullImageURL'][0]} alt="" />
              <div className='prodName'>
                <h1>{record.attributes['product.displayName'][0]}</h1>
              </div>
              <p>{record.attributes['sku.maxActivePrice'][0]}$</p>
              <img className="box_icon" src="/file/general/icons8-rectangular-48.png"></img>
              <img className="gender_icon" src="/file/general/gender.PNG"></img>
              <img className="tick_icon" src="/file/general/icons8-done-24.png"></img>
              <p style={{marginLeft: '45px'}}>progressive</p>
            </div>
          )}
        </div>
      </ProductContext.Provider>
    </Styled>
  );
};

export default DynamicProductListItem;
