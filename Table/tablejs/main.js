let counterSub = 0;
const btnshow = document.getElementById("show_");
const dataKey = "studentsData";
const subjectsObjs = [
  { code: "PHM012", name: "Mathematics-1", hours: 3, semester: 1 },
  { code: "PHM021", name: "Vibration and Waves", hours: 3, semester: 1 },
  { code: "PHM031", name: "Statics", hours: 2, semester: 1 },
  { code: "MDP011", name: "Engineering Drawing", hours: 3, semester: 1 },
  { code: "PHM041", name: "Engineering Chemistry", hours: 2, semester: 1 },
  { code: "CSE031", name: "Computing in Engineering", hours: 2, semester: 1 },
  { code: "PHM022", name: "Electricity and Magnetism", hours: 3, semester: 1 },

  // semester 2

  { code: "PHM013", name: "Mathematics-2", hours: 3, semester: 2 },
  { code: "PHM032", name: "Dynamics", hours: 2, semester: 2 },
  {
    code: "CEP011",
    name: "Projection and Engineering Graphics",
    hours: 1,
    semester: 2,
  },
  { code: "MDP081", name: "Production Engineering", hours: 2, semester: 2 },
  {
    code: "ENG011",
    name: "Fundamentals of Engineering",
    hours: 2,
    semester: 2,
  },
  //semester 3

  { code: "CSE111", name: "Logic Design", hours: 3, semester: 3 },
  { code: "CSE131", name: "Computer Programming", hours: 3, semester: 3 },
  {
    code: "PHM113",
    name: "Differential and Partial Differential Equations",
    hours: 3,
    semester: 3,
  },
  {
    code: "EPM118",
    name: "Electrical and Electronic Circuits",
    hours: 2,
    semester: 3,
  },
  {
    code: "EPM211",
    name: "Properties of Electrical Materials",
    hours: 2,
    semester: 3,
  },
  {
    code: "ASU112",
    name: "Report Writing and Communication skills",
    hours: 2,
    semester: 3,
  },

  // semester 4

  {
    code: "CSE112",
    name: "Computer Organization and Architecture",
    hours: 3,
    semester: 4,
  },
  {
    code: "CSE111",
    name: "Advanced Computer Programming",
    hours: 2,
    semester: 4,
  },
  { code: "CSE334", name: "Software Engineering", hours: 2, semester: 4 },
  { code: "PHM111", name: "Probability and Statistics", hours: 2, semester: 4 },
  { code: "PHM114", name: "Numerical Analysis", hours: 2, semester: 4 },
  { code: "MMZO13", name: "ASU Elective-1", hours: 2, semester: 4 },
];
const resultTable = document.getElementById("result");
const column = document.getElementById("content");
const button = document.createElement("button");
button.innerHTML = "submit";
button.setAttribute("id", "submitbtn");
button.setAttribute("disabled", "");
content.appendChild(button);
const submitBtn = document.getElementById("submitbtn");
submitBtn.classList.add('btn','btn-dark','text-white','mt-2')
submitBtn.addEventListener("click", function () {
  if (loginStudent.gpa == 0) {
    submitStudentSubjects();
  } else {
    submitSubjectsSemster();
  }
});
let studentTotalHours = 0;
let loginStudent = JSON.parse(sessionStorage.getItem("loginStudent"));
console.log(loginStudent)
window.addEventListener("load", function () {
  if (loginStudent.totalHours != 0 && loginStudent.grade==0) {
    console.log(resultTable)
    resultTable.classList.add('d-flex')
  }else{
    resultTable.classList.add('d-flex')
      $('#show_').show()

    }})
$(function () {
  $(".js-check-all").on("click", function () {
    if ($(this).prop("checked")) {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", true);
      });
    } else {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", false);
      });
    }
  });
});
// semester 1

// check if data saved in local storage
let studentsArr = [];
if (getDataFromLocalStorage() != null) {
  studentsArr = getDataFromLocalStorage();
}
// subject object structure
function createSubjectObject(subject) {
  return {
    code: subject.code,
    name: subject.name,
    hours: subject.hours,
    gpa: 0,
    grade: "0",
    semester: subject.semester,
  };
}
const uncheckedBtns = document.getElementsByClassName("unchecked");
const checkedBtns = document.getElementsByClassName("checked");
// add one by one subject on click
let addedSubjects = [];
function addSubjectStudent(i, s) {
  let subject = createSubjectObject(subjectsObjs[i]);
  addedSubjects.push(subject);
  studentTotalHours += subjectsObjs[i].hours;
  s.setAttribute("disabled", "");
  s.style.textDecoration = "line-through";
 
  console.log(studentTotalHours);
  uncheckedBtns[i].removeAttribute("disabled");
  if (studentTotalHours == 18) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "");
  }
}
function setDataToLocalStorage() {
  localStorage.setItem(dataKey, JSON.stringify(studentsArr));
}
function getDataFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem(dataKey));
  return data;
}
// remove subject object on click button
function removeStudent(index, item) {
  let s = index;
  let found = subjectsObjs[s];
  for (let i = 0; i < addedSubjects.length; i++) {
    if (addedSubjects[i].code == found.code) {
      studentTotalHours = studentTotalHours - subjectsObjs[index].hours;
      addedSubjects.splice(i, 1);
      console.log(studentTotalHours);
      submitBtn.removeAttribute("disabled");
      if (studentTotalHours < 18 || studentTotalHours > 18) {
        submitBtn.setAttribute("disabled", "");
      }
    }
  }
  item.setAttribute("disabled", "");
  checkedBtns[index].style.textDecoration = "none";
  checkedBtns[index].removeAttribute("disabled");
}
// submit all subjects button
function submitStudentSubjects() {
  if (studentTotalHours == 18) {
    loginStudent.subjects = addedSubjects;
    loginStudent.totalHours = studentTotalHours;
    studentsArr.push(loginStudent);
    addedSubjects = [];
    console.log(addedSubjects, "addedSubjects");
  }
  sessionStorage.setItem('loginStudent',JSON.stringify(loginStudent))
  setDataToLocalStorage();
location.reload()
  $("#submitbtn").hide();
  $("#show_").hide();
  counterSub = 0;
  $(".content").hide();
}

$(function () {
  $(".js-check-all").on("click", function () {
    if ($(this).prop("checked")) {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", true);
      });
    } else {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", false);
      });
    }
  });
});

  for (let i = 0; i < subjectsObjs.length; i++) {
    if (subjectsObjs[i].semester == 1 && loginStudent.totalHours == 0) {
      tbody.innerHTML += `  
  <tr scope="row" class='trOfTable'>                              
  <td>#${subjectsObjs[i].code}</td>
  <td class="subject">${subjectsObjs[i].name}</td>
  <td class="hours">${subjectsObjs[i].hours}</td>
  <td><button  onclick="addSubjectStudent(${i},this)"; class='checked bg-success border-0 text-white px-2 rounded-pill py-1' data-checked=true> Add</button></td>
  <td ><button onclick='removeStudent(${i},this)'; class='unchecked text-white border-0 bg-danger px-2 rounded-pill py-1 ' data-checked=false disabled >Remove</button></td>	   
  </tr>`;
  } else if (subjectsObjs[i].semester > 1 && loginStudent.totalHours > 0) {
    tbody.innerHTML += `  
  <tr scope="row" class='trOfTable'>                              
  <td>#${subjectsObjs[i].code}</td>
  <td class="subject">${subjectsObjs[i].name}</td>
  <td class="hours">${subjectsObjs[i].hours}</td>
  <td><button  onclick="addSubjectsSemster2(${i},this)"; class='checked bg-success border-0 text-white px-2 rounded-pill py-1' data-checked=true> Add</button></td>
  <td ><button onclick='removeSubjectsSemster2(${i},this)'; class='unchecked text-white border-0 bg-danger px-2 rounded-pill py-1 ' data-checked=false disabled >Remove</button></td>	   
  </tr>`;
    counterSub++;
  }
}

let subLength = subjectsObjs.length - counterSub;
let bol= true
$(document).ready(function () {
  $(".show").click(function () {
    $(".content").fadeIn(1000);
  });
});

let studentId = document.getElementById("studentId");
let studentIdResult = document.getElementById("studentIdResult");
studentIdResult.innerHTML = `#${loginStudent.id}`;
studentBody.innerHTML += `  
    <tr scope="row" class='trOfTable ' >                              
    <td class='columnStudent'> # ${loginStudent.id}</td>	  
    <td class='columnStudent'>${loginStudent.email}</td>
    <td class='columnStudent '>${loginStudent.gpa}</td>
    <td class='columnStudent'>${loginStudent.grade}</td>	   
    </tr>`;

studentId.innerHTML = `#${loginStudent.id}`;
(function () {
  let updatedresults = "";
  for (let i = 0; i < loginStudent.subjects.length; i++) {
    updatedresults += `  
    <tr scope="row"  class='trOfTable' id='trOfTable_'>                              
    <td>#${loginStudent.subjects[i].code}</td>
    <td class="subject">${loginStudent.subjects[i].name}</td>
    <td class="hours">${loginStudent.subjects[i].hours}</td>
    <td>${loginStudent.subjects[i].grade}</td>	   
    </tr>
    `;
  }
  tbodyResult.innerHTML = updatedresults;
})();
//---------------------semster2--------------------
let counter = 0;

function addSubjectsSemster2(i, t) {
  let x = 21;
  let y = 18;
  let z = 14;
  let sub = subjectsObjs.length;
  let uncheckedSub = counterSub + i - sub;
  t.setAttribute("disabled", "");
  t.style.textDecoration = "line-through";

  uncheckedBtns[uncheckedSub].removeAttribute("disabled");
  if (loginStudent.gpa >= 3.6) {
    if (counter < x) {
      console.log("true A+");
      addedSubjects.push(createSubjectObject(subjectsObjs[i]));
      counter += subjectsObjs[i].hours;
      submitBtn.removeAttribute("disabled");
      console.log(counter);
      if (counter == 21) {
        t.setAttribute("disabled", "");
      }
      if (counter > 21) {
        submitBtn.setAttribute("disabled", "");
      }
    }
  } else if (loginStudent.gpa >= 2 && loginStudent.gpa < 3.6) {
    if (counter < y) {
      console.log("true B,C");
      addedSubjects.push(createSubjectObject(subjectsObjs[i]));
      counter += subjectsObjs[i].hours;
      submitBtn.removeAttribute("disabled");
      console.log(counter);

      if (counter == y) {
        t.removeAttribute("disabled");
      }
      if (counter > y) {
        submitBtn.setAttribute("disabled", "");
      }
    }
  } else if (loginStudent.gpa < 2) {
    if (counter < z) {
      counter += subjectsObjs[i].hours;
      addedSubjects.push(createSubjectObject(subjectsObjs[i]));
      submitBtn.removeAttribute("disabled");
      if (counter > z) {
        submitBtn.setAttribute("disabled", "");
        t.setAttribute("disabled", "");
      }
    }
  }

  console.log(addedSubjects);
}

function removeSubjectsSemster2(i) {
  let founds = createSubjectObject(subjectsObjs[i]);
  for (let j = 0; j < addedSubjects.length; j++) {
    if (founds.name == addedSubjects[j].name) {
      decrement(j);
      addedSubjects.splice(j, 1);
      checkedBtns[i - 7].removeAttribute("disabled");
      checkedBtns[i - 7].style.textDecoration = "none";

    }
  }
}
function decrement(j) {
  counter -= addedSubjects[j].hours;
  console.log(counter);
  console.log(j);
}


function submitSubjectsSemster() {
  for (let i = 0; i < studentsArr.length; i++) {
    if (loginStudent.id == studentsArr[i].id) {
      loginStudent.subjects.push(addedSubjects);
      loginStudent.subjects = loginStudent.subjects.flat();
      loginStudent.totalHours += counter;
      studentsArr.splice(i, 1, loginStudent);
      sessionStorage.setItem('loginStudent',JSON.stringify(loginStudent))
      setDataToLocalStorage();
      // $('#show_').hide()
      location.reload();
    }
  }
}
function returnToLogin(){
  location.replace("../LOGIN-FORM/index.html")
  sessionStorage.removeItem('loginStudent')
}

    // swal("Good job!", "Submitted your subjects!", "success");
