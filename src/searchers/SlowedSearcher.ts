import {ISearcher} from "./ISearcher";
import {IPickerItem} from "../pickeritems/IPickerItem";
import {ISearchPickerOptions} from "../options/ISearchPickerOptions";
import {Utility} from "../Utils";


export class SlowedSearcher implements ISearcher {

    private pickerItems: IPickerItem[] = null;
    private foundItems: IPickerItem[] = [];
    private tmrId: any;

    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[]) => void
        , onerror?: (message: string) => void) {

        if (this.tmrId)
            clearTimeout(this.tmrId);

        this.tmrId = setTimeout(() => {
            if (!this.pickerItems) //TODO updating...
                this.pickerItems = this.$map(options.source, options);

            this.foundItems = Utility.filterItems(this.pickerItems, query, options);
            this.tmrId = null;
            onresults(this.foundItems);
        }, 1000);

    }

    private $map(source: any[], options: ISearchPickerOptions): IPickerItem[] {
        let result: IPickerItem[] = [];
        for (let i = 0; i < source.length; i++) {
            result.push(options.pickerItemFactory(source[i]));
        }
        return result;
    }


}
