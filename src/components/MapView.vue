<template>
  <div>
    <h1>Map Page</h1>
    <YMap :coords="[55.751574, 37.573856]" :zoom="10" style="width: 100%; height: 400px;">
      <YMapMarker :coords="[55.751574, 37.573856]" />
    </YMap>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'MapView',
};
</script>
