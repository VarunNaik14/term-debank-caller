function UserDisplay(props) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const fillTokenList = function(list){
    let returnList = [];
    let tokenValues = [];
    for(var key in list){
      if(Object.keys(returnList).length < 3){
        console.log(list[key].symbol); 
        returnList.push(list[key]);
        tokenValues.push(list[key].value)
      }
      else{

        if(list[key].value > tokenValues[2]){

          if(list[key].value>tokenValues[0]){
            returnList.unshift(list[key]);
            returnList.pop();

            tokenValues.unshift(list[key].value);
            tokenValues.pop();

          }

          else if(list[key].value>tokenValues[1]){
            returnList[2] = returnList[1];
            returnList[1] = list[key];

            tokenValues[2] = tokenValues[1];
            tokenValues[1] = list[key].value;
          }

          else{
            returnList[2] = list[key];

            tokenValues[2] = list[key].value
          }
        }
      }
    }
    return returnList;
  }

  const mostSuppliedTokens = fillTokenList(props.user.total_supplied_tokens);
  const mostBorrowedTokens = fillTokenList(props.user.total_borrowed_tokens);
  
    return (
    <div>
       <h4 class="text-3xl font-bold ">
              Address: {props.user.address}
        </h4>

        <div class = "flex flex-row">
          <div id="user-stats" class ="flex-1">
              <ul>
                <li class = "text-lg font-bold">Quick Stats:</li>
                <li>Total asset value: {formatter.format(props.user.total_supplied_value)}</li>
                <li>Total debt value: {formatter.format(props.user.total_borrowed_value)}</li>
                <li>Net asset value: {formatter.format(props.user.net_value)}</li>
              </ul>
          </div>
          <div class ="flex-1">
              <ul>
                <li class = "text-lg font-bold">Most Supplied Assets:</li>
                {mostSuppliedTokens.map((token, index) => (
                  <li key={index}>{token.symbol}: {formatter.format(token.value)}</li>
                ))}
               </ul>
          </div>
   
          <div class ="flex-1">
              <ul>
              <li class = "text-lg font-bold">Most Borrowed Assets:</li>
                {mostBorrowedTokens.map((token, index) => (
                  <li key={index}>{token.symbol}: {formatter.format(token.value)}</li>
                ))}
               </ul>
          </div>

        </div>

        <div>

        </div>
    </div>
    )
  }


export {UserDisplay};