function loadValues(path) {
    var projectName = location.search.substring(9);
    
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, false);
    
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var all = rawFile.responseText;
                all = all.replace(/(\r\n\t|\n|\r\t)/gm,"");
                var projects = all.split("**********");
                
                for (var i=0; i<projects.length; i++) {
                    if (projects[i].startsWith(projectName)) {
                        populatePage(projects[i]);
                        break;
                    }
                }
            }
        }
    };
    rawFile.send(null);
};


function populatePage(projectFull) {
    /*
     * project is a String that must be split at "***". Once splitted, it contains:
     * 0: projectName (not useful now)
     * 1: Title
     * 2: Description
     * 3: Initiator
     * 4: Responsible
     * 5: Events (separated by "**")
     * 6: Members (separated by "**")
     */
    
    var project = projectFull.split("***");
    
    // set the title (on the condition that the string is not null)
    if (project[1])
        document.getElementById("title").innerText = project[1];
    
    if (project[2])
        document.getElementById("description").innerText = project[2];
    
    /* Adrian de Riz,MSc Business Analytics,addi1878
     * once split at "," the array contains:
     * 0: Name
     * 1: Degree / field
     * 2: WeChat ID
     */
    if (project[3]) {
        var initiator = project[3].split(",");
        
        if (initiator[0])
            document.getElementById("initiatorName").innerText = initiator[0];
        
        if (initiator[1])
            document.getElementById("initiatorField").innerText = initiator[1];
        
        if (initiator[2])
            document.getElementById("initiatorWeChat").innerText = initiator[2];
    }
    
    // same division as project[3]
    if (project[4]) {
        var responsible = project[4].split(",");
        
        if (responsible[0])
            document.getElementById("responsibleName").innerText = responsible[0];
        
        if (responsible[1])
            document.getElementById("responsibleField").innerText = responsible[1];
        
        if (responsible[2])
            document.getElementById("responsibleWeChat").innerText = responsible[2];
    }
    
    if (project[5]) {
        var events = project[5].split("**");
        var eventArea = document.getElementById("events");
        
        for (var i=0; i<events.length; i++) {
            var event = document.createElement("p");
            event.innerText = events[i];
            eventArea.appendChild(event);
        }
    }
    
    if (project[6]) {
        var members = project[6].split("**");
        var memberArea = document.getElementById("contributors");
        
        for (var i=0; i<members.length; i++) {
            var memberBox = document.createElement("div");
            memberBox.className = "member";
            
            var member = members[i].split(",");
            
            memberBox.innerHTML =   "<img src='../../media/person.png'>" +
                                    "<p>"+member[0]+"</p>" +
                                    "<a>"+member[1]+"</a>";
            
            memberArea.appendChild(memberBox);
        }
    }
}