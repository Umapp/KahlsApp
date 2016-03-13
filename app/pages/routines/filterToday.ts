import {Pipe, PipeTransform} from 'angular2/core';

Pipe({ name: 'filterToday' })
export class FilterToday implements PipeTransform {

    transform(value, [field]) {

        if (value == null) {
            return null;
        }

        return value.filter((item) => {
            return item[field].startsWith(letter)
        })

    }
}