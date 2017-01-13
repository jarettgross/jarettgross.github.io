var triangleList = [];
var geometry = new THREE.Geometry();

//===================
//TRIANGLE PROTOTYPE
//===================

function Triangle(vertex1, vertex2, vertex3) {
	this.vertex1 = vertex1;
	this.vertex2 = vertex2;
	this.vertex3 = vertex3;
}

Triangle.prototype.getPointOne = function() {
	return this.vertex1;
}

Triangle.prototype.getPointTwo = function() {
	return this.vertex2;
}

Triangle.prototype.getPointThree = function() {
	return this.vertex3;
}

//===================
//HELPER FUNCTIONS
//===================

function getMidpoint(p1, p2, idx) {
	return (p1.getComponent(idx) + p2.getComponent(idx)) / 2;
}

function createFace(a, b, c, v1, v2, v3) {
	triangleList.push(new Triangle(v1, v2, v3));

	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.vertices.push(v3);

	var face = new THREE.Face3(a, b, c);
	face.vertexNormals.push(v1.clone().normalize(), v2.clone().normalize(), v3.clone().normalize());
	return face;
}

//===================
//CREATE SPHERE MESH
//===================

function createSphereMesh(subdivisions) {
	if (subdivisions < 1) subdivisions = 1;
	if (subdivisions > 5) subdivisions = 5;

	var scaleFactor = 100;
	var goldenRatio = (1 + Math.sqrt(5)) / 2;

	//Icosahedron vertices with normals
	var vertex0  = new THREE.Vector3( 0,  1,  goldenRatio).multiplyScalar(scaleFactor);
	var vertex1  = new THREE.Vector3( 0,  1, -goldenRatio).multiplyScalar(scaleFactor);
	var vertex2  = new THREE.Vector3( 0, -1,  goldenRatio).multiplyScalar(scaleFactor);
	var vertex3  = new THREE.Vector3( 0, -1, -goldenRatio).multiplyScalar(scaleFactor);

	var vertex4  = new THREE.Vector3( 1,  goldenRatio, 0).multiplyScalar(scaleFactor);
	var vertex5  = new THREE.Vector3( 1, -goldenRatio, 0).multiplyScalar(scaleFactor);
	var vertex6  = new THREE.Vector3(-1,  goldenRatio, 0).multiplyScalar(scaleFactor);
	var vertex7  = new THREE.Vector3(-1, -goldenRatio, 0).multiplyScalar(scaleFactor);

	var vertex8  = new THREE.Vector3( goldenRatio, 0,  1).multiplyScalar(scaleFactor);
	var vertex9  = new THREE.Vector3(-goldenRatio, 0,  1).multiplyScalar(scaleFactor);
	var vertex10 = new THREE.Vector3( goldenRatio, 0, -1).multiplyScalar(scaleFactor);
	var vertex11 = new THREE.Vector3(-goldenRatio, 0, -1).multiplyScalar(scaleFactor);

	//Body of icosahedron (strip)
	geometry.faces.push(createFace(0, 2, 8, vertex0, vertex2, vertex8));
	geometry.faces.push(createFace(0, 8, 4, vertex0, vertex8, vertex4));
	geometry.faces.push(createFace(0, 9, 2, vertex0, vertex9, vertex2));
	geometry.faces.push(createFace(1, 3, 11, vertex1, vertex3, vertex11));
	geometry.faces.push(createFace(1, 4, 10, vertex1, vertex4, vertex10));
	geometry.faces.push(createFace(1, 10, 3, vertex1, vertex10, vertex3));
	geometry.faces.push(createFace(4, 8, 10, vertex4, vertex8, vertex10));
	geometry.faces.push(createFace(7, 2, 9, vertex7, vertex2, vertex9));
	geometry.faces.push(createFace(7, 9, 11, vertex7, vertex9, vertex11));
	geometry.faces.push(createFace(7, 11, 3, vertex7, vertex11, vertex3));

	//Top of icosahedron (fan)
	geometry.faces.push(createFace(5, 2, 7, vertex5, vertex2,  vertex7));
	geometry.faces.push(createFace(5, 3, 10, vertex5, vertex3,  vertex10));
	geometry.faces.push(createFace(5, 7, 3, vertex5, vertex7,  vertex3));
	geometry.faces.push(createFace(5, 8, 2, vertex5, vertex8,  vertex2));
	geometry.faces.push(createFace(5, 10, 8, vertex5, vertex10, vertex8));
	
	//Bottom of icosahedron (fan)
	geometry.faces.push(createFace(6, 0, 4, vertex6, vertex0,  vertex4));
	geometry.faces.push(createFace(6, 1, 11, vertex6, vertex1,  vertex11));
	geometry.faces.push(createFace(6, 4, 1, vertex6, vertex4,  vertex1));
	geometry.faces.push(createFace(6, 9, 0, vertex6, vertex9,  vertex0));
	geometry.faces.push(createFace(6, 11, 9, vertex6, vertex11, vertex9));

	var smallerTrianglesList = [];

	//Make triangles of icosahedron into smaller triangles
	for (var s = 1; s < subdivisions; s++) {
		for (var i = 0; i < triangleList.length; i++) {
			t = triangleList[i];
			//Calculate midpoints for smaller triangles to be made
			var m1 = new THREE.Vector3(
				getMidpoint(t.getPointOne(), t.getPointTwo(), 0),
				getMidpoint(t.getPointOne(), t.getPointTwo(), 1),
				getMidpoint(t.getPointOne(), t.getPointTwo(), 2));

			var m2 = new THREE.Vector3(
				getMidpoint(t.getPointThree(), t.getPointTwo(), 0),
				getMidpoint(t.getPointThree(), t.getPointTwo(), 1),
				getMidpoint(t.getPointThree(), t.getPointTwo(), 2));

			var m3 = new THREE.Vector3(
				getMidpoint(t.getPointOne(), t.getPointThree(), 0),
				getMidpoint(t.getPointOne(), t.getPointThree(), 1),
				getMidpoint(t.getPointOne(), t.getPointThree(), 2));

			//Make 4 smaller triangles from large triangle
			smallerTrianglesList.push(new Triangle(t.getPointOne(),   m1, m3));
			smallerTrianglesList.push(new Triangle(t.getPointTwo(),   m2, m1));
			smallerTrianglesList.push(new Triangle(t.getPointThree(), m3, m2));
			smallerTrianglesList.push(new Triangle(m1,                m2, m3));
		}

		for (var j = 0; j < smallerTrianglesList.length; j++) {
			triangleList[j] = smallerTrianglesList[j];
		}
		smallerTrianglesList = [];
	}

	//Create mesh
	geometry.computeFaceNormals();
	var material = new THREE.MeshBasicMaterial({ wireframe: true });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 50, 0);
	return mesh;
}