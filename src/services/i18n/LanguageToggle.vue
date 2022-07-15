<template>
  <q-btn-dropdown flat icon="translate" cover>
    <q-list>
      <q-item
        clickable
        v-close-popup
        v-for="(language, index) in languages"
        :key="index"
        @click="toggleLanguage(language)"
      >
        <q-item-section>
          <q-item-label class="language-label">
            <span>{{ language.nativeWord }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLanguage } from './language.service';

export default defineComponent({
  setup() {
    const { languages, toggleLanguage } = useLanguage();

    return {
      languages,
      toggleLanguage,
    };
  },
});
</script>

<style lang="scss" scoped>
.language-label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
