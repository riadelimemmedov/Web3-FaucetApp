
//!Third party packages
import contract from "@truffle/contract"


//?loadContract
export const loadContract = async (name,provider) => {
    const response = await fetch(`/contracts/${name}.json`)
    const Artifact = await response.json()

    const _contract = contract(Artifact)
    _contract.setProvider(provider)

    let deployedContract = null
    try{
        deployedContract = await _contract.deployed()
    }
    catch(err){
        console.log('Please try again deploy contract process')
    }
    return deployedContract
}