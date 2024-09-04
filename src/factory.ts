import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction
} from '@dcl/sdk/ecs'
import { Cube } from './components'

// Cube factory
export function createCube(x: number, y: number, z: number, spawner = true): Entity {
  const meshEntity = engine.addEntity()

  // Used to track the cubes
  Cube.create(meshEntity)

  Transform.create(meshEntity, { position: { x, y, z } })
  // set how the cube looks and collides
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)

  return meshEntity
}
