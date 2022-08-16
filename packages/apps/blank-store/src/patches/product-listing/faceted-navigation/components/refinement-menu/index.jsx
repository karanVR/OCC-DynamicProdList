/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
 import React, { useContext, useState } from "react";

 import CaretDownIcon from "@oracle-cx-commerce/react-components/icons/caret-down";
 import CaretRightIcon from "@oracle-cx-commerce/react-components/icons/caret-right";
 import Minus from "@oracle-cx-commerce/react-components/icons/minus";
 import Plus from "@oracle-cx-commerce/react-components/icons/plus";
 import { ProductListingContext } from "@oracle-cx-commerce/react-widgets/contexts";
 import Link from "@oracle-cx-commerce/react-components/link";
 import RefinementList from "../refinement-list";
 import Styled from "@oracle-cx-commerce/react-components/styled";
 import css from "./styles.css";
 import { t } from "@oracle-cx-commerce/utils/generic";
 import Box from "@mui/material/Box";
 import Drawer from "@mui/material/Drawer";
 import Button from "@mui/material/Button";
 import Accordion from "@mui/material/Accordion";
 import AccordionSummary from "@mui/material/AccordionSummary";
 import AccordionDetails from "@mui/material/AccordionDetails";
 import Typography from "@mui/material/Typography";
 import FavouriteIcon from "../../../../../plugins/components/adbm-favourite-icon/index";
 import FormGroup from "@mui/material/FormGroup";
 import FormControlLabel from "@mui/material/FormControlLabel";
 import Checkbox from "@mui/material/Checkbox";
 import { noop } from "@oracle-cx-commerce/utils/generic";
 import { StoreContext } from "@oracle-cx-commerce/react-ui/contexts";
 import List from "@mui/material/List";
 import ListItem from "@mui/material/ListItem";
 import ListItemText from "@mui/material/ListItemText";
 import Grid from "@mui/material/Grid";
 import IconButton from "@mui/material/IconButton";
 
 // A menu for a single refinement.
 const RefinementMenu = (props) => {
   const {
     orientation,
     refinementMenuData,
     route,
     actionShowMore,
     formatPriceRange,
     onSelect,
   } = props;
 
   // A flag to determine whether refinement options are shown
   // Expand first three menus by default on desktop
   const [state, setState] = React.useState({
     top: false,
     left: false,
     bottom: false,
     right: true,
   });
   const { action } = useContext(StoreContext);
 
   const spaNavigate = (urlSearch) => {
     const url = new URL(
       `${window.location.protocol}${window.location.host}/search${urlSearch.currentTarget._wrapperState.initialValue}`
     );
     const onNavigate = noop;
     if (typeof window !== "undefined") {
       history.replaceState(
         {
           top: document.documentElement.scrollTop,
           left: document.documentElement.scrollLeft,
           previousPath: history.state && history.state.previousPath,
         },
         "",
         location.href
       );
 
       if (url.href === location.href) {
         history.replaceState(
           { previousPath: location.pathname + location.search },
           "",
           url.pathname + href
         );
       } else {
         history.pushState(
           { previousPath: location.pathname + location.search },
           "",
           url.href
         );
       }
 
       onNavigate();
 
       action("getApplicationPage", { url }).then(({ json }) => {
         if (json && json.status && json.status.status && json.status.location) {
           // Server return redirect location so navigate there
           spaNavigate(new URL(json.status.location, document.baseURI));
         }
 
         scrollTo({ top: 0, left: 0 });
       });
     }
   };
 
   const list = (anchor) => (
     <Box
       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 360 }}
       role="presentation"
     >
       <div>
         {refinementMenuData.map((refmenMenu, i) => {
           return (
             <>
               <Accordion>
                 <AccordionSummary
                   expandIcon={<img src="/file/general/atoms-icons-chevron-icf-down.svg" className="icf-down-ico"/>}
                   aria-controls="panel1a-content"
                   id="panel1a-header"
                 >
                   <Typography>{refmenMenu.displayName}</Typography>
                 </AccordionSummary>
                 <AccordionDetails>
                   {refmenMenu.refinements.map((refinement) => (
                     <FormGroup>
                       <FormControlLabel
                         control={<Checkbox />}
                         label={refinement.label}
                         value={refinement.link}
                         onChange={spaNavigate}
                       />
                     </FormGroup>
                   ))}
                 </AccordionDetails>
                 <div className="container-showMore">
                  <Link href="" className="showMoreLink">Show More</Link>
                 </div>
               </Accordion>
             </>
           );
         })}
       </div>
       <div class="flex-container">
        <div> 
          <Button
            className="clear-filter-btn"
            variant="text"
            onClick={() => {
              window.location.href = "search";
            }}         
          >
            Clear Filters
          </Button>
       </div>
        <div>
          <Button
            className="apply-filter-btn"
            variant="text"
            onClick={() => {
              window.location.href = "search";
            }}         
          >
            Apply Filters
          </Button>
        </div>
      </div>
      
     </Box>
   );
 
   return (
     <Styled id="RefinementMenu" css={css}>
       {/* onClick={toggleDrawer("right", false)} */}
 
       {
         <React.Fragment key="right">
           <Drawer anchor={"right"} open={state[orientation]}>
             <Grid item xs={12} md={6}>
               <List>
                 <ListItem
                   secondaryAction={
                     <IconButton edge="end" aria-label="close">
                      <img src="/file/general/atoms-icons-icf-close.svg" className="closeIcon"/>
                     </IconButton>
                   }
                   onClick={props.handleClose}
                   className="containerClosebtn"
                 >
                   <ListItemText primary="Filters" />
                 </ListItem>
               </List>
             </Grid>
             {list(orientation)}
           </Drawer>
         </React.Fragment>
       }
     </Styled>
   );
 };
 
 export default RefinementMenu; 