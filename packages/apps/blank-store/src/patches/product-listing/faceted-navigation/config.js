/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import * as resourceBundle from '@oracle-cx-commerce/resources';

import {buildConfigResources} from '@oracle-cx-commerce/resources/utils';
import {mergeDefaultConfig} from '@oracle-cx-commerce/react-widgets/config';

const configResourceKeys = ['configMultiSelectModeHelpText', 'configMultiSelectModeLabel'];

const mobileConfig = mergeDefaultConfig({
  properties: [
    {
      id: 'multiSelectMode',
      type: 'booleanType',
      name: 'multiSelectMode',
      helpTextResourceId: 'configMultiSelectModeHelpText',
      labelResourceId: 'configMultiSelectModeLabel',
      defaultValue: true
    }
  ],
  locales: buildConfigResources(resourceBundle, configResourceKeys)
});

export default mobileConfig;
