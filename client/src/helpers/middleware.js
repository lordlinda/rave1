
export const numberWithCommas=(x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calculateTotal=(plans)=>{
  if (plans.length > 0) {
            let total = 0
            plans.map(plan => {
                total += plan.amount
            })
            return total 
        }
}

