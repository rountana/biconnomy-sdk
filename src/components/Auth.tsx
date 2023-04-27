import { useState, useEffect, useRef } from "react"
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types"
import SmartAccount from "@biconomy/smart-account"
import {ethers} from "ethers"
var util = require('util')

// import {css} from 'emotion/css'
//** known bug with show wallet, two login clicks required */


export default function Auth () {

const [smartAccount, setSmartAccount] = useState<SmartAccount | null> (null)
const [interval, enableInterval] = useState<boolean>(false)
// const sdkRef = useRef<SocialLogin | null>(null) ** problems with sdRef.current 
// & showWallet() using useRef, switched to useState
//
const [sdkRef, setsdkRef] = useState<SocialLogin | null>(
    null
  );
const[loading, setLoading] = useState<boolean>(false); 
const [scwalletAddress, setScWalletAddress] = useState("")

// Real login - SC creation process is triggered here
// ideally, this type of logic should be in a listener (in the SDK).
useEffect(() => {
    // added "any" type cos TS was flagging the type
    let configureLogin: any
    // reminder: The setInterval() method calls a function at specified 
    //intervals until clearInterval is called.
    if (interval) {
      configureLogin = setInterval(() => {
        //if no provider exists when interval is set, SC account can be created
        if (!!sdkRef?.provider) {
          setupSmartAccount()
          clearInterval(configureLogin)
        }
      }, 1000)
    }
  }, [interval])


async function login () {
    // no social login set up yet ?

    if (!sdkRef) {
    const socialLoginSDK = new SocialLogin();
    // const signature1 = await socialLoginSDK.whitelistUrl('https://biconomy-social-auth.vercel.app')

    // initialize SocialLogin object for Polygon
    await socialLoginSDK.init({
        // chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET)
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET)
      })
    // await socialLoginSDK.init();
    setsdkRef(socialLoginSDK)
    console.log(util.inspect(socialLoginSDK))
    } 
    // if not logged in, pop-up wallet window for login options
    if (!sdkRef?.provider) {
        console.log("Function login - SHOW WALLET" + JSON.stringify(!sdkRef?.provider))

            // console.log("Function login - SHOW WALLET" + sdkRef.current)

        sdkRef?.showWallet();
        // what is enable interval ?? Allowing user to login to their account
        // if so where is the event and callback ? - ok.. there is a useEffect
        // logic that calls waits for login creation (create smartAccount fn).

        enableInterval(true) 
    }
    // no provider exists then we need to set up provider and smart account etc.
    else
        {
            console.log("Function login - SET UP SCA")

            setupSmartAccount()
        }
    }
    
async function setupSmartAccount() {

    // we need social login object at this stage. exit if object doesnt exist.
    if(!sdkRef?.provider) return
    console.log("Function login - SET UP SCA - CALLED- PAST RETURN")

        //    
        // if provider exists - hidewallet
        //setloading indicator
        // get the provider - why ??
        //
        // successful
        // save parameters
        // else 
        // error out

        // hide pop-up windowcos we will be setting up the smartcontract account and 
        // connecting to it
        sdkRef.hideWallet();
        //purpose ?
        setLoading(true);
        //get provider came from social login init (during login)
        const web3Provider = new ethers.providers.Web3Provider(sdkRef.provider)
        try {
            // Param- web3 Provider. Help from intellisense.
            // Constructor for the Smart Account. If config is not provided it 
            //makes Smart Account available using default configuration 
            //If you wish to use your own backend server and relayer service, 
            //pass the URLs here

            const smartAccount = new SmartAccount(web3Provider, {
                activeNetworkId: ChainId.POLYGON_MAINNET,
                supportedNetworksIds: [ChainId.POLYGON_MAINNET],
              })
            
              await smartAccount.init();
              const context = smartAccount.getSmartAccountContext();

              setScWalletAddress(context.baseWallet.getAddress());
              setSmartAccount(smartAccount);
              setLoading(false);
              const address = smartAccount.address;
              console.log("SC Address: " + address)

        }
        //handle errors
        catch (err){
            console.log('error setting up smart account... ', err)
        }
    }

 const logout = async () => {  
// why not sdkRef.current ?
    if (!sdkRef) {
          console.error("Web3Modal not initialized.");
          return;
        }
        if (sdkRef) {
            await sdkRef.logout();
            sdkRef.hideWallet();
            setSmartAccount(null);
            //TBD- check if wallet address needs to be reset !!
            setScWalletAddress("");
            enableInterval(false);
      };}

    return (
        <div className="flex flex-col items-center">
        {!smartAccount && !loading &&
        <button className="border bg-slate-400 w-1/3 my-10 rounded-md p-2 text-lg text-slate-900 font-bold" onClick={login}> Login with Social auth</button>}        
        {loading && <p> Loading account details </p>}
        {
        smartAccount && (
          <div >
            <h3>Smart account address:</h3>
            <p>{smartAccount.address}</p>
            <button className="border bg-slate-400 w-1/3 my-10 rounded-md p-2 text-lg text-slate-900 font-bold" onClick={logout}>Logout</button>
          </div>
        )
      }
        </div>
    )
}