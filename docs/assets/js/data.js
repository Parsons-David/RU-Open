/**
 * Created by David on 7/16/2017.
 */
var semesterData;

$.ajax({
    url : "http://davidparsons.io/RU-Open/assets/json/summer2017data.json",
    dataType: "json",
    success: function (data) {
        console.log(data);
    }
});