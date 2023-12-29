import { reactive, onMounted, nextTick, onUnmounted } from 'vue'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

interface TweakpaneState {
  wireframe: boolean
}

interface LightState {
  position: { x: number; y: number; z: number }
  // position: [number, number, number]
  intensity: number
  distance: number
  decay: number
}

export function useTweakpane() {
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)

  const objectState = reactive<TweakpaneState>({
    wireframe: false,
  })

  const lightState = reactive<LightState>({
    position: { x: 0, y: 0, z: 0 },
    intensity: 5,
    distance: 0,
    decay: 3,
  })

  onMounted(() => {
    nextTick(() => {
      const fpsGraph = pane.addBlade({
        view: 'fpsgraph',
        label: 'fps',
        rows: 2,
      }) as EssentialsPlugin.FpsGraphBladeApi

      fpsGraph.max = 120

      function renderFpsGraph() {
        fpsGraph.begin()
        fpsGraph.end()
        requestAnimationFrame(renderFpsGraph)
      }

      renderFpsGraph()

      pane.addBinding(objectState, 'wireframe')

      const lightFolder = pane.addFolder({
        title: 'Light',
      })

      lightFolder.addBinding(lightState, 'position')
      lightFolder.addBinding(lightState, 'intensity')
      lightFolder.addBinding(lightState, 'distance')
      lightFolder.addBinding(lightState, 'decay')
    })
  })

  onUnmounted(() => {
    if (pane) {
      pane.dispose()
    }
  })

  return {
    pane,
    objectState,
    lightState,
  }
}
