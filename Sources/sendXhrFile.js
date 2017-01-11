/********************************************************************************************************
/*	[ SCRIPT ]
/*		- sendXhrFiles.js
/*
/*	[ FICHIER(S) REQUIS ]
/*		- newXhr.js
/*
/*	[ FICHIER(S) CONSEILLE(S) ]
/*		Du cot頳eveur, pour le traitement:
/*		-----------------------------------
/*			- fixFilesArray.php		=> Converti l'array $_FILES[propriete][filex] en $_FILES[filex][propriete]
/*			- upload_baseCode.php	=> Permet d'avoir une base de travail pour le traitement des donn饠recu par sendXhrFiles()
/*
/*	[ FICHIER(S) CONCERNE(S) ]
/*		- undefined
/*
/*	[ RELEASE ]
/*		- 04/03/2014
/*		- 01/08/2014 : Int駲ation de param贲es facultatifs au format "variable=valeur" avec = interdit dans valeur afin de transmettre des informations compl魥ntaire
/*
/*	[ FONCTIONS ]
/*		sendXhrFiles()
/*
/*	[ DETAIL FONCTIONS ]
/*		# sendXhrFiles(responseType, inputSrc, dest, progressFunction, progressTarget, callback)
/*			堒equis pour fonctionner
/*				- Ne fonctionne qu'avec les inputs type="file"
/*			
/*			堐aram贲es d'entr饠:
/*				- responseType		[string]			:	Format de donn饠re絠en retour {TEXT || XML}
/*				- inputSrc			[string || object]	:	Input type file contenant le ou les fichiers ࠥnvoyer au serveur
/*				- dest				[string]			:	Fichier cible de la requ괥. Le path ࠰our racine de document HTML ou PHP h䴥 - Si on est dans index.php => Fonctions/cible.php et non pas ../Fonctions/cible.php
/*				- progressFunction	[function]			:	Fonction appell頡u fur et a mesure de l'envois avec param贲e uploaded et totalSize - Peut ne pas 괲e sp飩fi鬠mais il faut mettre des '' afin de respecter la syntaxe JS
/*				- progressTarget	[string || object]	:	<progress> cible pour la fonction progressFunction - Peut ne pas 괲e sp飩fi鬠mais il faut mettre des '' afin de respecter la syntaxe. Peut 괲e directement sp飩fi頤ans la fonction de progression, mais dans le cas d'une function g鮩ral, on doit pouvoir transmettre aussi la cible en plus des indicateur d'avancement
/*				- callback			[function]			:	Fonction appell頠 l'issue de la requ괥. Saisir uniquement le nom de fonction (ne g貥 qu'un seul param贲e)
/*			
/*			堐aram贲es de sortie :
/*				- aucun
/*
/*			堄escription : 
/*				- Envois de fichier(s) de facon asynchrone au serveur PHP ࠬa cible.php ["dest"]
/*
/*			堄鴡il Fonctionnelle :
/*				1. Cr顴ion de l'objet xhr ࠬ'aide de la fonction newXhr(cf file .js du mꭥ nom)
/*				2. D馩nition d'une fonction sur la propri鴩 onreadystatechange de l'objet xhr pour execut頵ne action lorsque celle-ci c'est d鲯ul頣orrectement (readyState == 4 et status == 200 ou 0) [鱵ivalent ) cela : .onload]
/*				3. D馩nition d'une fonction sur la propri鴩 upload.onprogress de l'objet xhr pour envoy頬es donn饳 d'avancement de l'upload ࠬa fonction sp飩fi頰ar progressFunction
/*					3.1. Si d馩nie, alors envois ࠣelle-ci les donn饠uploaded et totalSize ࠬa fonction pr鶵 ࠣet effet
/*					3.2. Sinon, ne rien faire
/*				4. Cr顴ion de "l'environnement" formulaire pour y ins鲥r les donn饳
/*				5. Parcourir l'objet inputElement afin de cr饲 le formulaire pour l'envois asynchrone
/*					5.1. Si inputSrc est un objet, l'analyser tout de suite
/*					5.2. Si inputSrc est string, alors obtenir l'objet correspondant
/*					5.3. Parcouris la liste des fichiers(filesList[]) de l'inputSrc
/*					5.4. Ins鲥r dans l'environnement formulaire les donn饳 file obtenue sous le nom files[] avec [] pour obtenir un array c䴩 php ($_FILES['files']['name'][0] = fichier 1)
/*						 Sinon ca ne fonctionnera pas
/*						 FormData() g鮨re un formulaire et les insertions .append(name, value) 鱵ivaut probablement ࠵n <input type="hidden" name="name" value="value" />
/*				6. Ouverture de la connexion entre le client et le serveur(cible.php["dest"])
/*				7. Envoie des donn饳 ࠬa cible.php["dest"] des donn饳 compil頤ans envFormulaire
/*
/*			堎iveau d'utilisation :
/*				- Globale			
/*
/********************************************************************************************************/
function sendXhrFiles(responseType, inputSrc, dest, progressFunction, progressTarget, callback){
	//var xhr = newXhr();	
	//responseType = responseType.toLowerCase()
	
	
	/******************************************************************/
	/** DɆINITION DE LA PROPRIɔɠonreadystatechange DE L'OBJET XHR **/
	/******************************************************************/
	//xhr.onreadystatechange = function(){
		//if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
			//switch(responseType){
				//case 'text':	
					//callback(xhr.responseText);
				//break;
				
				//case 'xml':
				//	callback(xhr.responseXML);
				//break;
			//}
		//}
	//}
	
	
	/*******************************************************************************************************************/
	/** DɆINITION DE LA PROPRIɔɠupload.onprogress (ACTION  EFFECTUɠCHAQUE SECOND LORS DE L'ENVOIS DE LA REQUETE) **/
	/*******************************************************************************************************************/
	//xhr.upload.onprogress = function(e){
	//	var uploaded = e.loaded;
	//	var totalSize = e.total;
	//	
	//	if(progressFunction != ''){
	//		progressFunction(uploaded, totalSize, progressTarget);
	//	}
	//}
	
	
	/**************************************************************************************************/
	/** PRɐARATION DE L'ENVIRONNEMENT "FORMULAIRE" POUR ENVOIS PAR METHODE POST  LA CIBLE SPɃIFIɠ**/
	/**************************************************************************************************/
	//var envFormulaire = new FormData();
	
	
	/*********************************************************************************/
	/** METTRE inputSrc SOUS LE FORMAT OBLIGATOIRE HTMLinputElement typeof [Object] **/
	/*********************************************************************************/
	//if(typeof(inputSrc) != 'object'){
	//	inputSrc = document.getElementById(inputSrc);
	//}
	
	
	/*************************************************************************************************/
	/** PARCOURIR L'ENSEMBLE DES FICHIERS CONTENU DANS L'inputSrc ET LES INSɒER DANS envFormulaire **/
	/*************************************************************************************************/
	//for(var i = 0; i < inputSrc.files.length; i++){
	//	envFormulaire.append('file[]', inputSrc.files[i]);
	//}	
	
	
	/******************************************************************/
	/** PARAMȔRES FACULTATIFS :: COUPLE "VARIABLE=VALEUR"  INTɇRER **/
	/**		-> DONNɅS COMPLɍENTAIRE AVEC L'ENVOIS DE(S) FICHIER(S) **/
	/******************************************************************/
	//for(var i = 6; i < sendXhrFiles.arguments.length; i++){
	//	var thisArg = sendXhrFiles.arguments[i].split('=');
	//	var varName = thisArg[0];
	//	var varValue = thisArg[1];		
	//	envFormulaire.append(varName, varValue);
	//}
	
	
	/**********************************/
	/** ETABLISSEMENT DE LA CONNEXON **/
	/**********************************/
	//xhr.open('POST', dest, true);
		
		
	/****************************************/
	/** Envois des donn饳 (envFormulaire) **/
	/****************************************/
	//xhr.send(envFormulaire)
}