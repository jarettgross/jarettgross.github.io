geometry.vertices.push(polygonCenter);
			
var idxVertices = [];
var newCount = 0;
for (var j = 0; j < 6; j++) {
	var idx = geometry.vertices.indexOf(orderedPolygon[j]);
	if (idx === -1) {
		geometry.vertices.push(orderedPolygon[j]);
		idxVertices[j] = vertexIndex + newCount + 1;
		newCount++;
	} else {
		idxVertices[j] = idx;
	}
}

geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[0], idxVertices[1]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[1], idxVertices[2]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[2], idxVertices[3]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[3], idxVertices[4]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[4], idxVertices[5]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[5], idxVertices[0]));

polygonGroups.push({
	vertices: [vertexIndex, idxVertices[0], idxVertices[1], idxVertices[2], idxVertices[3], idxVertices[4], idxVertices[5]],
	faces:    [faceIndex, faceIndex+1, faceIndex+2, faceIndex+3, faceIndex+4, faceIndex+5]
});

vertexIndex += newCount;
faceIndex += 6;

//===========

geometry.vertices.push(polygonCenter);
			
var idxVertices = [];
var newCount = 0;
for (var j = 0; j < 5; j++) {
	var idx = geometry.vertices.indexOf(orderedPolygon[j]);
	if (idx === -1) {
		geometry.vertices.push(orderedPolygon[j]);
		idxVertices[j] = vertexIndex + newCount + 1;
		newCount++;
	} else {
		idxVertices[j] = idx;
	}
}

geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[0], idxVertices[1]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[1], idxVertices[2]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[2], idxVertices[3]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[3], idxVertices[4]));
geometry.faces.push(new THREE.Face3(vertexIndex, idxVertices[4], idxVertices[0]));

polygonGroups.push({
	vertices: [vertexIndex, idxVertices[0], idxVertices[1], idxVertices[2], idxVertices[3], idxVertices[4]],
	faces:    [faceIndex, faceIndex+1, faceIndex+2, faceIndex+3, faceIndex+4]
});

vertexIndex += newCount;
faceIndex += 5;

//=======

//Save on memory?

var centroid = getCentroid(planetMesh.geometry, planetFaces[j]);
var hasCentroid = false;
for (var k = 0; k < geometry.vertices.length; k++) {
	var vertex = geometry.vertices[k];
	if (vertex.x === centroid[0] && vertex.y === centroid[1] && vertex.z === centroid[2]) {
		polygon.push(vertex);
		hasCentroid = true;
		break;
	}
}
if (!hasCentroid) polygon.push(new THREE.Vector3(centroid[0], centroid[1], centroid[2]));