<!DOCTYPE HTML>
<html>
	<head>
		<title>Pear-Up</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="./assets/css/main.css" />
		<script src="./gps.js"></script>
	</head>
	<body onload="getLocation()">

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Main -->
					<div id="main">

						<!-- One -->
							<section id="one">
								<img src="./images/banner.jpg" style="display: block; margin: 0 auto; height: 150px; width: 225px">
								<div class="container">
									<header class="major">
										<h2>Sign In</h2>
										<p>Please allow your browser to access your location.</p>
										<p>Otherwise, this application will not work.</p>
									<form method="post" action="./signIn.ejs">
										<div class="row uniform">
											<div class="6u 12u(xsmall)"><input type="text" name="name" id="name" placeholder="Name" autofocus /></div>
											<div class="6u 12u(xsmall)"><input type="text" name="password" id="password" placeholder="Password" /></div>
											<div >
												<input type="text" name="latitude" id="latitude" />
												<input type="text" name="longitude" id="longitude" />
											</div>
										</div>
										<div class="row uniform">
											<div class="12u">
												<ul class="actions">
													<li><input type="submit" class="special" value="Log in!" /></li>
													<li><input type="button" onclick="location.href='./createProfile.ejs'" value="Create Account" /></li>
												</ul>
												<strong style="color:red">Username not found.</strong>
											</div>
										</div>
									</form>
								</div>
							</section>
					</div>

				<!-- Footer -->
					<section id="footer">
						<div class="container">
							<ul class="copyright">
								<li>&copy; Pear-Up. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
							</ul>
						</div>
					</section>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollzer.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</body>
</html>