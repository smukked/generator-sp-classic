import { PageModel } from '../Models/PageModel';
import { sp } from "@pnp/sp";
import { dateAdd } from "@pnp/common";
import 'core-js/es6/array';
import 'core-js/es6/promise';
import 'whatwg-fetch';

export default class _<%= project %>Service {

    constructor() {
        sp.setup({
            sp: {
                headers: {
                    "Accept": "application/json; odata=verbose"
                }
            }
        });
    }

    public getPages = async (listName: string): Promise<PageModel[]> => {
        try {
            const selects: any = ["Id", "Title"];
            let pages: PageModel[] = await sp.web.lists.getByTitle(listName).items
                .select(selects)
                .usingCaching({
                    expiration: dateAdd(new Date(), "minute", 20),
                    key: "pages",
                    storeName: "local"
                })
                .get();

            return pages;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}
export const <%= project %>Service = new _<%= project %>Service();