const username = document.getElementById("username");
const validationMsgUser = document.getElementById("validationMsgUser");
const password = document.getElementById("password");
$(function () {
  "use strict";
  $(".form-control").on("input", function () {
    let $field = $(this).closest(".form-group");
    if (this.value) {
      $field.addClass("field--not-empty");
    } else {
      $field.removeClass("field--not-empty");
    }
  });
});
// Regex Validation ----------------
username.addEventListener("input", () => {
  function valid() {
    const regex = /[1-9-0]+@company\.edu\.eg$/;
    if (regex.test(username.value)) {
      isValid.classList.remove("hidden");
      validationParent.classList.add("greenBorder");
      validationParent.classList.remove("redBorder");
      notvalid.classList.add("hidden");
      submit.removeAttribute("disabled");
      validationMsgUser.style.display = "none";
      return true;
    } else {
      submit.setAttribute("disabled", true);
      validationMsgUser.style.display = "block";
      isValid.classList.add("hidden");
      validationParent.classList.add("redBorder");
      validationParent.classList.remove("greenBorder");
      notvalid.classList.remove("hidden");
      return false;
    }
  }
  valid();
});
//end of validation
// Creat new student
let studentsArr = [];
let emailBase = "@company.edu.eg";
let dataKey = "studentsData";
let studentObj;

// check if data saved in local storage--------------------------
if (localStorage.getItem(dataKey) != null) {
  studentsArr = getDataFromLocalStorage();
}
// random id generator
function idGenerator() {
  let id = "";
  for (let i = 0; i < 4; i++) {
    let randNum = Math.floor(Math.random() * 9);
    id += randNum;
  }
  return id;
}
// this function should be called when log in as new student.
function createNewEmptyStudent() {
  let studentID = idGenerator();
  studentObj = {
    id: studentID,
    email: `${studentID}${emailBase}`,
    password: `P@ssw0rd${studentID}`,
    subjects: [], //array of objects
    gpa: 0,
    grade: "0",
    totalHours: 0,
    level: 0,
  };
  sessionStorage.setItem("loginStudent", JSON.stringify(studentObj));
  // localStorage.setItem(dataKey, JSON.stringify(studentsArr));
}
// get local stoarge --------------------------
function getDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(dataKey));
  return data;
}
// redirect to student Page -------------------------------------
function redirect() {
  let z = false;
  let x = username.value;

  let y = x.split("@company.edu.eg")[0];

  if (y == "1111" && password.value == "admin") {
    z = true;
    location.replace("../admin/index.html");
  }
  for (let i = 0; i < studentsArr.length; i++) {
    if (y == "1111" && password.value == "admin") {
      z = true;
      location.replace("../admin/index.html");
    } else if (
      y == studentsArr[i].id &&
      password.value == studentsArr[i].password
    ) {
      location.replace("../Table/studentPage.html");
      z = true;
      sessionStorage.setItem("loginStudent", JSON.stringify(studentsArr[i]));
    }
  }
  if (z != true) {
    swal("NotFound!", "wrong email or password", "error");
  }
}
