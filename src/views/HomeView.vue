<script setup>
import { onMounted, ref } from "vue";
import { store } from "@/store/store";
import DocumentList from "@/components/DocumentList.vue";

const loading = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    await store.setActiveDocuments();
  } catch (e) {
    alert(e.message);
  } finally {
    loading.value = false;
  }
});

const addDocuments = () => {
  try {
    store.addDocument();
    alert("Document was added successfully");
  } catch (e) {
    alert("Something went wrong");
  }
};
</script>
<template>
  <div v-if="loading" class="loader">Loading ...</div>
  <DocumentList :isRecycledBin="false" :documentsList="store.activeDocuments">
    <slot>
      <div class="buttons">
        <button type="button" @click="$router.push('/recycle-bin')">
          Recycle Bin
        </button>
        <button type="button" class="add" @click="addDocuments">&#43;</button>
      </div>
    </slot>
  </DocumentList>
</template>
<style lang="scss">
.buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.loader {
  border: 16px solid rgba(0, 0, 0, 0);
  border-top: 16px solid #80a8d1;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  z-index: 1;
  position: fixed;
  left: 40%;
  top: 30%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
