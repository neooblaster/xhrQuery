<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>xhrQuery::forms</title>
		<!--<script type="text/javascript" src="xhrQuery.js"></script>-->
		<script type="text/javascript" src="../../src/xhrQuery.js"></script>
		<script type="text/javascript">
			
			function xhr_response(data){
				console.log('xhr_response_1 :: '+data);
			}
			
			function xhr_response_deux(data){
				console.log('xhr_response_2 :: '+data);
			}
			
			function progfn(cr, max){
				var progress = document.querySelector('#prgrs');
				progress.setAttribute('value', cr);
				progress.setAttribute('max', max);
			}
		</script>
	</head>
	<body>
		<h1>
			xhrQuery::forms
		</h1>

        <a href="./">-- Parent Folder --</a>
		
		<form methode="post" action="" onsubmit="new xhrQuery().target('dev.target.php').callbacks(function(e){document.querySelector('#console').innerHTML = e;}).forms(this, 'otherone').send(); return false;" id="xhrForm">
            <?php include 'dev.fields.html'; ?>
		</form>
		
		<pre id="console">
		
		</pre>
	</body>
</html>
