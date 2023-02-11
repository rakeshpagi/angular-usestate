import { Pipe, PipeTransform, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs from 'dayjs';
import { interval, map, Observable, take } from 'rxjs';
import { AppState } from '../+state/feature-state.reducer';
import { getFeatureState, readFeatureState } from '../+state/feature-state.selectors';

function resolvePath(path:string,o:any={},defaultValue=null){

        return path.split('.').reduce((p,c)=>p?.[c] || defaultValue , o ||{})
}

@Pipe({
    name: 'readState'
})
export class ReadStatePipe implements PipeTransform {
    constructor(private store:Store){
    }
    
    transform(stateName: any, ...args: any[]): Observable<any|null> {
            return  stateName? this.store.select(readFeatureState(stateName)):this.store.select(getFeatureState)
    }
}


@Pipe({
    name: 'sumOf'
})
export class SumOfPipe implements PipeTransform {
    transform(value: any[], key:string): number {
                if(!value)return 0; 
                
                return value.map(i=>  Number(  i[key] ||0 )  ).reduce( (p,c)=> p+c,0 )
    }
}


@Pipe({
    name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {
    transform(value: any[], whereCondition:Record<string,any> ): Record<string,any>[] {
                if(!value)return []; 
                
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
    transform(value: any[], whereCondition:Record<string,any> ): Record<string,any>[] {
                if(!value)return []; 
                
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
    transform(value: any[], groupby:string ): Record<string,any[]>|null {
                if(!value)return null; 
                
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
    name: 'mapToValue'
})
export class MapValuePipe implements PipeTransform {
    transform(value: any[],  mappingObject:any ): Record<string,any>[]|null {
      
        return  (value||[]).map( i=> mappingObject[i]?mappingObject[i]:i );
    }
}
@Pipe({
    name: 'mapToObject'
})
export class MapObjectPipe implements PipeTransform {
    transform(value: any[],  m:any ): Record<string,any>[]|null {
    
        return  (value||[]).map( o=> Object.keys(m).reduce( (p,c)=> ( Object.keys(o).includes(c) ? ({...p,[c]: m[c] }) : p )  , o  ) );
    }
}

@Pipe({
    name: 'resolveArray'
})
export class ResolveArrayPipe implements PipeTransform {
    transform(value: any[],  path:string, defaultValue?:any ): Record<string,any>[]|null {
    
        return  (value||[]).map( o=> resolvePath(path,o,defaultValue)  );
    }
}

@Pipe({
    name: 'mergeArrayOfArray'
})
export class MergeArrayArrayPipe implements PipeTransform {
    transform(arr: any[]|null ): Record<string,any>[]|null {                 
        return  (arr||[]).reduce( (p,c)=>([ ...p,...c ] ) ,[] );
    }
}

@Pipe({
    name: 'resolve'
})
export class ResolvePipe implements PipeTransform {
    transform(value: any,  path:string,defaultValue?:any ): Record<string,any>|null {    
        return  resolvePath(path,value,defaultValue) ;
    }
}


@Pipe({
    name: 'extendArray'
})
export class ExtendArrayPipe implements PipeTransform {
    transform(value: any[], arr: any[]): Record<string,any>[] {
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


@Pipe({
    name: 'updateEntity'
})
export class UpdateEntityPipe implements PipeTransform {
    transform( array:any[],key:string,id:number|string,newValue:any={} ): Record<string,any> {
             return (array||[]).map( (r,i) => r[key]===id ? ({...r,...newValue }) : r  )
    }
}




@Pipe({
    name: 'timeout',pure:true,
  })
  export class TimeoutPipe implements PipeTransform {
    transform(value: any, seconds:number=5): Observable<any> {
         return  interval(1000).pipe(
             take(seconds),
             map( i => i===seconds-1 ? null: value )
         )
    }
  }

  
  @Pipe({
    name: 'integers'
  })
  export class IntegerRangePipe implements PipeTransform {
    transform(value: number, ): number[] {
         const arr = new Array(value,).fill(0).map( (v,i)=>i );
         return arr
    }
  }

  
  
  @Pipe({
    name: 'addSysdate'
  })
  export class AddSysdatePipe implements PipeTransform {
    transform(value: number, unit:string='day'  ): dayjs.Dayjs {         
         return dayjs().add(value,unit)
    }
  }

