function rotateToVector(mesh, axis, vector) {
    mesh.quaternion.setFromUnitVectors(axis, vector.clone().normalize());
}

function moveToVector(mesh, vector) {
    mesh.position.copy(vector.clone().multiplyScalar(0.75));
}

function getRotation(mesh, polygon, planetMesh) {
    var meshVertices = mesh.geometry.vertices;
    var polygonVertices = polygon.vertices;
    var nearestPair = [];
    var minDist = 99999;
    for (var i = 0; i < meshVertices.length; i++) {
        for (var j = 1; j < polygonVertices.length; j++) {
            if (meshVertices[i].clone().applyQuaternion(mesh.quaternion).add(mesh.position).distanceTo(planetMesh.geometry.vertices[polygonVertices[j]]) < minDist) {
                minDist = meshVertices[i].clone().applyQuaternion(mesh.quaternion).add(mesh.position).distanceTo(planetMesh.geometry.vertices[polygonVertices[j]]);
                nearestPair = [meshVertices[i].clone().applyQuaternion(mesh.quaternion).add(mesh.position), planetMesh.geometry.vertices[polygonVertices[j]]];
            }
        }
    }

    var v1 = planetMesh.geometry.vertices[polygonVertices[0]].clone().sub(nearestPair[0]);
    var v2 = planetMesh.geometry.vertices[polygonVertices[0]].clone().sub(nearestPair[1]);

    createLine(planetMesh.geometry.vertices[polygonVertices[1]], planetMesh.geometry.vertices[polygonVertices[2]]);
    console.log(planetMesh.geometry.vertices[polygonVertices[0]].distanceTo(planetMesh.geometry.vertices[polygonVertices[4]]));

    return v1.angleTo(v2);
}

function resetMesh(mesh) {
    mesh.rotation.set(0,0,0);
    moveToVector(mesh, new THREE.Vector3(0, 0, 0));
}

function makeCylinder(planetMesh, planet) {
    var vector = planetMesh.geometry.vertices[planet.polygonGroups[0].vertices[0]];
    var point = planetMesh.geometry.vertices[planet.polygonGroups[0].vertices[1]];
    var radius = vector.distanceTo(point);

    var geometry = new THREE.CylinderGeometry(radius, radius, 100, 6, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x800000 });
    var cylinder = new THREE.Mesh(geometry, material);

    
    rotateToVector(cylinder, new THREE.Vector3(0, 1, 0), vector);
    moveToVector(cylinder, vector);

    var rot = getRotation(cylinder, planet.polygonGroups[0], planetMesh);

    var geometry = new THREE.CylinderGeometry(radius, radius, 100, 6, 1, false, Math.PI/1.92);
    var material = new THREE.MeshBasicMaterial({ color: 0x800000 });
    var cylinder2 = new THREE.Mesh(geometry, material);

    rotateToVector(cylinder2, new THREE.Vector3(0, 1, 0), vector);
    moveToVector(cylinder2, vector);

    //resetMesh(cylinder);
    //createLine(vector, point.multiplyScalar(1.0001));
    createLine(
        cylinder.geometry.vertices[1].clone().applyQuaternion(cylinder.quaternion).add(cylinder.position), 
        cylinder.geometry.vertices[0].clone().applyQuaternion(cylinder.quaternion).add(cylinder.position)
    );
    console.log(cylinder.geometry.vertices[1].clone().applyQuaternion(cylinder.quaternion).add(cylinder.position).distanceTo(cylinder.geometry.vertices[0].clone().applyQuaternion(cylinder.quaternion).add(cylinder.position)));

    //scene.add(cylinder);
    //scene.add(cylinder2);
}

function createLine(v1, v2) {
    var g = new THREE.Geometry();
    g.vertices.push(v1, v2);
    scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x0000ff })));
}