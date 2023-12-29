import { gsap } from 'gsap'
import type { Mesh, PerspectiveCamera } from 'three'

export function useCameraAni(camera: PerspectiveCamera) {
  const cameraTimeline = gsap.timeline()

  cameraTimeline.to(camera.position, {
    delay: 1,
    duration: 2,
    x: 12,
    y: 6,
    z: 6,
    ease: 'power3.out',
    onUpdate: () => {
      camera.lookAt(0, 0, 0)
    },
  })
}

export function useCubeAni(cube: Mesh) {
  const cubeTimeline = gsap.timeline({ delay: 2 })

  cubeTimeline.to(cube.rotation, {
    duration: 2,
    y: Math.PI * 2,
    ease: 'power3.out',
  })
}
