
function algorithmes(){
	
	var comingValue = document.getElementsByName("comingFields[]");
	var timeValue = document.getElementsByName("timeFields[]");
	
	var donnee = Array();
	
	for(i = 0; i <= theIProcessus ; i++ ) {
		donnee[i] = {
				name : "P"+i ,
				coming : comingValue[i].value,
				time : timeValue[i].value
		};
		
		console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
	}
	
	// impl. des algorithmes
	
	function fifo(donnee) {
		
		return donnee;
	}
	
	function pcter() {
		
		return donnee.sort();
	}

		
	function pcte(donnee) {
		
		return donnee.reverse();
	}
	
	
	function tourniquet(donnee) {
		
	//	var quantum = 1;
		var tempDonnee = Array();
		
		for(i; i<donnee.length;i++){
			
			if(donnee[i].time>1){
				
				donnee[i].time-= 1;
				tempDonnee[i] = donnee[i];
			
			}else{
				
				tempDonnee[i] = donnee[i];
				donnee.splice(donnee.indexOf(value), i); // make sur we delete it like this :3
			}
		}
		return tempDonnee;
		}
	
}

function tracerGanttChart() {
	
	var theDivChart = $("#ganttChart");
	for(i = 0; i <= theIProcessus ;i++){
		
	}
	
}

