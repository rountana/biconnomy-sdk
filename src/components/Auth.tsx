import { useState, useEffect, useRef } from "react"
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types"
import SmartAccount from "@biconomy/smart-account"
import {ethers} from "ethers"
// import {css} from 'emotion/css'

const [smartAccount, setSmartAccount] = useState<SmartAccount | null> (null)
const [interval, enableInterval] = useState<boolean>(false)
const sdkRef = useRef<SocialLogin | null>(null)
const[loading, setLoading] = useState<boolean>(false); 

async function login () {
if (!sdkRef.current) {
    const socialLoginSDK = new SocialLogin();
    const signature1 = await socialLoginSDK.whitelistUrl('https://biconomy-social-auth.vercel.app')

    await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET)
      })
} 
    if (!sdkRef?.current?.provider) {
        sdkRef?.current?.showWallet();
        enableInterval(true) 
    }
    else
        {
            setupSmartAccount()
        }
    }
    
async function setupSmartAccount() {

}

export default function () {

    return (
        <>
        
        
        </>
    )
}