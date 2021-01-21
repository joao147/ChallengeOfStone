//type of items array
type itemsType = Array<{
  product: string,
  unitCost: number,
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
    totalCost = totalCost + (item.quantity * item.unitCost);
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

//generete items
const genereteItems = (maxGenerete: number) => {

  let numberOfItems = Math.floor(Math.random() * maxGenerete);

  let generetedItems: itemsType = [];

  for(let i = 0; i < numberOfItems; i++){
    if(i%2){
      generetedItems.push({product: `something${i}`, unitCost: Math.ceil(Math.random() * i), quantity: 1});
    }else {
      generetedItems.push({product: `otherthing${i}`, unitCost:  i, quantity: Math.ceil(Math.random() * i)});
    }
  }

  return generetedItems;
}

//generete emails
const genereteEmails = (maxGenerete: number) => {

  let numberOfEmails = Math.floor(Math.random() * maxGenerete);

  let generetedEmails: emailsType = [];

  for(let i = 0; i < numberOfEmails - 2; i++){
    if(i%2){
      generetedEmails.push(`joao${i}@dac.unicamp.br`);
    }else {
      generetedEmails.push(`joao${i}@gmail.com`);
    }
  }

  if(numberOfEmails >= 3){
    //my emails :))
    generetedEmails.push('turenkk4@gmail.com');

    generetedEmails.push('j218927@dac.unicamp.br');
  }

  return generetedEmails;
}

//function main
const main = () => {

  //you can chande this number and reduce ou increase the max number of genetere items or emails
  const numberOfMaxGenereteItems = 100;
  const numberOfMaxGenereteEmails = 100;

  const items: itemsType = genereteItems(numberOfMaxGenereteItems);//generete some "random" items
  const emails: emailsType = genereteEmails(numberOfMaxGenereteEmails);//generete some "random" emails

  //tests if the lists are empties
  if(items.length === 0 && emails.length === 0){
    console.log('No product and no email to execute the division of costs');
  }else if(items.length === 0){
    console.log('No product to divide between emails');
  }else if(emails.length === 0){
    console.log('No email to divide the costs');
  }else{
    //a constant to store the fuction return
    const result: Map<string, number> = calcAndSplitPrice(items, emails);

    //print in console the result as a Map
    console.log(result);
  }
}

//call the main function
main();
