<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Dev xhrQuery Env</title>
		<!--<script type="text/javascript" src="xhrQuery.js"></script>-->
		<script type="text/javascript" src="xhrQuery.min.js"></script>
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
			new xhrQuery().target('dev_target.php').callbacks(xhr_response).inputs('fs').send();
		</h1>
		<input type="text" id="t" name="input_t"/>
		<input type="file" id="fs"/>
		<input type="file" id="fm" multiple/>
		<progress id="prgrs"></progress>
	</body>
</html>