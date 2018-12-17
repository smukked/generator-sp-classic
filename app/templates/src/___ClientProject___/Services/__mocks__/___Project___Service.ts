import { PageModel } from '../../Models/PageModel';

export default class _<%= project %>Service {
    
    public getPages = async (listName: string): Promise<PageModel[]> => {
        let pages: PageModel[] = [];
        
        let page1 = new PageModel("");
        page1.Id = 1;
        page1.Title = "Page 1";
        pages.push(page1);

        let page2 = new PageModel("");
        page1.Id = 2;
        page1.Title = "Page 2";
        pages.push(page2);

        return Promise.resolve(pages);
    }

}
export const <%= project %>Service = new _<%= project %>Service();