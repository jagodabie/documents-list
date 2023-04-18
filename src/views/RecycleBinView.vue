<script setup>
import { onMounted } from "vue";
import { store } from "@/store/store";
import DocumentList from "@/components/DocumentList.vue";

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
  await store.setRecycledBinDocumentsList();
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
