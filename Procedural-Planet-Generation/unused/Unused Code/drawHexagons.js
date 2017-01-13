function drawHexagons(planetMesh) {
    var faceIndices = ['a', 'b', 'c'];
    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    var planetFaces = planetMesh.geometry.faces;
    for (var i = 0; i < planetFaces.length; i++) {
        var geometry = new THREE.Geometry();
        var face = planetFaces[i];

        var count = 0;
        for (var j = i + 1; j < planetFaces.length - 1; j++) {
            var otherFace = planetFaces[j];

            //Find matching vertices to find adjacent triangles
            var matches = 0;
            for (var k = 0; k < 3; k++) {
                if (matches === 2) break;
                for (var m = 0; m < 3; m++) {
                    if (otherFace[faceIndices[m]] === face[faceIndices[k]]) {
                        matches++;
                        if (matches === 2) break;
                    }
                }
            }
            
            //If adjacent triangles, draw line between centers
            if (matches === 2) {
                geometry.vertices.push(getCentroid(planetMesh.geometry, face));
                geometry.vertices.push(getCentroid(planetMesh.geometry, otherFace));
                scene.add(new THREE.Line(geometry, material));

                count++;
                if (count === 3) break;
            }
        }
    }
}

//==================
//HELPER FUNCTIONS
//==================

function getCentroid(geometry, face) {
    var vertices = geometry.vertices;
    var x = (vertices[face['a']].x + vertices[face['b']].x + vertices[face['c']].x) / 3;
    var y = (vertices[face['a']].y + vertices[face['b']].y + vertices[face['c']].y) / 3;
    var z = (vertices[face['a']].z + vertices[face['b']].z + vertices[face['c']].z) / 3;
    return new THREE.Vector3(x, y, z);
}