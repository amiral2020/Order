
function algorithmes(){
	
	var comingValue = document.getElementsByName("comingFields[]");
	var timeValue = document.getElementsByName("timeFields[]");
	
	var donnee = Array();
	
	for(i = 0; i <= theIProcessus ; i++ ) {
		donnee[i] = {
				name : "P"+i ,
				coming : comingValue[i].value,
				time : timeValue[i].value,
				termine : false
		};
		
		console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
		
	
	}
	
	var optionsRadios = document.getElementsByName("optionsRadios");
	var choix;
	
	for(i = 0; i < optionsRadios.length; i++){
		if(optionsRadios[i].checked) choix = optionsRadios[i].value;
	}
	
	console.log(choix);
	
	var gant = Array();
	
	switch(choix){
		case "FIFO" : {
			console.log("the fifo");
			donnee = fifo(donnee);
			gant = firstGanntt(donnee);
			break;
		}
		case "PCTE" : {
			console.log("the PCTE");
			donnee = pcte(donnee);
			gant = firstGanntt(donnee);
			break;
		}
		case "PCTER" : {
			console.log("the PCTER");
			donnee = pcter(donnee);
			gant = firstGanntt(donnee);
			break;
		}
		case "TOURNIQUET" : {
			console.log("the TOURNIQUET");
			donnee = fifo(donnee);
			gant = tourniquet(donnee);
			break;
		}
	}
	
	var theTable = document.getElementById("ganttTable");
	theTable.innerHTML = "";
	var boool = true;
	var temmmp = gant[0];
	for(i=0; i < gant.length ; i++){
		console.log(gant[i]);
		if(gant[i]=="") theTable.innerHTML += '<td><button class="btn btn-danger btn-add" type="button"></button></td>';
		else 
			{
				
				if(temmmp != gant[i]){
					if(boool) boool = false; 
					else boool = true;
				}
				if(boool) theTable.innerHTML += '<td><button class="btn btn-success btn-add" type="button">'+gant[i]+'</button></td>';
				else theTable.innerHTML += '<td><button class="btn btn-primary btn-add" type="button">'+gant[i]+'</button></td>';
			}
		
		var temmmp = gant[i];
	}
	
	var theTableThTime = document.getElementById("ganttTableTime");
	theTableThTime.innerHTML = "";
	for(i=0; i < gant.length ; i++){
		theTableThTime.innerHTML +='<td>'+i+'</td>';
	}
	
//	console.log("pcter");
//	pcter(donnee);
//	
//	console.log("fifo");
//	fifo(donnee);
//	
//	console.log("pcte");
//	pcte(donnee);
}


	function firstGanntt(donnee){
		var gant = Array();
		var t = 0;
		for(i = 0; i < donnee.length; i++)
		{
			while(t < donnee[i].coming){
				gant[t] = "";
				t++;
			}
			for(j = 0; j < donnee[i].time; j++){
				gant[t] = donnee[i].name;
				t++;
			}
		}
		
		return gant;
	}
	
	// impl. des algorithmes
	
	function fifo(donnee) {
		
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].coming > donnee[j].coming){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		return donnee;
	}
	
	

	function pcter(donnee){
		
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].time > donnee[j].time){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		
		return donnee;
	}
	
	
	function pcte(donnee) {
	
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].coming < donnee[j].coming){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		return donnee;
	}
	
	function countNumberProcessusTermine(donnee)
	{
		var temp = 0;
		for(i = 0; i < donnee.length; i++){
			if(donnee[i].termine) temp++;
		}
		
		return temp;
	}
	
	function countExecutionTime(name, gant)
	{
		var times = 0;
		for(i = 0; i < gant.length; i++){
			if(gant[i] == name) times++;
		}
		
		return times;
	}
	
	
	function tourniquet(donnees) {
		var gant = Array();
		var quantum = document.getElementById("quantum").value;
		
		console.log(quantum);
		var processusTermine = 0;
		var t = 0;
		var q = 0;
		var x = 0;
		while(processusTermine < donnees.length){
			x = 0;
			for(c = 0 ; c < donnees.length; c++){
				if(donnees[c].termine == false){
					x++;
					while(t < donnees[c].coming){
						if(x==1) {
							gant[t] = "";
							t++;
						}else {
							c--;
						}
					}
					q = 0;
					var d = donnees[c];
					while((q < quantum) && (countExecutionTime(donnees[c].name, gant) < d.time )){
						gant[t] = donnees[c].name;
						t++;
						q++;
					}
					console.log(donnees[i]);
					var theTime = donnees[c].time;
					if(countExecutionTime(donnees[c].name, gant) >= theTime ){
						donnees[c].termine = true;
					}
				}
			}
			
			processusTermine = countNumberProcessusTermine(donnees);
		}
		
		
		return gant;
	}
	

	

function chowInnut(){
	var optionsRadios = document.getElementsByName("optionsRadios");
	var choix;
	
	for(i = 0; i < optionsRadios.length; i++){
		if(optionsRadios[i].checked) choix = optionsRadios[i].value;
	}
	var quantum = document.getElementById("quantum");
	if(choix == "TOURNIQUET") quantum.style.display = "block";
	else quantum.style.display = "none";
}

