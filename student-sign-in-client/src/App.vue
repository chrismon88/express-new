<template>
<div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <StudentTable
        v-bind:students="students"
        v-on:student-arrived-or-left="studentArrivedOrLeft"
        v-on:delete-student="deleteStudent" >
    </StudentTable>
    <student-message v-bind:student="mostRecentStudent"></student-message>
</div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  data(){
    return{
      students:[],
      mostRecentStudent:{}
    }
  },

  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  mounted(){
    //load all student - make request to APi
    this.updateStudents()
  },
  methods:{
    updateStudents(){
      this.$student_api.getAllStudents().then(students =>{
        this.students =students
      }).catch(()=> alert('Unable to fetch student list'))
    },
    newStudentAdded(student){
      this.$student_api.addStudent(student). then( () =>{
        this.updateStudents()
      })
      .catch(err =>{
        let msg = err.response.data.join(',')
        alert ('Error adding student\n' + msg)
      })
    },
    studentArrivedOrLeft(student, present){
      student.present = present // update present value
      this.$student_api.updateStudent(student).then(() =>{
        this.mostRecentStudent= student
        this.updateStudents()
      }).catch(() => alert('Unable to update student'))
    },
    deleteStudent(student){
      this.$student_api.deleteStudent(student.id).then(()=>{
        this.updateStudents()
        this.mostRecentStudent = {} // clears welcome/goodbye message
      }).catch(() => alert('Unable to delete student'))
    }
  }
}
</script>

<style>

@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
</style>
