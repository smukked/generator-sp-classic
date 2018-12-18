import { AppDispatcher } from '../Dispatcher/Dispatcher';
import { <%= project %>Service } from '../Services/<%= project %>Service';
import { StateActionTypes } from "../Constans/StateActionTypes";
import PageModel from '../Models/PageModel';

export const StateActions = {
  
  getPages: async (listName: string): Promise<PageModel[]> => {
    
    AppDispatcher.dispatch({
      actionType: StateActionTypes.IS_LOADING,
      isLoading: true
    });

    let pages = await DemoService.getPages(listName);
    AppDispatcher.dispatch({
      actionType: StateActionTypes.GET_PAGES,
      pages: pages
    });

    AppDispatcher.dispatch({
      actionType: StateActionTypes.IS_LOADING,
      isLoading: false
    });

    return pages;
  }
};