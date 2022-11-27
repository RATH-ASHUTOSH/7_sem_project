/**
* Ce fichier contient toutes les fonctions forgeant des requêtes pour l'API tag
*
*/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var invocation=new XMLHttpRequest();

var reponse={};                  //Stocke les réponses du bot

/**
* Cette fonction permet de récupérer l'objet tag contenant les réponses des requêtes
*/
exports.getReply = function() {
  return reponse;
};


/**
* Cette fonction permet d'obtenir une réponse du robot
*/
exports.reply=function(username,msg,id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={"username":username,"message":msg}
    invocation.open('POST', "http://localhost:"+id+"/reply", false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	reponse = JSON.parse(invocation.responseText);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(tag));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet d'obtenir la liste des robots
*/
exports.getAllRobotsSMS=function(){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/sms', false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
    	try{
          	reponse = JSON.parse(invocation.responseText);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}


/**
* Cette fonction permet d'obtenir les informations sur un robot
*/
exports.getARobot=function(name){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/'+name, false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
    	try{
          	reponse = JSON.parse(invocation.responseText);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet d'obtenir la liste des personalités
*/
exports.getAllPersonality=function () {
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/aide/personnalites', false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
      try{
            reponse = JSON.parse(invocation.responseText);
      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet d'obtenir la liste des interfaces
*/
exports.getAllInterface=function () {
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/aide/interface', false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
      try{
            reponse = JSON.parse(invocation.responseText);
      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet de créer un robot en fonction de ce que l'utilisateur a rentré
*/
exports.createARobot=function(name,personality,interface){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let robot={name: name,personality: personality,interface: interface };
    invocation.open('POST', 'http://localhost:8080', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	reponse = JSON.parse(invocation.responseText);
    		  //  console.log(response);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(robot));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet d'obtenir la liste des personalités
*/
exports.modify=function (namebot,newname,personality) {
  var invocation =new XMLHttpRequest();
  if(invocation){
    let name={"name": newname };
    invocation.open('PUT', 'http://localhost:8080/'+namebot, false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
      try{
            reponse = JSON.parse(invocation.responseText);
      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(name));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}
