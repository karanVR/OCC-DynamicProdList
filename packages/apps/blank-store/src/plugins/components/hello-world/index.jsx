/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
 import React, {useContext, useState, useEffect} from 'react';

 import NavBar from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/components/nav-bar';
 import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
 import Styled from '@oracle-cx-commerce/react-components/styled';
 import css from './styles.css';
  import {fetchMenuCategories} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/fetcher';
 import {useMenuCategoriesFetcher} from '@oracle-cx-commerce/react-widgets/category/collection-navigation/hook';
 import {useRootCategoriesData} from '@oracle-cx-commerce/react-widgets/category/collection-navigation-desktop/selectors';
 
 export const fetchers = [fetchMenuCategories];
//  import {AppBar, ToolBar, IconButton, Typography} from '@mui/material'
//  import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
 
 /**
  * Closes the drop down Menu, when escape key is pressed
  * @param  {Object} event
  */
 const onEscapeKeyDown = event => {
   if (event.key === 'Escape') {
     event.target.blur();
   }
 };
 
 /**
  * Prevents sticky drop down menu when link is clicked
  * @param  {Object} event
  */
 const onCategoryLinkClick = event => {
   if (event.target.tagName && event.target.tagName.toLocaleLowerCase() === 'a') {
     event.target.blur();
   }
 };


 
 /**
  * Collection Navigation Widget for desktop. Displays main menu in the nav bar and sub menu
  * in a drop down menu
  */
 const CollectionNavigationDesktop = props => {
   // contexts
   const store = useContext(StoreContext);
   // hooks
   useMenuCategoriesFetcher(store, props);
   const rootCategories = useRootCategoriesData();


   const [elem, setElem] = useState('')
   console.log('hey------------------------------------',rootCategories[0].childCategories[0].displayName)

   useEffect(()=>{
    // store('listproducts').then((response)=>{
    //   if(response){
        setElem(rootCategories[0].childCategories[0].displayName)
     })
    
 
   return (
     <Styled id="CollectionNavigationDesktop" css={css}>



      {/* <AppBar position='static'>
        
        <ToolBar>
          <IconButton >
            <CalendarViewWeekIcon/>
          </IconButton>
          <Typography component='div'>
            MENU
          </Typography>
        </ToolBar>

      </AppBar> */}



       <div 
         className="CollectionNavigationDesktop"
         role="menubar"
         tabIndex="-1"
         onKeyDown={onEscapeKeyDown}
         onClick={onCategoryLinkClick}
       >

        {/* <header className='header'>
          <a>
            <i></i>
          </a>
          <nav className='navbar'>
            <a href='#'>dklac</a>
            <a href='#'>szvv</a>
            <a href='#'>zfvzsfv</a>
            <a href='#'>afdvv</a>
          </nav>
        </header> */}


         <NavBar className= "nav" categories={rootCategories} {...props} />
         <p>{elem}</p>
       </div>
     </Styled>
   );
 };
 
 export default CollectionNavigationDesktop;
 