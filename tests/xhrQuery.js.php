<!DOCTYPE html>
<html>
	<head>
		<script src="xhrQuery.js"></script>
		<script>
			function send(form){
				var xQ = new xhrQuery();
				xQ.target("../DEV_ENV/dev_target.php");
				xQ.forms(form);
				//xQ.method("GET");
				xQ.callbacks(function(e){
					document.querySelector("#output").innerHTML = e;
				});
				xQ.send();
			}
		</script>
	</head>
	<body>
		<a href="DEV_ENV/">-- Dossier Parent --</a>
		
		<pre><?php print_r($_REQUEST);?></pre>
		
		<form method="post" action="#" onsubmit="send(this); return false;">
			<input type="text" value="test" name="itext"/>
			<input type="checkbox" name="icb"/>
			<textarea name="textarea">message avec un = dedans</textarea>
			<input type="submit" value="ENVOYER" />
		</form>
		
		<pre id="output"></pre>
	</body>
</html>