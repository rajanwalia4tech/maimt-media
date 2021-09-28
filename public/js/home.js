///sign up and signin show hide
$(document).ready(function () {
    $("#hide").click(function () {
      $("#2").hide();
      $("#1").show();
    });
    $("#show").click(function () {
      $("#2").show();
      $("#1").hide();
    });
  });
  
  //form validation 
  
  function validation(event) {
    event.preventDefault();
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    // var date = document.getElementById("date").value;
  
    var fnameCheck = /^[A-Za-z. ]{3,15}$/;
    var lnameCheak = /^[A-Za-z. ]{3,10}$/;
    var emailCheak = /^([\.\_a-zA....-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
    // var chdate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  
    // *******************************FOR FIRST NAME*****************************************
    var flag = 0;
    if (fnameCheck.test(first_name)) {
      document.getElementById("htc").innerHTML = null;
      flag++;
    } else {
      document.getElementById("htc").innerHTML = "Enter the First Name";
      document.getElementById("htc").style.color = "red";
      document.getElementById("htc").style.paddingRight = "50px";
      return false;
    }
  
    // ********************************FOR LAST NAME *****************************************
  
    if (lnameCheak.test(last_name)) {
      document.getElementById("cheaklname").innerHTML = null;
      flag++;
    } else {
      document.getElementById("cheaklname").innerHTML = "Enter the Last Name";
      document.getElementById("cheaklname").style.color = "red";
      return false;
    }
  
    // ************************* FOR EMAIL*****************************************************
  
    if (emailCheak.test(email) || emailCheak.test(email)) {
      document.getElementById("echeak").innerHTML = null;
      flag++;
    } else {
      document.getElementById("echeak").innerHTML = "Enter valid Email";
      document.getElementById("echeak").style.color = "red";
      return false;
    }
  
  //********************************DOB******************************************* */
     var date = document.getElementById("date").value;
     if(date == ""){
      document.getElementById("enterdate").innerHTML = "Date of birth is required";
      document.getElementById("enterdate").style.color = "red";
      return false;
     }
    
  //***************gender***************************************************** */
  
    if (document.getElementById("male").checked || document.getElementById("female").checked) {
    } else {
      document.getElementById("gen").innerHTML = "You must select gender";
         document.getElementById("gen").style.color = "red";
      return false;
      }  
  
  //****************************Password******************************************** */
     var pw = document.getElementById("password").value;
      //check empty password field
      if(pw == "") {
         document.getElementById("message").innerHTML = "**Fill the password please!";
         document.getElementById("message").style.color = "red";
         return false;
      }
  
     //minimum password length validation
      if(pw.length < 8) {
         document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
         document.getElementById("message").style.color = "red";
         return false;
      }
      if(pw.length > 15) {  
        document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";  
        return false;  
      }
    var pw1 = document.getElementById("password").value;  
    var pw2 = document.getElementById("confirm_password").value;  
    if(pw1 === pw2)  
    {   
      document.getElementById("message").innerHTML = "";
    } else {  
      document.getElementById("message").innerHTML = "Password not match";  
      document.getElementById("message").style.color = "red";
    }  
  }
  
  
  
  //*****************************LOGIN VALIDATION******************************** */
  
  function validation2(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var emailCheak2 = /^([\.\_a-zA....-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
    if (emailCheak2.test(email) || emailCheak2.test(email)) {
      document.getElementById("echeck2").innerHTML = null;
      flag++;
    } else {
      document.getElementById("echeck2").innerHTML = "Enter valid Email";
      document.getElementById("echeck2").style.color = "red";
      return false;
    }
    //****************************Password******************************************** */
    var pw = document.getElementById("password").value;
    //check empty password field
    if(pw == "") {
       document.getElementById("message").innerHTML = "**Fill the password please!";
       document.getElementById("message").style.color = "red";
       return false;
    }
  }
  