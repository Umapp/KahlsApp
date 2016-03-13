import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'filter' })
export class Filter implements PipeTransform {

    transform(value, [field, letter]) {
        if (value == null) {
            return null;
        }
        
        if (letter == '') {
            return value.filter((item) => {
                if(item[field].startsWith('Mån'))
                    return item[field].startsWith('Mån')
                if(item[field].startsWith('Tis'))
                    return item[field].startsWith('Tis')
                if(item[field].startsWith('Ons'))
                    return item[field].startsWith('Ons')
                if(item[field].startsWith('Tor'))
                    return item[field].startsWith('Tor')
                if(item[field].startsWith('Fre'))
                    return item[field].startsWith('Fre')
                if(item[field].startsWith('Lör'))
                    return item[field].startsWith('Lör')
                if(item[field].startsWith('Sön'))
                    return item[field].startsWith('Sön')
            })
        }
        
        return value.filter((item) => {
            return item[field].startsWith(letter)
        })
    }
}
   