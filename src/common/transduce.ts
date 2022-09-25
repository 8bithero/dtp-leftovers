const comp = ( f: any , g: any ) =>
      (x: any) => f ( g ( x ) )
      
const compose = ( ...fs: any ) =>
  fs.reduce (comp, (x: any) => x )
  
const append = ( xs: any , x: any ) =>
  xs.concat ( [ x ] )
  
export const transduce = ( ...ts: any ) => (xs: any[]) =>
  xs.reduce(ts.reduce(comp)(append) , [])
  
export const filterer = (f: any) =>
  (k: any) => (acc: any, x: any) => f(x) ? k(acc, x) : acc

// const includer = (traitName: string, value: string) => {
//   const filterList = state.appliedFilters[traitName] 
//   return filterList.length === 0 ? true : filterList.includes(value)
// }

// export const includerV2 = (filterList: string[] = [], value: string) =>
//   filterList.length === 0
//     ? true
//     : filterList.includes(value)