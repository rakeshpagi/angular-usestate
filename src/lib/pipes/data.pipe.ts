import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFeatureState, readFeatureState } from '../+state/feature-state.selectors';

@Pipe({
    name: 'readState'
})
export class ReadStatePipe implements PipeTransform {
    constructor(private store:Store){
    }
    
    transform(stateName: any, ...args: any[]): any {
            return  stateName? this.store.select(readFeatureState(stateName)):this.store.select(getFeatureState)
    }
}


@Pipe({
    name: 'sumOf'
})
export class SumOfPipe implements PipeTransform {
    transform(value: any[], key:string): any {
                if(!value)return 0; 
                
                return value.map(i=>  Number(  i[key] ||0 )  ).reduce( (p,c)=> p+c,0 )
    }
}


@Pipe({
    name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {
    transform(value: any[], whereCondition:Record<string,any> ): any {
                if(!value)return 0; 
                
                return value.filter(i => Object.keys(whereCondition)
                                .map( k=>  (typeof whereCondition[k]==='object' && whereCondition[k]!=null  ) ? 
                                    Object.keys( whereCondition[k] ).map( ik=> i[k][ik]===whereCondition[k][ik]  ).find( f=>f===false )===undefined
                                      : i[k]===whereCondition[k] )
                            .reduce( (p,c)=> (c?1:0)+p , 0 ) === Object.keys(whereCondition).length   )
    }
}
@Pipe({
    name: 'filterLikeArray'
})
export class FilterLikeArrayPipe implements PipeTransform {
    transform(value: any[], whereCondition:Record<string,any> ): any {
                if(!value)return 0; 
                
                return value.filter(i => Object.keys(whereCondition)
                                .map( k=>  (typeof whereCondition[k]==='object' && whereCondition[k]!=null  ) ? 
                                    Object.keys( whereCondition[k] ).map( ik=>   new String( i[k][ik]).toUpperCase().includes( new String( whereCondition[k][ik]).toUpperCase() )  ).find( f=>f===false )===undefined
                                      :  new String(i[k]).toLowerCase().includes( ( whereCondition[k] as string ).toLowerCase() ) )
                            .reduce( (p,c)=> (c?1:0)+p , 0 ) === Object.keys(whereCondition).length   )
    }
}

@Pipe({
    name: 'groupBy'
})
export class GroupbyArrayPipe implements PipeTransform {
    transform(value: any[], groupby:string ): any {
                if(!value)return 0; 
                
                return value.map( i=> i[groupby]  ).reduce( (p,c,i)=>{
                       // p[c] = ((p[c]  ||[]) as any[]) .concat( value[i] )
                         p[c] = [ ...(p[c] ?? []), value[i]  ]
                        //p[c] = 1 
                        return p
                }  ,{ })
    }
}


@Pipe({
    name: 'assignObject'
})
export class AssignObjectPipe implements PipeTransform {
    transform(value: any,  assign:any ): any {
        //return Object.assign(value??{},assign??{} )
        return  {...value??{},...assign??{}}
    }
}
@Pipe({
    name: 'mapValue'
})
export class MapValuePipe implements PipeTransform {
    transform(value: any[],  mappingObject:any ): any {
        //return Object.assign(value??{},assign??{} )
        return  (value||[]).map( i=> mappingObject[i]?mappingObject[i]:i );
    }
}


@Pipe({
    name: 'extendArray'
})
export class ExtendArrayPipe implements PipeTransform {
    transform(value: any[], arr: any[]): any {
         return [...value,...arr]
    }
}

@Pipe({
    name: 'callFunction'
})
export class CallFunctionPipe implements PipeTransform {
    transform(params: any[], object:any, f: (any) ): any {
             return f.call(object,params)
    }
}

@Pipe({
    name: 'typeOf'
})
export class TypeOfPipe implements PipeTransform {
    transform( object:any, ): any {
             return typeof object
    }
}

