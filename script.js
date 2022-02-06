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
