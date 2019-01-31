function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  var phoneno = /^\d{16}$/;
  if (x == "") {
    alert("CardNumber must be filled out");
    return false; }

  if (x.match(phoneno)) { return true; }
  else {
    alert("Not a valid CardFormat");
    return false;
  }
}
