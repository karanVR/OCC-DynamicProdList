/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { ProductListingContext } from '@oracle-cx-commerce/react-widgets/contexts';
import { StoreContext, PaginationContext } from '@oracle-cx-commerce/react-ui/contexts';
import { getComponentData } from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-listing-container/selectors';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import css from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-listing-container/styles.css';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import PageLoader from '@oracle-cx-commerce/react-components/page-loader';
import CategoryPlaceholder from '@oracle-cx-commerce/react-widgets/product-listing/dynamic-product-list/components/category-placeholder';
import { fetchSearchResults } from '@oracle-cx-commerce/fetchers/search';
import { useSearchResultsFetcher } from '@oracle-cx-commerce/fetchers/search/hooks';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
import { PAGINATION_PARAM_PAGE } from '@oracle-cx-commerce/commerce-utils/constants/page-links';
//import PlusButton from '../../../plugins/components/adbm-plus-button/'
// The server-side rendering framework checks each component for a "fetchers" array
// to determine what actions to take in order to populate the initial state. For this
// component, we need the initial search results.
export const fetchers = [fetchSearchResults];

/**
 * A container that holds all the dynamic product listing related widgets.
 */
const DynamicProductListingContainer = props => {
  const { regions = [], mobile, searchResults, contextId, pageId, pageType, searchServicePath } = props;
  const { 'endeca:redirect': { link: { url: redirectUrl } = {} } = {}, results = {} } = searchResults;
  const { firstRecNum, recsPerPage, totalNumRecs } = results;

  // Fetch the latest search results during client-side rendering.
  const store = useContext(StoreContext);
  useSearchResultsFetcher(store, { contextId, pageId, pageType, searchServicePath });

  const goToPage = useNavigator();

  const onPageChange = (_, pageNumber) => {
    const url = new URL(pageId, 'http://localhost');
    url.searchParams.set(PAGINATION_PARAM_PAGE, pageNumber);

    goToPage(url.pathname.substring(1) + url.search);
  };

  // If a redirect is returned on the search response, load redirect url
  useEffect(() => {
    if (redirectUrl) {
      if (redirectUrl.startsWith('/')) {
        // Convert to relative url
        goToPage(redirectUrl.substring(1));
      } else {
        goToPage(redirectUrl);
      }
    }
  }, [goToPage, redirectUrl]);

  return (
    <Styled id="DynamicProductListingContainer" css={css}>
      <div className="DynamicProductListingContainer">
        <PageLoader show={isEmptyObject(results) || redirectUrl}>
          <CategoryPlaceholder mobile={mobile} />
        </PageLoader>
        <section className={`${mobile ? '' : 'DynamicProductListingContainer__Section--Desktop'}`}>
          <ProductListingContext.Provider value={{ searchResults, searchServicePath, mobile }}>
            <PaginationContext.Provider
              value={{
                currentOffset: firstRecNum - 1,
                limit: recsPerPage,
                totalRecords: totalNumRecs,
                pageId,
                pageParam: PAGINATION_PARAM_PAGE,
                onPageChange
              }}
            >
              {regions.map((regionId, index) => (
                /*
              Using region ids as keys causes unnecessary DOM reconciliation.
 
              https://reactjs.org/docs/reconciliation.html#keys
              */
                <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
              ))}
            </PaginationContext.Provider>
          </ProductListingContext.Provider>
        </section>
      </div>
    </Styled>
  );
};

DynamicProductListingContainer.propTypes = {
  /**
   * An object containing a url to redirect the page to for the searched term
   */
  redirect: PropTypes.shape({ link: PropTypes.shape({ url: PropTypes.string }) }),
  /**
   * The product results
   */
  results: PropTypes.shape({}),
  /**
   * The page regions
   */
  regions: PropTypes.arrayOf(PropTypes.string),
  /**
   * A flag for whether the current device is mobile
   */
  mobile: PropTypes.bool.isRequired,
  /**
   * The context id
   */
  contextId: PropTypes.string,
  /**
   * The current page id
   */
  pageId: PropTypes.string.isRequired,
  /**
   * The current page type
   */
  pageType: PropTypes.string.isRequired
};

DynamicProductListingContainer.defaultProps = {
  redirect: {},
  results: null,
  regions: [],
  contextId: null
};

export default connect(getComponentData)(DynamicProductListingContainer);
