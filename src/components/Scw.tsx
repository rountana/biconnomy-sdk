import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import React, {useEffect} from "react";

async function initialize() {
    // create an instance of SocialLogin 
    const socialLogin = new SocialLogin()
    // init social login SDK, all params are optional
    await socialLogin.init(); 

    // pops up the UI widget
    socialLogin.showWallet();

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
  