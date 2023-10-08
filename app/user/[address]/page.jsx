import { getUserWithAddress } from "../../../firebase"
import { UserDisplay } from "../../components/UserProfile";
export default async function Page({ params }) {
    const userData = await getUserWithAddress(params.address);
    
    return (<div> 
        <UserDisplay user = {userData} />
    </div>
    )
    
    
  }


  /*<ol>
  { Object.keys(userData).map((key) => {
      if(!(typeof userData[key] == 'object') ){
           return(
              <div>
                  <h4>
                      {key}: {userData[key]}
                  </h4>
              </div>
          )
      }

  })}
  </ol> */