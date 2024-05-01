export function sortData(data,category){
    return data?.sort((first,second)=>{
        return first[`${category}`] < second[`${category}`] ? 1 : -1;
    })
}