<!DOCTYPE html>
<html>
	<head>
		
	</head>
	<body>
		<a href="DEV_ENV/">-- Dossier Parent --</a>
		
		<pre><?php print_r($_REQUEST);?></pre>
		
		<form method="post" action="classic_form.php">
			<input type="text" value="test" name="itext"/>
			<input type="checkbox" name="icb"/>
			<input type="submit" value="send"/>
			<textarea name="textarea"></textarea>
			<input type="submit" value="ENVOYER" />
		</form>
	</body>
</html>