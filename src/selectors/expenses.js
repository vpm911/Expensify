import moment from 'moment';

export const getVisibleExpenses= (expenses,{text,sortBy, startDate,endDate})=>{
     return expenses.filter((expense)=>{
        const createdAtMoment = moment(expense.createdAt);

        const startDateMatcher = startDate ?  startDate.isSameOrBefore(createdAtMoment,'day') :true ;
        const endDateMatcher = endDate ? endDate.isSameOrAfter(createdAtMoment,'day'):true;
        const textMatcher = expense.description.toLowerCase().includes(text.toLowerCase()); 
        return startDateMatcher && endDateMatcher && textMatcher;
    }).sort((a,b)=>{
        if(sortBy==='amount'){
            return (a.amount > b.amount ? 1 : -1);
        }
        else if(sortBy==='date'){
            return (a.createdAt > b.createdAt ? 1: -1);
        }
    });
};