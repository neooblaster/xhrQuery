
<!DOCTYPE html>
<html>
	<head>
		
	</head>
	<body>
		<pre>
		<?php
		
			print_r($_REQUEST);
		
		?>
		</pre>
		
		<form method="post" action="#">
			<input type="text" value="test" name="itext"/>
			<input type="checkbox" name="icb"/>
			<input type="submit" value="send"/>
		</form>
	</body>
</html>