let inputID = document.getElementById("idStu");
let studentObj = {};
const studentId = document.getElementById("studentId");
let studentIndex;
let systemUsers = [];
let checkInput;
if (localStorage.getItem("studentsData") != null) {
  systemUsers = JSON.parse(localStorage.getItem("studentsData"));
  function checkStudentID() {
    for (let i = 0; i < systemUsers.length; i++) {
      if (inputID.value == systemUsers[i].id) {
        studentObj = systemUsers[i];
        studentIndex = i;
        studentId.innerHTML = `#${studentObj.id}`;
        return true;
      }
     
    }
  }
  $(document).ready(function () {
    $(".show").click(function () {
      console.log("hello");

      let isFound = checkStudentID();
      console.log(studentObj);
      console.log(studentObj.grade);

      if (isFound == true) {
        console.log(studentObj.grade);
        if (studentObj.grade != 0) {
          checkInput = "hidden";
          showStudentSubjects(checkInput);

          $("#calcs").hide();

          $(".content").fadeIn(1000);
        } else {
          // console.log('found-grade0')
          $(".content").fadeIn(1000);
          checkInput = "text";
          showStudentSubjects(checkInput);
        }
      } else {
        // console.log("notfound");
        alert("Id not found")
        $(".content").fadeOut(1000);

        // $(".content").fadeIn(1000);
      }
    });
  });
}
function showStudentSubjects(checks) {
  let updatedresults = "";
  for (let i = 0; i < studentObj.subjects.length; i++) {
    updatedresults += `  
    <tr scope="row" class='trOfTable'>                              
    <td>#${studentObj.subjects[i].code}</td>
    <td class="subject">${studentObj.subjects[i].name}</td>
    <td class="hours">${studentObj.subjects[i].hours}</td>
    <td><input id='degree${i}' type = ${checks}  size=5 maxlength=3 class = ' classDegree rounded-pill border-0 bg-secondary text-center text-white outline-none'></td>
    <td>${studentObj.subjects[i].grade}</td>	   
    </tr>
    
    `;
  }
  tbody.innerHTML = updatedresults;
}

let grade = ["A", "A-", "B", "B-", "C", "C-", "D", "D-", "F"];

function calcFun() {
  let degree = 0;
  let gpaSum = 0;
  let addHours = 0;
  for (let i = 0; i < studentObj.subjects.length; i++) {
    let inputDegree = document.getElementById(`degree${i}`);
    degree = Number(inputDegree.value);
    calcs.setAttribute("disabled", "");
    let x = gpaStudent(studentObj.subjects[i].hours, degree);
    studentObj.subjects[i].gpa = x;
    gpaSum += x;
    addHours += studentObj.subjects[i].hours;
    let y = gradeStudent(degree);
    studentObj.subjects[i].grade = y;
  }
  let total = gpaSum / addHours;
  studentObj.gpa = total;
  studentObj.totalHours = addHours;
  let z = gradeTotalAll();
  studentObj.grade = z;
  checkInput = "hidden";
  showStudentSubjects(checkInput);
  let totalElment = document.getElementById("total");
  totalElment.innerHTML = `<div class='bg-dark text-white px-2 py-1 rounded-2 mt-2 rounded text-white ' ><span class='text-white'>${studentObj.gpa}</span> / 
  <span class='text-white' >${studentObj.grade}</span></div>`;
  systemUsers.splice(studentIndex, 1, studentObj);
  console.log(systemUsers);
  localStorage.setItem("studentsData", JSON.stringify(systemUsers));
}
function gradeStudent(degree) {
  if (degree <= 100 && degree >= 93) {
    return grade[0]; //a
  } else if (degree < 93 && degree >= 86) {
    return grade[1]; //a-
  } else if (degree < 86 && degree >= 80) {
    return grade[2];
    //b
  } else if (degree < 80 && degree >= 76) {
    return grade[3];
    //b-
  } else if (degree < 76 && degree >= 72) {
    return grade[4];
    //c
  } else if (degree < 72 && degree >= 70) {
    return grade[5];
    //c-
  } else if (degree < 70 && degree >= 67) {
    return grade[6];

    //d
  } else if (degree < 67 && degree >= 60) {
    return grade[7];

    //d-
  } else {
    return grade[8]; //f
  }
}
// let gradeTotal = ["A", "A-", "B", "B-", "C", "C-", "D", "D-", "F"];
function gradeTotalAll() {
  let total = studentObj.gpa;
  if (total == 4) {
    return grade[0];

    //a
  } else if (total < 4 && total > 3.7) {
    return grade[1];

    //a-
  } else if (total < 3.7 && total >= 3.3) {
    return grade[2];
  } else if (total < 3.3 && total >= 2.7) {
    return grade[3];
    //b-
  } else if (total < 2.7 && total >= 2.0) {
    return grade[4];
    //c
  } else if (total < 2.0 && total >= 1.7) {
    return grade[5];
    //c-
  } else if (total < 1.7 && total >= 1) {
    return grade[6];
    //d
  } else if (total < 1 && total >= 0.7) {
    return grade[7];
    //d-
  } else {
    return grade[8];
    //f
  }
}
function gpaStudent(hours, degree) {
  let gpaStu = (degree / 20 - 1) * hours;
  return gpaStu;
}

// document.getElementById("logoutBtn").addEventListener('click',function () {
//   location.href = "../LOGIN-FORM/index.html";
// });

function returnToLogin() {
  location.replace("../LOGIN-FORM/index.html");
  // sessionStorage.removeItem('loginStudent')
}
