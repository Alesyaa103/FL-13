const paymentCard = {cash: '100$'}
const creditCard = {creditLimit: '50$', cash:'200$'}

// function assign(obj, ...arr){
//   arr.map((addObj)=>{
//     addObj.
//   })
// }

const universalCard = assign({}, paymentCard, creditCard)