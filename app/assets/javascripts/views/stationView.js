
function StationView(station) {
  this.model = station;
  this.el = undefined;
}

//GO GET THIS.MODEL. ALL THE DATA TO SHOW - SHOW IT IN THE RIGHT PLACE FROM/TO
StationView.prototype.render = function() {
  
    newDiv = $("<div class='selected'>").html("<ul class='station-info'>");  

    function addLi(li){
      newDiv.append("<li class='station-detail'>").html(li);
    }

    addLi(this.model.current.label);


    this.el = newDiv;
    
}
