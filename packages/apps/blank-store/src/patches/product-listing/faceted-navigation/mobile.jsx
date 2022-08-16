/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useRef} from 'react';
import {
  formatPriceRangeUtil,
  getResetLink
} from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/utils';

import Breadcrumbs from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/components/breadcrumbs';
import FilterButton from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/components/filter-button';
import FilterHeader from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/components/filter-header';
import Link from '@oracle-cx-commerce/react-components/link';
import Navigation from './components/navigation';
import {PAGE_SEARCH_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import PropTypes from 'prop-types';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/mobile.css';
import {getPageData} from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/selectors';
import {t} from '@oracle-cx-commerce/utils/generic';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';

// Note: name of the search page will need to come from page layout
const route = PAGE_SEARCH_LINK;

const OPTIONS = {style: 'currency'};

/**
 * A component to display the filter menu
 *
 * @param props
 */
const FacetedNavigationMobile = props => {
  const {
    filterMenuVisible,
    categories,
    multiSelectMode = true,
    textBelowPrice,
    textDone,
    textPriceAndAbove,
    actionReset
  } = props;

  const {
    searchResults: {
      results: {totalNumRecs = 0, pagingActionTemplate = {}} = {},
      searchAdjustments: {originalTerms = []} = {},
      breadcrumbs: {refinementCrumbs = []} = {},
      facets: {navigation = []} = {}
    }
  } = useContext(ProductListingContext);

  const {action} = useContext(StoreContext);

  const originalSearch = originalTerms && originalTerms[0];

  // Filter out category to be rendered separately
  const filteredRefinementCrumbs = refinementCrumbs.filter(item => item.dimensionName !== 'product.category') || [];

  const categoryCrumb = refinementCrumbs.find(item => item.dimensionName === 'product.category');

  const filterCount = refinementCrumbs.length;

  // Format the price in appropriate currency
  const formatPrice = useNumberFormatter(OPTIONS);

  // Returns a formatted string representing a price range
  const formatPriceRange = useCallback(
    data => {
      return formatPriceRangeUtil(formatPrice, data, textBelowPrice, textPriceAndAbove);
    },
    [formatPrice, textBelowPrice, textPriceAndAbove]
  );

  const toggle = useRef();

  // When selecting or removing a filter, close the window if multiSelectMode is false
  const onSelect = useCallback(() => {
    if (!multiSelectMode) {
      toggle.current.checked = false;
    }
  }, [multiSelectMode]);

  // Shows or hides the Filter menu
  const toggleMenu = useCallback(() => {
    action('showFilterMenu', !toggle.current.checked);
  }, [action]);

  if (totalNumRecs > 0) {
    return (
      <Styled id="FacetedNavigationMobile" css={css}>
        <div
          className="FacetedNavigationMobile"
          style={{visibility: refinementCrumbs.length > 0 || navigation.length > 0 ? 'visible' : 'hidden'}}
        >
          <FilterButton toggleMenu={toggleMenu} filterCount={filterCount} {...props} />
          <input
            className="FacetedNavigationMobile__Toggle"
            id="FacetedNavigationMobile__Toggle"
            name="toggle"
            type="checkbox"
            ref={toggle}
            checked={filterMenuVisible}
          />
          <span
            className="FacetedNavigationMobile__Backdrop"
            onClick={toggleMenu}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleMenu();
              }
            }}
            role="button"
            tabIndex="0"
            aria-label={textDone}
          />
          <aside className="FacetedNavigationMobile__Modal">
            <span>
              <FilterHeader toggleMenu={toggleMenu} {...props} />
              <span className="FacetedNavigationMobile__Content">
                {filteredRefinementCrumbs.length > 0 && (
                  <Breadcrumbs
                    formatPriceRange={formatPriceRange}
                    route={route}
                    filteredRefinementCrumbs={filteredRefinementCrumbs}
                    {...props}
                  />
                )}

                <Navigation
                  categoryCrumb={categoryCrumb}
                  formatPriceRange={formatPriceRange}
                  route={route}
                  onSelect={onSelect}
                  {...props}
                />
              </span>
              {filteredRefinementCrumbs.length > 0 && (
                <Link
                  className="FacetedNavigationMobile__ResetLink"
                  href={getResetLink(refinementCrumbs, categories, pagingActionTemplate, originalSearch, route)}
                  onClick={onSelect}
                >
                  {t(actionReset)}
                </Link>
              )}
            </span>
          </aside>
        </div>
      </Styled>
    );
  }

  return <div />;
};

FacetedNavigationMobile.propTypes = {
  /**
   * The total number of product recommendations matching the search or category criteria
   */
  totalNumRecs: PropTypes.number,
  /**
   * An object containing the paging action template link
   */
  pagingActionTemplate: PropTypes.shape({}),
  /**
   * The list of originally searched terms
   */
  originalTerms: PropTypes.arrayOf(PropTypes.string),
  /**
   * The list of refinement breadcrumbs
   */
  refinementCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * The navigation object containing facets for search refinement
   */
  navigation: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * The list of product categories in the catalog
   */
  categories: PropTypes.shape({}),
  /**
   * A flag to determine whether the menu will automatically close each time the user selects a facet
   */
  multiSelectMode: PropTypes.bool.isRequired,
  /**
   * The resource string shown for prices below a certain value
   */
  textBelowPrice: PropTypes.string.isRequired,
  /**
   * The resource string shown for prices above a certain value
   */
  textPriceAndAbove: PropTypes.string.isRequired,
  /**
   * The resource string for resetting all the applied filters
   */
  actionReset: PropTypes.string.isRequired
};

FacetedNavigationMobile.defaultProps = {
  totalNumRecs: 0,
  pagingActionTemplate: {},
  originalTerms: [],
  refinementCrumbs: [],
  navigation: {},
  categories: {}
};

/**
 * Use a "connect" component to arrange for the component
 * to be rendered when its state changes.
 */
export default connect(getPageData)(FacetedNavigationMobile);
