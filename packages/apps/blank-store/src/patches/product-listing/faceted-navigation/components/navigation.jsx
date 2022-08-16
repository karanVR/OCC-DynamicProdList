/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useContext} from 'react';

import CategoryMenu from '@oracle-cx-commerce/react-widgets/product-listing/faceted-navigation/components/category-menu';
import {ProductListingContext} from '@oracle-cx-commerce/react-widgets/contexts';
import RefinementMenu from './refinement-menu';

// A component for listing search refinement menus.
const Navigation = props => {
  const {categoryCrumb} = props;
  const {
    searchResults: {facets: {navigation = []} = {}},
    mobile
  } = useContext(ProductListingContext);

  return (
    <RefinementMenu refinementMenuData={navigation} {...props} />
    // <>
    // <RefinementMenu navigation={navigation} {...props} />
    //   {!navigation.find(item => item.dimensionName === 'product.category') && categoryCrumb && (
    //     <>
    //       {mobile || <hr className="Navigation__Divider" />}
    //       <CategoryMenu categoryCrumb={categoryCrumb} {...props} />
    //     </>
    //   )}
    //   {navigation.map((refinementMenuData, i) => {
    //     return (
    //       <div key={refinementMenuData.dimensionName}>
    //         <>
    //         <RefinementMenu refinementMenuData={refinementMenuData} navigation={navigation} index={i} {...props} />
    //         </>
    //         {refinementMenuData.dimensionName === 'product.category' ? (
    //           <>
    //             {mobile || <hr className="Navigation__Divider" />}
    //             <CategoryMenu categoryRefinement={refinementMenuData} {...props} />
    //           </>
    //         ) : (
    //           <>
    //             {mobile || <hr className="Navigation__Divider" />}
    //             <RefinementMenu refinementMenuData={refinementMenuData} index={i} {...props} />
    //           </>
    //         )}
    //       </div>
    //     );
    //   })}
    // </>
  );
};

export default Navigation;
