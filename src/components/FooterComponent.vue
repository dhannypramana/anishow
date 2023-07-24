<template>
  <footer class="footer mt-4">
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center value">
        <span>Copyright &copy; Dhanny Adhi Pramana | VueJS Playground 2023</span>
      </div>
      <div class="col">
        <table class="footer-meta">
          <tr>
            <td>Logout</td>
            <td>Apps</td>
            <td>Discord</td>
            <td>Add Data</td>
          </tr>
          <tr>
            <td>Donate</td>
            <td>Site Stats</td>
            <td>Twitter</td>
            <td>Moderators</td>
          </tr>
          <tr>
            <td>Anilist.co</td>
            <td>Recommendations</td>
            <td>Facebook</td>
            <td>Contact</td>
          </tr>
          <tr>
            <td>Anichart.net</td>
            <td>API</td>
            <td>Github</td>
            <td>Terms & Privacy</td>
          </tr>
        </table>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2A2D41;
  color: white;
  padding: 28px;
}

table td {
  padding: 8px;
  color: #9FA6B2;
}

@media screen and (max-width: 491px) {
  .col {
    padding: 0
  }

  .footer-meta {
    margin-top: 18px;
    font-size: 13px;
  }
}
</style>
