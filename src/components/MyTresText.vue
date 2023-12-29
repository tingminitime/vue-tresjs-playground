<script setup lang="ts">
import { OrbitControls, Text3D } from '@tresjs/cientos'
</script>

<template>
  <Suspense>
    <TresMesh
      ref="cubeRef"
      :position="[0, 0, 0]"
    >
      <Text3D
        text="龍騰文化"
        font="/fonts/NotoSansTCRegular.json"
      >
        <TresAxesHelper />
        <OrbitControls />
        <TresMeshNormalMaterial :position="[0, 0, 0]" />
      </Text3D>
    </TresMesh>
  </Suspense>
</template>

<style scope></style>
