<script setup>
import DefaultTheme from "vitepress/theme";
// import Analysis from './components/analysis.vue'
import VPSwitchAppearance from "./components/VPSwitchAppearance.vue";
import { onMounted, onBeforeUnmount } from "vue";
const codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let codeIndex = 0;
function handleKeydown(event) {
  const code = event.keyCode;
  if (code === codes[codeIndex]) {
    codeIndex++;
    if (codeIndex === codes.length) {
      const logo = document.getElementsByClassName("logo")[0];
      logo.style.transition = "transform 1s";
      logo.style.transform = "rotate(360deg)";
      setTimeout(() => {
        logo.style.transform = "rotate(0deg)";
      }, 1000);
      codeIndex = 0;
    }
  } else {
    codeIndex = 0;
  }
}
onMounted(() => {
  console.log(1111);
  document.addEventListener("keydown", handleKeydown);
});
onBeforeUnmount(() => {
  console.log(2222);
  document.removeEventListener("keydown", handleKeydown);
});
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <VPSwitchAppearance />
    </template>
  </Layout>
</template>
