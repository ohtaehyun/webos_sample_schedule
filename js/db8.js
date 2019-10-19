const print = document.querySelector(".print")
const schedules =[];

function onPutKind() {
	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "putKind",
		parameters: {
			"id":"schedule.db-api:1",
			"owner":"com.schedule.app",
			"schema":{
				"properties":{
					"startDate":{
						"type":"string",
						"description":"schedule start date"
					},
					"endDate":{
						"type":"string",
						"description":"schedule end date"
                    },
                    "title":{
                        "type":"string",
                        "description":"schedule content"
					},
					"bgColor":{
                        "type":"string",
                        "description":"background-color"
					}
				}
			}
		},
		onComplete: getPutKindResponse
	});

	request.send();
}

function getPutKindResponse(inResponse) {
	var success = inResponse.returnValue;
    if (!success){
        return true;
	}
	
    return true;
}

function onPut(data) {

	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "put",
		parameters: {
			"objects":[
				{
					"_kind":"schedule.db-api:1",
					"startDate":data.startDate,
					"endDate":data.endDate,
					"title":data.title,
					"bgColor":data.backgroundColor
				}
			]
		},
		onComplete: getPutResponse
	});

	request.send();
}

function getPutResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		return true;
	}
	var str = "<table>";
	for(i in inResponse.results){
		str += "<tr>";
		str += "<td>";
		str += inResponse.results[i].id;;
		str += "</td>";
		str += "</tr>"
	}
	str +="</table>";
	return true;
}

function onFind() {
	while (schedules.length) { schedules.pop(); }
	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "find",
		parameters: {
			"query":{
				"from":"schedule.db-api:1"
			}
		},
		onComplete: getFindResponse
	});
	request.send();
}

function getFindResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		return true;
	}
	var str= ""
	for (var i =0;i<inResponse.results.length;i=i+2){
		data={
			title : inResponse.results[i].title,	
			backgroundColor:inResponse.results[i].bgColor,
			startDate: inResponse.results[i].startDate,
			endDate:inResponse.results[i].endDate
		}
		str=str+inResponse.results[i].startDate;
		schedules.push(data);
	}
	drawSchedules();
	return true;
}

function onDelKind() {

	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "delKind",
		parameters: {
			"id" : "schedule.db-api:1"
		},
		onComplete: getDelKindResponse
	});

	request.send();
}

function getDelKindResponse(inResponse) {
	var success = inResponse.returnValue;

	if (!success){
		return true;
	}
	return true;
}