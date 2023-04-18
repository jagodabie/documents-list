<script setup>
import { onMounted, ref } from "vue";
import { store } from "@/store/store";
import DocumentList from "@/components/DocumentList.vue";
const loading = ref(null);

const handleClick = async () => {
  let text = "Are you sure you want to delete this documents permanently ?";
  if (confirm(text) == true) {
    try {
      await store.deleteAllDocuments();
    } catch (e) {
      alert("Something went wrong");
    }
  } else {
    return;
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await store.setRecycledBinDocumentsList();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <DocumentList
    :isRecycledBin="true"
    :documentsList="store.recycledBinDocuments"
  >
    <slot>
      <button type="button" @click="$router.push('/')">Documents</button>
      <button
        type="button"
        @click="handleClick"
        :disabled="store.recycledBinDocuments <= 0"
      >
        Delete all documents
      </button>
    </slot>
  </DocumentList>
</template>
