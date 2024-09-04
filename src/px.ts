import { engine, executeTask, InputAction, Material, PointerEvents, pointerEventsSystem, PointerEventType } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import * as px from '~system/PortableExperiences'

import { createCube } from './factory'
import { bounceScalingSystem, circularSystem, spawnerSystem } from './systems'

import { setupUi } from './ui'
import { getAndSetWorldInfoData, getWorldInfoData, whenWorldInfoReadyAddCallback } from './worldInfoDataHelper'
import { log } from './back-ports/backPorts'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

let urnToLoad = "not-set"
  
export function setupPX(){
  // Defining behavior. See `src/systems.ts` file.

  // https://worlds-content-server.decentraland.org/world/shibu.dcl.eth/about

  //will fetch it from the world info data for latest always
  const worldENS = "MetaLiveStudio.dcl.eth"
  getAndSetWorldInfoData(worldENS)
  whenWorldInfoReadyAddCallback(()=>{
    const info = getWorldInfoData() 
    log("getAndSetWorldInfoData.result",info)
    urnToLoad = info.configurations.scenesUrn[0]
    log("getAndSetWorldInfoData.result","setting urnToLoad to ",urnToLoad)
  })    
}
 
export function loadPX(){
  px.spawn({ pid:urnToLoad }).then((res:px.SpawnRequest)=>{
    //px.pid
    console.log("spawnedPx.then( (px:PortableExperienceHandle)",res)
    //pxLoaded = px
  })
}