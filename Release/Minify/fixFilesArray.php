<?php
/********************************************************************************************************
/*	[ SCRIPT ]
/*		- fixFilesArray.php
/*
/*	[ FICHIER(S) REQUIS ]
/*		- aucun
/*
/*	[ FICHIER(S) CONCERNE(S) ]
/*		- undefined
/*
/*	[ RELEASE ]
/*		- 05/03/2014
/*
/*	[ FONCTIONS ]
/*		fixFilesArray()
/*
/*	[ DETAIL FONCTIONS ]
/*		# fixFilesArray($fileList)
/*			• Requis pour fonctionner
/*				- Aucune spécificité
/*			
/*			• Paramètres d'entrée :
/* 				- $fileList		[Array]	:	superglobale $_FILES[Array] à convertir
/*			
/*			• Paramètres de sortie :
/*				- ^$newFileList	[Array]	:	nouveau Array contenant les données de $_FILES réagencer par fichier et non par type de données
/*
/*			• Description : 
/*				- Lors d'un envois massif, la variable superglobale stocke les infos des images par donnée et nom par image
/*				- La fonction renverse l'ordre des choses : [key][$img] => [$img][key]
/*				- De cette facon le traitement des données est plus aisé pour le programme d'analyse de contenu et de maintient ou non du fichier sur le serveur
/*
/*			• Détail Fonctionnelle :
/*				1. Ne connaissant pas le nom "name" qui à permis l'envois des fichiers on l'identifie à l'aide de array_key
/*				2. Une fois la key connue on fait un count sur ['name'] qui retournera le nombre n d'image contenu
/*				3. On boucle sur le nombre d'image et on recompile un array globale pour la sortie à l'aide d'un array temporaire $tmp
/*
/*			• Niveau d'utilisation :
/*				- Uniquement sur un envois massif de fichier ayant le même name défini en HTML/JS par name="myname[]"			
/*
/********************************************************************************************************/

function fixFilesArray($fileList){		
	$newFileList = Array();

	/** 1. Trouver le nom "name" contenant les donnée **/
	$name = array_keys($fileList);
	$name = $name[0];
	
	/** 2. Compter le nombre de fichiers envoyé **/
	$nbfile = count($fileList[$name]['name']);
	
	/** 3. Ré-arranger la variable $_FILES **/
	for($i = 0; $i < $nbfile; $i++){
		/** $_FILES :
		- name
		- type
		- tmp_name
		- error
		- size
		**/			
		$tmp = Array(
			'name' => $fileList[$name]['name'][$i],
			'type' => $fileList[$name]['type'][$i],
			'tmp_name' => $fileList[$name]['tmp_name'][$i],
			'error' => $fileList[$name]['error'][$i],
			'size' => $fileList[$name]['size'][$i],
		);		
		$newFileList[] = $tmp;			
	}
	
	return $newFileList;
}	
?>