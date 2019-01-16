$(document).ready(function() {
    let str = localStorage.getItem("user");
    console.log(str);
    if (str.startsWith("Dr")) {
        $("div.gp").show();
    } else {
        $("div.patient").show();
    }
});