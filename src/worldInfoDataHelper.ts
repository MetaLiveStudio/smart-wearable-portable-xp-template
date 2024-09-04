import { log } from "./back-ports/backPorts"

export type WorldInfoResponse = {
    configurations:{
        scenesUrn: string[]
    }
}
const CLASSNAME = "WorldInfoDataHelper"
let worldInfoData:WorldInfoResponse
//let sceneMetadata:SceneMetaData

const whenReady:(()=>void)[]=[]

export function getWorldInfoData(){
    return worldInfoData
}/*
export function getSceneMetadata(){
    return sceneMetadata
}*/

export function whenWorldInfoReadyAddCallback(callback:()=>void){
    if(worldInfoData){
        log(CLASSNAME,"INFO","whenWorldInfoReadyAddCallback","WorldInfo already loaded, calling now")
        callback()
    }else{
        log(CLASSNAME,"INFO","whenWorldInfoReadyAddCallback","WorldInfo not loaded, queuing up")
        //register
        whenReady.push(callback)
    }
}
export function getAndSetWorldInfoData(worldEns:string){
    const METHOD_NAME = "getAndSetWorldInfoData"
    log(CLASSNAME,"INFO",METHOD_NAME,"ENTRY")
    
    const promise = fetch("https://worlds-content-server.decentraland.org/world/"+worldEns+"/about")
    promise.then(async (result:Response)=>{
        log(CLASSNAME,"INFO","cacheSceneMetaData","result",result)
        //worldInfoData = result
        
        try{
            worldInfoData = await result.json()//JSON.parse(result.land.sceneJsonData)

            log(CLASSNAME,"INFO",METHOD_NAME,"worldInfoData",worldInfoData)
            //sceneMetadata.scene._baseCoords = getSceneBaseCoords(sceneMetadata)
        }catch(e){
            log(CLASSNAME,"ERROR",METHOD_NAME,"WorldInfo.metadata was not parsable!!!",worldInfoData)
        }
        log(CLASSNAME,"INFO",METHOD_NAME,"calling whenReady callbacks size:",whenReady.length)
        //execute any registered callbacks
        for(const p of whenReady){
            try{
               p()
            }catch(e){
                log(CLASSNAME,"ERROR",METHOD_NAME,"calling whenReady failed:",e)
            }
        }
        //clear it out for next time if there is a next time
        whenReady.length = 0
    })
    return promise
}
