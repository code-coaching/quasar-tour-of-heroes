<template>
  <div>Tour of Heroes</div>
  <button @click="navigate('/')">Dashboard</button>
  <button @click="navigate('/heroes')">Heroes</button>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const navigate = (path: string) => {
      // void router.push('/); Navigate to Dashboard
      // void router.push('/heroes'); Navigate to HeroList
      void router.push(path);
    };

    return {
      navigate,
    };
  },
});
</script>
