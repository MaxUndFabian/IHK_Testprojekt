import { Pipe, PipeTransform } from "angular2/core";
import {News} from './news.interface';

@Pipe({
    name: "arraySort",
    pure: false
})
export class DateSortPipe implements PipeTransform{

    transform(array: Array<News>, args: string): any {
        if (typeof args[0] === "undefined") {
            return array;
        }
        if(!array){ return; }

        let direction   = args[0][0];
        let column      = args[0].slice(1);

        array.sort((a: any, b: any) => {

            let left    = Number(new Date(a[column]));
            let right   = Number(new Date(b[column]));

            return (direction === "-") ? right - left : left - right;
        });

        return array;
    }
}