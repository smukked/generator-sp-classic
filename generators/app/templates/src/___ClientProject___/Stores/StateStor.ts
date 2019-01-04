import { EventEmitter } from 'events';
import { AppDispatcher} from '../Dispatcher/Dispatcher';
import { StateActionTypes } from '../Constans/StateActionTypes';
import PageModel from '../Models/PageModel';

const CHANGE_EVENT = 'change';
let _pages: PageModel[];
let _isLoading = false;

export default class _StateStor extends EventEmitter {

    public addChangeListener(callback: () => void) {
        this.on(CHANGE_EVENT, callback);
    }

    public removeChangeListener(callback: () => void) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    public emitChange() {
        this.emit(CHANGE_EVENT);
    }

    public getPages(): PageModel[] {
        return _pages;
    }

    public isLoading = (): boolean => {
        return _isLoading;
    }

}
export const StateStor = new _StateStor();

/* istanbul ignore next */
export const stateDispatcher = AppDispatcher.register((action) => {
    switch (action.actionType) {
        case StateActionTypes.GET_PAGES:
            _pages = action.pages;
            StateStor.emitChange();
            break;
        case StateActionTypes.IS_LOADING:
            _isLoading = action.isLoading;
            StateStor.emitChange();
            break;
        default:
            break;
    }
});
