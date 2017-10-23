<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>BOIDS!</title>
	<link rel="stylesheet" href="css/style.css">
	<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>

<body id="home">

  <div id="boids-wrapper">
    <canvas id="boids"></canvas>
		<div id="boids-controls-container">
			<div class="boids-control">
				<p>Coherence<p>
			</div>
			<div class="boids-control">
				<p>Avoidance<p>
			</div>
			<div class="boids-control">
				<p>Speed<p>
			</div>
			<div class="boids-control">
				<p>Agility<p>
			</div>
			<div class="boids-control">
				<p>Racism<p>
			</div>
		</div>
	</div>

  <script src="js/boid.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
