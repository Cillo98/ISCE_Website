function readTextFile(path) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, false);
    
    var tilesContainer = document.getElementById("tilesContainer");
    
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var all = rawFile.responseText;
                var groups = all.split("*****");
                
                for (var i=0; i<groups.length; i++) {
                    generateTile(groups[i], tilesContainer);
                }
            }
        }
        else {
            tilesContainer.innerText = "error reading file";
        }
    };
    rawFile.send(null);
};


function generateTile(group, tilesContainer) {
    var fields = group.split("***");
    
    var project = document.createElement("div");
    project.className = "project";
    
    project.innerHTML = "<a href='project.html/?project="+fields[2]+"'>" +
                            "<div>" +
                                "<h2>" +
                                    fields[0] +
                                "</h2>" +

                                "<p>" +
                                    fields[1] +
                                "</p>" +
                            "</div>" +
                        "</a>";
    
    tilesContainer.appendChild(project);
}