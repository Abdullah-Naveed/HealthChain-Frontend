$(document).ready(function() {
    let str = localStorage.getItem("user");

    if (str.startsWith("Dr")) {
        $("div.gp").show();
    } else {
        $("div.patient").show();
    }
});