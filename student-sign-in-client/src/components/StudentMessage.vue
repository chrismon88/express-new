<template>
  <div>
    <!-- Template/HTML here-->
    <div v-show="student.name">
      <div v-if="student.present" class="alert alert-success">
        welcome, {{student.name}}
      </div>

      <div v-else class="alert alert-info">
        Goodbye, {{ student.name }}. See you later!
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "StudentMessage.vue",
  props:{
      student: Object
  }
}
</script>

<style scoped>

</style>