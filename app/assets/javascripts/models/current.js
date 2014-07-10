
//  get current citibike status, store into json


function currentData() {
  $.ajax({
    url: '/currents/nowinfo',
    dataType: 'json',
    success: function(data) {
      jobj = $.parseJSON(data);
      console.log(jobj[0].id);
    }
  });
}
