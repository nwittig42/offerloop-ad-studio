<script setup>
const crowd = [
  's03-03-cabe2cac.png','s03-04-063a8c50.png','s03-05-f158c545.png','s03-06-77f326be.png',
  's03-07-431aad6a.png','s03-08-448fa790.png','s03-09-31b237f9.png','s03-10-dcd72794.png',
  's03-11-0840e969.png','s03-12-a94e226d.png','s03-13-c5c87cda.png','s03-14-f10e3160.png',
  's03-15-a9dd8da4.png','s03-16-a6d024cc.png','s03-17-3bc53c5a.png','s03-18-f3808db6.png',
  's03-19-98d9409c.png','s03-20-852702ab.png','s03-21-47e02c12.png','s03-22-449903ae.png',
  's03-23-9a34ef39.png','s03-24-2415d6a1.png','s03-25-6b3f078e.png','s03-26-15ab63a9.png',
  's03-27-1c83e46f.png',
]
</script>

<template>
  <div class="crowd">
    <img v-for="f in crowd" :key="f" :src="`/assets/decks/classroom-demo/${f}`" class="crowd-face" />
  </div>
</template>

<style scoped>
.crowd { display: grid; grid-template-columns: repeat(5, 1fr); gap: .8rem; }
.crowd-face { width: 4.2rem; height: 4.2rem; border-radius: 50%; object-fit: cover; opacity: .85; }
</style>
