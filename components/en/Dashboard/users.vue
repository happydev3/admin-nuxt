<template>
  <div class="en-dashUsers">
    <div class="en-dashUsers-content">
      <table class="en-dashUsers-content-table">
        <tr class="en-dashUsers-content-table-tr">
          <th class="en-dashUsers-content-table-th">
            First Name
          </th>
          <th class="en-dashUsers-content-table-th">
            Last Name
          </th>
          <th class="en-dashUsers-content-table-th">
            Password
          </th>
          <th class="en-dashUsers-content-table-th">
            Phone
          </th>
          <th class="en-dashUsers-content-table-th">
            Email
          </th>
          <th class="en-dashUsers-content-table-th">
            Birth date
          </th>
          <th class="en-dashUsers-content-table-th">
            Gender
          </th>
          <th class="en-dashUsers-content-table-th">
            Activity
          </th>
          <th class="en-dashUsers-content-table-th">
            Options
          </th>
        </tr>
        <tr
          v-for="user in users"
          :key="user._id"
          class="en-dashUsers-content-table-tr"
        >
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.passwrod }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.gender }}</td>
          <td />
          <td>
            <div class="en-dashUsers-content-table-tr-options">
              <i class="fas fa-times" />
              <i
                class="fas fa-edit en-dashUsers-content-table-tr-options-edit"
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data () {
    return {
      users: [
        {
          _id: "1",
          firstName: "Mostafa",
          lastName: "Desoky",
          passwrod: "123456",
          phone: "0123456789",
          email: "MD@gmail.com",
          birthDate: "20-20-2020",
          gender: "Male",
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.en-dashUsers {
  width: 100%;
  &-content {
    margin-top: 15px;
    width: 100%;
    height: 600px;
    overflow: scroll;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.281);
    padding: 20px;
    border-radius: 20px;
    &-table {
      width: 100%;
      text-align: center;

      &-th {
        color: #dc1f29;
      }
      &-tr {
        height: 50px;
        &-options {
          color: #dc1f29;
          cursor: pointer;
          &-edit {
            color: rgb(32, 182, 32);
            margin-left: 20px;
          }
        }
        &:hover {
          background-color: #e6e3e3;
        }
      }
    }
  }
}
</style>
