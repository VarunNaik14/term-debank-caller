import { getUserWithAddress } from "../../../firebase"
import { UserDisplay } from "../../components/UserProfile";
import Button from '@mui/material/Button';

export default async function Page({ params }) {
    const userData = await getUserWithAddress(params.address);

    return (<div> 
        <Button variant="text">
            test
        </Button>
        <h4 class="text-3xl font-bold "> Address: {userData.address}  </h4>
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