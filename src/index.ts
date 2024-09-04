import { engine, executeTask, InputAction, Material, PointerEvents, pointerEventsSystem, PointerEventType } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'

import { createCube } from './factory'

import { setupUi } from './ui'
import { getAndSetWorldInfoData, getWorldInfoData, whenWorldInfoReadyAddCallback } from './worldInfoDataHelper'
import { log } from './back-ports/backPorts'
import { loadPX, setupPX } from './px'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

export function main(){

  // Initial function executed when scene is evaluated and after systems are created
  executeTask(async function () {
    // Create my main cube and color it.
    //const cube = createCube(8, 1, 8)
    //Material.setPbrMaterial(cube, { albedoColor: Color4.create(1.0, 0.85, 0.42) })
    setupPX();
    whenWorldInfoReadyAddCallback(()=>{
        //this does not work, maybe its like teleport and requires a click
        loadPX()
    })  

    // if it is a spawner, then we set the pointer hover feedback
    /*if (true) {
      pointerEventsSystem.onPointerDown(
        { 
          entity: cube,
          opts: {hoverText: 'spawn px4a', button: InputAction.IA_POINTER }
        },
        (e) => {
          loadPX()
        }
      );
      
    }
    */
  })
    

  //NO UI RIGHT NOW, maybe later, right now its hello world ui we dont want
  //setupUi()
}
