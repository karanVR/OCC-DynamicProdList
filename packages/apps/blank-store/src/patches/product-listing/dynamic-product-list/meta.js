/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';
import {buildResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';
import config from '@oracle-cx-commerce/react-widgets/profile/account-address-book/config';
import * as zh_CN from './locales/zh_CN';
import * as en from './locales/en';

const widgetResourceKeys = [
  'youSearchedText',
  'andText',
  'resultsFoundText',
  'showingText',
  'productsOfText',
  'filterText',
  'clickText',
  'hereText',
  'seeProductsText',
  'noSearchResultsText',
  'txtSearch',
  'labelSelect'
];

const mergeResourceBundle = {
  en: {...resourceBundle.en, ...en},
  zh_CN: {...resourceBundle.zh_CN, ...zh_CN}
};
console.log('PLP');
console.log(buildResources(mergeResourceBundle, widgetResourceKeys));

export const DynamicProductList = {
  packageId: '@oracle-cx-commerce/react-widgets',
  resources: buildResources(mergeResourceBundle, widgetResourceKeys),
  type: 'container',
  pageTypes: ['search', 'category']
};
