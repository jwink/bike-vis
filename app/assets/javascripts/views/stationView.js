
function StationView(station) {
  this.model = station;
  this.el = undefined;
}

//GO GET THIS.MODEL. ALL THE DATA TO SHOW - SHOW IT IN THE RIGHT PLACE FROM/TO
StationView.prototype.render = function() {
  
    newDiv = $("<div class='selected'>");
    newUl = $("<ul class='station-info'>");
    newDiv.append(newUl);  

    function addLi(li){
      newUl.append("<li class='station-detail'>").html(li);
    }

    addLi(this.model.current.label);
    addLi(this.model.current.availableBikes);


    this.el = newDiv;

}
