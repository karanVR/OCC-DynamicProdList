/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ProductListingContext } from '@oracle-cx-commerce/react-widgets/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-list/styles.css';
import DynamicProductListItem from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-list/components/dynamic-product-list-item';

/**
 * Lists the results in table format, dependent on sort by button.
 *
 * @param props
 */
const DynamicProductList = props => {
  const { className = '', regions = [] } = props;

  // Product Listing results data
  const {
    searchResults: { results },
    mobile
  } = useContext(ProductListingContext);

  // Otherwise display table of search results
  return (
    <Styled id="DynamicProductList" css={css}>
      <div
        className={`DynamicProductList__Table ${mobile ? 'DynamicProductList__Table--Mobile' : 'DynamicProductList__Table--Desktop'
          } ${className}`}
      >
        {results &&
          results.records &&
          results.records.map(record => {
            const productId = record.attributes['product.repositoryId'] && record.attributes['product.repositoryId'][0];
            const skuId = record.attributes['sku.repositoryId'] && record.attributes['sku.repositoryId'][0];

            // Use skuId as key if available to ensure unique IDs, otherwise use product ID
            const productKey = skuId || productId;

            return <DynamicProductListItem key={productKey} record={record} regions={regions} />;
          })}
        {/* Pre-fetch ListItem to avoid latency */}
        <span style={{ display: 'none' }}>
          <DynamicProductListItem record={{ attributes: {} }} regions={regions} />
        </span>
      </div>
    </Styled>
  );
};

DynamicProductList.propTypes = {
  /**
   * The css class name
   */
  className: PropTypes.string,
  /**
   * The page regions
   */
  regions: PropTypes.arrayOf(PropTypes.string)
};

DynamicProductList.defaultProps = {
  className: '',
  regions: []
};

export default DynamicProductList;
