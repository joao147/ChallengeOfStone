//type of items array
type itemsType = Array<{
  product: string,
  unitPrice: number,
  quantity: number
}>;

//type of emails array
type emailsType = Array<string>;

//function to calculate total cost and divide between emails
const calcAndSplitPrice = ( items: itemsType, emails: emailsType) => {

  //create the Map<string, number> to return
  var resultMap = new Map<string, number>();

  var totalCost: number = 0;//Varieble to receive total cost

  //foreach to get total cost
  items.forEach(item => {
    totalCost = totalCost + (item.quantity * item.unitPrice);
  });

  //here I get the floor of division, javascript don t have int, 
  //so to get a integer is necessary Math.floor()
  let dividedTotal = Math.floor(totalCost / emails.length);
  
  //Now I have the rest of total cost by number of emails,
  //this is to us don t lose any cents
  let rest = totalCost%emails.length;

  //foreach for vinculate a email to respective cost
  emails.forEach((email, index) => {
    //test, to add 1 cent for the latters if the cost is tithe
    if(index === emails.length - rest){

      let total = dividedTotal + 1;

      rest--;

      resultMap.set(email, total)
    }else{
      resultMap.set(email, dividedTotal);
    }
  })

  //return the Map
  return resultMap;
}

//function main
const main = () => {

  const items: itemsType = [];
  const emails: emailsType = [];

  //tests if the lists are empties
  if(items.length === 0 && emails.length === 0){
    console.log('No product and no email to execute the division of costs');
  }else if(items.length === 0){
    console.log('No product to divide between emails');
  }else if(emails.length === 0){
    console.log('No email to divide the costs');
  }else{
    //a const to store the fuction return
    const result: Map<string, number> = calcAndSplitPrice(items, emails);

    //print in console the result as a Map
    console.log(result);
  }
  
}

//call the main function
main();
