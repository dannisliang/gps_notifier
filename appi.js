
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  else{
    
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);


      var mapp = 'https://www.google.co.in/maps/place/'+latitude+','+longitude;

      var text= '<br>Share this Link: <br><br><a href='+mapp+'>'+ mapp +'</a>';
      output.innerHTML=text;
      //lnk=document.getElementsByTagName('a');
      //lnk[3].setAttribute('target','_blank');
      document.getElementById('collection').setAttribute('class','collection');
      var button='<a class="waves-effect waves-light btn-large"><font size="6px">Share</font></a>';
      var share=document.getElementById('share');
      share.setAttribute('class','collection-item');
      share.innerHTML=button;
      document.getElementById('share').addEventListener('click',shareLocation);
      var save = document.getElementById('save');
      save.setAttribute("class","collection-item");
      save.innerHTML='<a class="waves-effect waves-light btn-large";"><font size="6px">Save</font></a>';
      document.getElementById('save').addEventListener('click',saveLocation);
      function saveLocation()
      {
        var place = prompt("Please Enter a valid the Location name","My place");
        if (place!=null)
        {
          if(place=="")
          {
            saveLocation();
          }
          else{
            if(localStorage.file)
            {
              a = JSON.parse(localStorage.file);
              a.push({'name':place ,'map':mapp});
              localStorage.file=JSON.stringify(a);
            }
            else{
              a=[{'name':place,'map':mapp}];
              localStorage.file=JSON.stringify(a);
            }
            alert("New location saved!");
          }
        }
      }
      function shareLocation()
      {
      /*{
        new MozActivity({
          name: 'new',
          data: {
            type: 'websms/sms',
            number:'',
            body: "Hi this is LocateME.To view the the location of your friend Arush open this link<br>"
          }
        });
      }*/
      var name = prompt("Whats your name?","name");
      if (name!=null){

        window.open("sms:?body=Hii this is LocateMe!! Locate "+ name +" %40 :-%0A"+mapp,'_self');
      }
    }
  }
  function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            output.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "An unknown error occurred."
            break;
    }
  } 

  
  output.innerHTML = "<div class='progress'><div class='indeterminate'></div></div>";
  navigator.geolocation.getCurrentPosition(success, showError,{
      enableHighAccuracy : true
    });
  }
}
function share1(name,map)
{
  window.open("sms:?body=Hii this is LocateMe!! Locate "+name+"%40 :-%0A"+map ,'_self');
}
function places()
{
  document.getElementById('loc').setAttribute('class','active');
  document.getElementById('home').setAttribute('class','');
  main = document.getElementById('main');
  if(!!document.getElementById('body1'))
  {
    body1 = document.getElementById('body1');
    main.removeChild(body1);
  }
  if(!!document.getElementById('space'))
  {
    main.removeChild(space);
  }
  if(localStorage.file)
  {
    a = JSON.parse(localStorage.file);
    space = document.createElement('div');
    space.setAttribute('id','space');
    space.setAttribute('class','collection')
    main.appendChild(space);
    for(i=0; i<a.length ; i++)
    {
      row = document.createElement('div');
      row.setAttribute('class','row collection-item');
      space.appendChild(row);
      row.innerHTML='<div class="name col s4">' + a[i].name + '</div><div class="map col s4"><a href='+a[i].map+' target="_blank" >Map</a></div><div class="share col s2"><a href="#" onclick="share1(\''+a[i].name+'\',\''+a[i].map+'\');"><span class="medium mdi-content-mail"></span></a></div><div class="remove col s2" onclick="del('+i+');"><a href="#"><span class="medium mdi-action-delete"></span></a></div>';
      
    }
  }
}

function del(i)
{
  if(confirm("Are you sure you want to delete Location "+a[i].name+"?"))
  {
    a.splice(i,1);
    localStorage.file = JSON.stringify(a);
    main.removeChild(space);
    places();
  }
}

