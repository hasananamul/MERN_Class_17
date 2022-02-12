/**
 * Loan section tabs scripting
 */
let tabs_item = document.querySelectorAll(
  ".tabs_section .tabs_header_content .tabs_item"
);
let all_tabs_content = document.querySelectorAll(".hasan_tabs_content");

tabs_item.forEach((tabs) => {
  tabs.addEventListener("click", function (e) {
    e.preventDefault();
    tabs_item.forEach((data) => {
      data.classList.remove("active");
    });
    all_tabs_content.forEach((all_tab_con) => {
      all_tab_con.classList.remove("active");
    });
    let tabs_content = document.querySelector(tabs.getAttribute("href"));
    tabs_content.classList.add("active");
    this.classList.add("active");
  });
});

/**
 * Small tabs scripting
 */
let tabs_btn = document.querySelectorAll(".hasan_tabs_header ul li a ");

let tabs_content_all = document.querySelectorAll(".hasan_tab_content");
tabs_btn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    tabs_btn.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    tabs_content_all.forEach((data) => {
      data.classList.remove("active");
    });

    let tabs_content = document.querySelector(this.getAttribute("href"));
    console.log(tabs_content);
    tabs_content.classList.add("active");
  });
});

/**
 * Student result form
 */
let result = new StudentsResult();

let student_form = document.querySelector(".student_form");
let table = document.querySelector(".student_result_table .table_data");

student_form.addEventListener("submit", function (e) {
  e.preventDefault();
  let student_name = document.querySelector(".student_form input[name='name']");
  let student_class = document.querySelector(
    ".student_form input[name='class']"
  );
  let student_roll = document.querySelector(".student_form input[name='roll']");
  let student_photo = document.querySelector(
    ".student_form input[name='image']"
  );
  let student_gender = document.querySelector(
    ".student_form input[name='gender']:checked"
  );
  // marks elements form
  let bangla = document.querySelector(
    '.student_form input[name="bangla"]'
  ).value;

  let English = document.querySelector(
    '.student_form input[name="English"]'
  ).value;
  let Science = document.querySelector(
    '.student_form input[name="Science"]'
  ).value;
  let Math = document.querySelector('.student_form input[name="Math"]').value;
  let Economic = document.querySelector(
    '.student_form input[name="Economic"]'
  ).value;
  let Social_science = document.querySelector(
    '.student_form input[name="Social-science"]'
  ).value;

  let student_data;
  if (get_data("student_result")) {
    student_data = get_data("student_result");
  } else {
    student_data = [];
  }
  student_data.push({
    Name: student_name.value,
    Class: student_class.value,
    Roll: student_roll.value,
    Photo: student_photo.value,
    Gender: student_gender.value,
    bangla: bangla,
    English: English,
    Math: Math,
    Social_science: Social_science,
    Science: Science,
    Economic: Economic,
  });
  send_data("student_result", student_data);
  show_result();
});
show_result();

/**
 * Show data to DOM
 */

function show_result() {
  let show = "";
  let all_data = get_data("student_result");
  all_data.map((data, index) => {
    show += ` 

                  <tr>
                    <td>${index + 1}</td>
                    <td>${data.Name}</td>
                    <td>${data.Class}</td>
                    <td>${data.Roll}</td>
                    <td><img style="width:40px;height:40px;objectFit: cover" src="${
                      data.Photo
                    }"</td>
                    <td>${data.Gender}</td>
                    
                    <td>${
                      result.totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      ).totalGrade
                    }</td>
                    <td>${result
                      .totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      )
                      .cgpa.toFixed(2)}</td>
                    <td onclick="open_modal(${index})" class="btn btn-success bg-success">View</td>
                    <td onclick="delete_data(${index})" class="btn btn-danger bg-danger">Delete</td>
                  </tr>
    `;
  });
  table.innerHTML = show;
}
/**
 * Student result Modals scripting
 */

let modal = document.querySelector(".modals");
let close = document.querySelector(".modal_content .close");

function open_modal(index) {
  /**
   * Student result popup showing
   */
  let student_mark = get_data("student_result");
  modal.innerHTML = `
       <div class="modal_content w-50 m-auto shadow mt-3">
          <div class="modal_title text-center mb-3 bg-light p-2">
            <h3>Student single result view</h3>
            <h3 onclick="close_modal ()" class="close">&times;</h3>
          </div>
          <div class="modal_body p-2">
            <div class="row">
              <div class="col-6">
                <div class="student_datails">
                  <div class="institute_name">
                    <h5>
                      <strong class="text-success">Institute Name:</strong> Ashapat Dakhil Madrasha
                    </h5>
                  </div>
                  <div class="student_name">
                    <h5><strong class="text-success">Student Nmae : </strong>${student_mark[
                      index
                    ].Name.toUpperCase()}</h5>
                  </div>
                  <div class="student_roll">
                    <h5><strong class="text-success">Roll No :</strong> ${
                      student_mark[index].Roll
                    }</h5>
                  </div>
                  <div class="student_reges_no">
                    <h5><strong class="text-success">Reg No :</strong> ${
                      student_mark[index].Class
                    }</h5>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="modal_img">
                  <img
                    class="shadow w-50 d-block m-auto"
                    src="${student_mark[index].Photo}"  
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <br />
            <div class="student_result_table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">Subjects</th>
                    <th class="text-center">Marks</th>
                    <th class="text-center">Total GPA</th>
                    <th class="text-center">Total CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Bangla</th>
                    <td>${student_mark[index].bangla}</td>
                    <th  rowspan="3"></th>                   
                    <th  rowspan="3"></th>                   
                  </tr>
                  <tr>
                    <th>English</th>
                    <td>${student_mark[index].English}</td>
                    
                  </tr>
                  <tr>
                    <th>Math</th>
                    <td>${student_mark[index].Math}</td>
                    
                  </tr>
                  <tr>
                    <th>Science</th>
                    <td>${student_mark[index].Science}</td>
                     <th rowspan="4" class="text-center">${
                       result.totalResult(
                         student_mark[index].bangla,
                         student_mark[index].English,
                         student_mark[index].Economic,
                         student_mark[index].Math,
                         student_mark[index].Science,
                         student_mark[index].Social_science
                       ).totalGrade
                     }</th>
                    <th rowspan="4" class="text-center">${result
                      .totalResult(
                        student_mark[index].Economic,
                        student_mark[index].English,
                        student_mark[index].Math,
                        student_mark[index].Science,
                        student_mark[index].Social_science,
                        student_mark[index].bangla
                      )
                      .cgpa.toFixed(2)}</th>
                    
                  </tr>
                  <tr>
                    <th>S-Science</th>
                    <td>${student_mark[index].Social_science}</td>
                  </tr>
                   <tr>
                    <th>Economice</th>
                    <td>${student_mark[index].Economic}</td>
                  </tr>
                    <tr>
                    <th>Math</th>
                    <td>${student_mark[index].Math}</td>
                  </tr>
                 
                
                </tbody>
              </table>
            </div>
            <!--student_result_table-->
          </div>
          <!--table body-->
        </div>

`;

  modal.classList.add("active");
  let modal_content = document.querySelector(".modal_content");
  modal_content.classList.add("active");
}

modal.addEventListener("click", function (e) {
  if (e.target == this) {
    modal.classList.remove("active");
    let modal_content = document.querySelector(".modal_content");
    modal_content.classList.remove("active");
  }
});
function close_modal() {
  let modal_content = document.querySelector(".modal_content");
  modal_content.classList.remove("active");
  modal.classList.remove("active");
}

let search_box = document.querySelector(".search_box input[name='search']");
search_box.addEventListener("keyup", function () {
  let show = "";
  let all_data = get_data("student_result");
  all_data.map((data, index) => {
    if (
      data.Name == search_box.value ||
      data.Roll == search_box.value ||
      index == search_box.value
    ) {
      show += ` 

                  <tr>
                    <td>${index + 1}</td>
                    <td>${data.Name}</td>
                    <td>${data.Class}</td>
                    <td>${data.Roll}</td>
                    <td><img style="width:40px;height:40px;objectFit: cover" src="${
                      data.Photo
                    }"</td>
                    <td>${data.Gender}</td>
                    
                    <td>${
                      result.totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      ).totalGrade
                    }</td>
                    <td>${result
                      .totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      )
                      .cgpa.toFixed(2)}</td>
                    <td onclick="open_modal(${index})" class="btn btn-success bg-success">View</td>
                    <td onclick="delete_data(${index})" class="btn btn-danger bg-danger">Delete</td>
                  </tr>
    `;
    }
    if (search_box.value == "") {
      show += ` 

                  <tr>
                    <td>${index + 1}</td>
                    <td>${data.Name}</td>
                    <td>${data.Class}</td>
                    <td>${data.Roll}</td>
                    <td><img style="width:40px;height:40px;objectFit: cover" src="${
                      data.Photo
                    }"</td>
                    <td>${data.Gender}</td>
                    
                    <td>${
                      result.totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      ).totalGrade
                    }</td>
                    <td>${result
                      .totalResult(
                        data.bangla,
                        data.Social_science,
                        data.Science,
                        data.Math,
                        data.English,
                        data.Economic
                      )
                      .cgpa.toFixed(2)}</td>
                    <td onclick="open_modal(${index})" class="btn btn-success bg-success">View</td>
                    <td onclick="delete_data(${index})" class="btn btn-danger bg-danger">Delete</td>
                  </tr>
    `;
    }
    table.innerHTML = show;
  });
});
