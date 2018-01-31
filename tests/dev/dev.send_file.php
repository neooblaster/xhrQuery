<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Dev xhrQuery Env</title>
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
			new xhrQuery().target('dev.target.php').callbacks(xhr_response).inputs('fs').send();
		</h1>
        <form action="#" method="post" onsubmit="new xhrQuery().target('dev.target.php').callbacks(xhr_response).inputs('t', 'fs', 'fm').send(); return false;">
            <input type="text" id="t" name="input_t" value="TEXT_FIELD"/>
            <input type="file" id="fs" name="fs"/>
            <input type="file" id="fm" multiple name="fm"/>
            <progress id="prgrs"></progress>
            <input type="submit" value="Submit"/>
        </form>
	</body>
</html>