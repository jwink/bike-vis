$(function() {
  showHide();

  $('#signup-link').on('click', function() {
    $('#login-div').hide();
    $('#signup-div').dialog();
    return false;
  });

  $('#login-link').on('click', function() {
    $('#login-div').dialog();
    $('#signup-div').hide();
    return false;
  });

  $('#logout-link').on('click', function() {
    logOut();
    return false;
  });

});

function showHide() {
  var status = $('.user-id-span').data("user");
  if (status == 'no_user') {
    $('#logout-link').hide();
  } else {
    $('#login-link').hide();
    $('#signup-link').hide();
    $('#fb').hide();
    $('#twit').hide();

  }
}

function logOut() {
  $.ajax({
    url: '/sessions',
    method: 'delete',
    dataType: 'json',
    success: function() {
      console.log('hello');
      window.location.reload();
    }
  });
  $('#logout-link').hide();
  $('#login-link').show();
  $('#signup-link').show();
}


