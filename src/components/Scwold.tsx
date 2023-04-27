import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import React, {useEffect} from "react";
var util = require('util')

async function initialize() {
    // create an instance of SocialLogin 
    const socialLogin = new SocialLogin()
    // init social login SDK, all params are optional
    await socialLogin.init(); 

    // pops up the UI widget
    socialLogin.showWallet();


    if (socialLogin) 
    {
      console.log("Social Login Object" )
      console.log(util.inspect(socialLogin))

    }
  //   if (!socialLogin?.provider) return;
  //   // create a provider from the social login provider that 
  //   // will be used by the smart account package of the Biconomy SDK
  //   const provider = new ethers.providers.Web3Provider(
  //       socialLogin.provider,
  //   );
  // // get list of accounts available with the provider
  //   const accounts = await provider.listAccounts();
  //   console.log("EOA address", accounts)

}
  export default function Scw() {
    React.useEffect(() => {
      initialize();
    }, []);
    
    return (
    <>
      <h2 className="text-center text-lg"> SCW</h2>  
    </>
  )}
  