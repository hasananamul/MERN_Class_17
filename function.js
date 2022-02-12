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
 