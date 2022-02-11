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

/**
 * Send data to local sorage
 * @param {*} key
 * @param {*} value
 * @returns
 */
function send_data(key, value) {
  let convert_data = JSON.stringify(value);
  localStorage.setItem(key, convert_data);
  return true;
}

/**
 * Get data from local storage
 * @param {*} key
 * @returns
 */
function get_data(key) {
  let revert_data = localStorage.getItem(key);
  return revert_data ? JSON.parse(revert_data) : [];
}

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
                    <td>5.00</td>
                    <td>A-</td>
                    <td onclick="open_modal(${index})" class="btn btn-success bg-success">View</td>
                    <td onclick="delete_data(${index})" class="btn btn-danger bg-danger">Delete</td>
                  </tr>
    `;
  });
  table.innerHTML = show;
}

/**
 * Delete student data
 */

function delete_data(index) {
  let sure = confirm(`Really Do yo want to Delete`);
  if (sure) {
    let storage_data = get_data("student_result");
    storage_data.splice(index, 1);
    send_data("student_result", storage_data);
    show_result();
  } else {
  }
}
/**
 * Student result Modals scripting
 */

let modal_content = document.querySelector(".modal_content");
let modal = document.querySelector(".modal");
let close = document.querySelector(".modal_content .close");

function open_modal(index) {
  modal_content.style.display = "block";
  modal.style.display = "block";
}

close.addEventListener("click", function () {
  modal.style.display = "none";
});
