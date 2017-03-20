<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>xhrQuery::forms</title>
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
			xhrQuery::forms
		</h1>
		
		<form methode="post" action="" onsubmit="new xhrQuery().target('dev_target.php').callbacks(function(e){document.querySelector('#console').innerHTML = e;}).forms(this, 'otherone').send(); return false;">
			<input type="text" value="CHAMPS_TEXT" name="itext"/>
			<input type="password" value="CHAMPS_PASSWORD" name="ipassword"/>
			<input type="reset" value="CHAMPS_RESET" name="ireset"/>
			<input type="radio" value="CHAMPS_RADIO_1" name="iradio"/>
			<input type="radio" value="CHAMPS_RADIO_2" name="iradio"/>
			<input type="checkbox" value="CHAMPS_CHECKBOX" name="icheckbox"/>
			<input type="button" value="CHAMPS_BUTTON" name="ibutton"/>
			
			<select name="iselect">
				<option value="OPTION_1">V1</option>
				<option value="OPTION_2">V2</option>
			</select>
			
			<input type="submit" value="CHAMP_SUBMIT" name="isubmit" />
		</form>
		
		<pre id="console">
		
		</pre>
	</body>
</html>