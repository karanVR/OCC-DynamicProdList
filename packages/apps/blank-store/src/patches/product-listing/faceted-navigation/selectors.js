/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {getCategories, isFilterMenuVisible} from '@oracle-cx-commerce/commerce-utils/selector';

export const getPageData = state => {
  const categories = getCategories(state);
  const filterMenuVisible = isFilterMenuVisible(state);

  return {
    categories,
    filterMenuVisible
  };
};
