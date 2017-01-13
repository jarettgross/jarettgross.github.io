function generateNoiseSphere(planetMesh, scale, seed, lacunarity = 1.9, persistance = 0.5, octaves = 5) {
	noise.seed(seed);

	var noiseSphere = [];
	var maxValue    = Number.MIN_VALUE;
	var minValue    = Number.MAX_VALUE;

	var amplitude = 1.0;
	var frequency = 1.0;

	//Generate noise and find min, max values for coloring
	for (var i = 0; i < planetMesh.geometry.vertices.length; i++) {
	    var vertex = planetMesh.geometry.vertices[i];
	    var x = vertex.x;
        var y = vertex.y;
        var z = vertex.z;

        var value = 0;

        amplitude = 1;
        frequency = 1;

        for (var k = 0; k < octaves; k++) {
            value += amplitude * noise.simplex3(frequency * x / scale, frequency * y / scale, frequency * z / scale);
            amplitude *= persistance;
            frequency *= lacunarity;
        }

        noiseSphere.push(value);
        maxValue = Math.max(maxValue, value);
        minValue = Math.min(minValue, value);
	}

	return {
		noiseSphere: noiseSphere,
		maxValue:    maxValue,
		minValue:    minValue
	}
}