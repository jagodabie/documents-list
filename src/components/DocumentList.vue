<script setup>
import { defineProps } from "vue";
import { store } from "@/store/store";

const props = defineProps({ isRecycledBin: Boolean, documentsList: Array });
</script>
<template>
  <h1 data-test="list-header">
    {{ props.isRecycledBin ? "Recycled Bin" : "Documents" }}
  </h1>
  <slot />
  <div
    class="document-list"
    v-if="props.documentsList && props.documentsList.length > 0"
  >
    <ul>
      <li
        v-for="(document, index) in props?.documentsList"
        :key="index"
        data-test="list-item"
      >
        <span>
          {{
            `${document.name}${
              document.id
            } created at ${document.date.toLocaleDateString()}`
          }}
        </span>
        <button
          @click="store.changeDocumentsLocalization(document)"
          :class="!document.isActive ? 'restore' : 'remove'"
        >
          {{ document.isActive ? "&#8722;" : "Restore" }}
        </button>
      </li>
    </ul>
  </div>
  <div v-else class="empty-list" data-test="empty-list">No item to display</div>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  list-style: none;
  @media (min-width: 320px) {
    padding: 1rem;
  }
}

li {
  padding: 1rem 0.7rem;
  border: solid 1px rgb(108, 155, 201);

  margin: 3px;
  display: flex;
  background-color: rgb(167, 199, 231);

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  & > span {
    display: inline-block;
    padding: 0.5rem 0;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.6rem;
    }
  }
}
.restore {
  font: normal 1rem "Fira Sans", sans-serif;
}

.empty-list {
  font: normal bold 30px/1 sans-serif;
  padding: 8rem;
}
</style>
