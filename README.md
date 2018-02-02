# xhrQuery

Toutes les fonctionnalités **AJAX** à portée de main.

## Status



## Summary

[](BeginSummary)
* [Status](#status)
* [Summary](#summary)
* [Introduction](#introduction)
* [Manuel d'utilisation](#manuel-dutilisation)
    * [Initialisation de l'objet ``xhrQuery``](#initialisation-de-lobjet-xhrquery)
    * [Définition de la cible](#d%c3%a9finition-de-la-cible)
    * [Envois de la requête AJAX](#envois-de-la-requ%c3%aate-ajax)
    * [Consécutivité des méthodes](#cons%c3%a9cutivit%c3%a9-des-m%c3%a9thodes)
    * [Traitement de la réponse à l'aide de le fonciton de rappel](#traitement-de-la-r%c3%a9ponse-%c3%a0-laide-de-le-fonciton-de-rappel)
    * [Envoyer des données](#envoyer-des-donn%c3%a9es)
        * [Envoyer des données directe par couple ``variable=valeur``](#envoyer-des-donn%c3%a9es-directe-par-couple-variable%3dvaleur)
        * [Envoyer des données par objet HTML ``HTML____Element``](#envoyer-des-donn%c3%a9es-par-objet-html-html____element)
        * [Envoyer un formulaire ``form``](#envoyer-un-formulaire-form)
    * [Méthode d'envoi de données](#m%c3%a9thode-denvoi-de-donn%c3%a9es)
    * [Barre de progression lors d'envoi de fichiers](#barre-de-progression-lors-denvoi-de-fichiers)
* [En résumé](#en-r%c3%a9sum%c3%a9)

[](EndSummary)




## Introduction

**English :** Firstly, this manual is written in french to simplify and save time to migrate the 
documentation.

**Français :** Dans un premier, ce manuel est rédigé en français pour simplifier et gagner du temps 
pour migrer la documentation.

L'**AJAX**, ou plus précisément, l'**API XMLHttpRequest** est aujourd'hui devenu indispensable
pour offrir une application dynamique aux utilisateurs.
On se retrouve rapidement à implémenter des morceaux de code d'**AJAX** dans tous les coins.
Une grande partie de ces codes se répète.
Lorsque ce cas se présente, cela signifie qu'il est possible de créer une classe,
une fonction, un moteur, facilitant son utilisation.
La classe ``xhrQuery`` offre cette simplicité.
Voici le manuel d'utilisation. Elle vous simpliera la vie.
Fini les tests de disponibilité entre **IE** et les autres navigateurs.
Fini de devoir redéclarer la fonction de callback sur l'object **XMLHttpRequest** !



## Manuel d'utilisation


### Initialisation de l'objet ``xhrQuery``

Comme tout langage orienté objet, pour créer une nouvelle instance,
il faut utiliser le constructeur ``new`` tel que décrit ci-dessous.

````js
var moteur_ajax = new xhrQuery();
````

Comme vous pouvez le remarquer, il n'y à aucun paramètre à indiquer.
Le but de la classe ``xhrQuery`` est justement de simplifié la vie.
Il y à une méthode dédiée pour tout.
Il suffit juste de retenir la méthode, plutôt que l'ordre des paramètres.
De plus il est plus aisé d'omettre des paramètres facultatif de cette facon !



### Définition de la cible

Pour qu'une requête **AJAX** ait bien lieu, il faut à minima,
une cible qui traitera notre requête.
Le mot cilbe en anglais ce traduit par **target**.
Nous avons notre méthode permettant de définir la cible.
Voici le code complété

````js
var moteur_ajax = new xhrQuery();
moteur_ajax.target('script_cible.php');
````

Notez qu'il n'est pas nécessaire que la cible soit un script.
Cela peut être un fichier **texte**, un fichier **XML** ou bien encore un fichier **JSON**.
Cependant, seul le script est habilité à traiter les données envoyées.

Vous noterez que le paramètre est de type chaine de caractère `string`.



### Envois de la requête AJAX

Maintenant que nous avons définis la cible de notre requête,il nous reste plus qu'à l'emettre.
Toujours en s'aidant de l'anglais, envoyer se traduit par **send**.
Nous avons notre seconde méthode !

````js
var moteur_ajax = new xhrQuery();
moteur_ajax.target('script_cible.php');
moteur_ajax.send();
````

A ce stade, la requête est émise, mais rien n'indique ce qui va traiter la réponse.
Notez qu'il n'est pas systématiquement nécessaire de traiter la réponse de la requête.

La méthode ``send`` n'admet aucun paramètre.



### Consécutivité des méthodes

Avant d'aller plus loin dans la présentation des méthodes et de leurs rôles,
je tiens à préciser quelque chose qui rend encore plus la classe ``xhrQuery``
agréable d'utilisation.

Les méthodes peuvent être executées consécutivement.
Cela signifique qu'il est possible d'indiquer tous les éléments sur une seule ligne.
Ainsi il n'est plus forcement nécessaire d'utiliser une variable pour appeler les méthodes.

Le code suivant fonctionne de la même manière que le précédent.

````js
new xhrQuery().target('script_cible.php').send();
````

L'ordre d'appel des méthodes n'est pas déterminant à l'exception de ``send``
qui doit se trouver en dernier, car c'est celle qui déclenche la requête.
C'est logique vous me direz !

De plus, vous comprenez maintenant qu'il est facile d'omettre les paramètres facultatifs,
car si nous n'en avons pas besoin, nous n'appelons pas la méthode !



### Traitement de la réponse à l'aide de le fonciton de rappel

Pour traiter la réponse d'une requête **AJAX**,
nous avons besoin d'une fonction de traitement.
Celle-ci est communément appeler callback ou fonction de rappel.
Par conséquent vous devinez le nom de la méthode ?
Et bien vous y êtes preque. Celle-ci est ``callbacks`` (avec un ``s`` final),
car en effet, il est possible de définir plusieurs fonctions de traitement.
Certes, elle traiterons les mêmes données,
mais peut-être qu'il existe des cas où cela est nécessaire.

````js
new xhrQuery().target('script_cible.php').callbacks(ma_fonction_1, ma_fonction_2).send();
````

Le type des paramètres admis par callbacks est de type fonction.
Il ne faut pas saisir de nom de fonction au format chaine de caractère.

Dans le cas où vous avez une fonction de traitement qui accepte plusieur paramètres,
il faudra alors les **binder** :

````js
function afficherReponse(couleur, message){
	var output = '<span style="color: '+color+'">'+message+'</span>';
	document.write(output);
}

new xhrQuery().target('script_cible.php').callbacks(afficherReponse.bind('', 'red')).send();
````

La réponse de la requête sera toujours le dernier paramètre.

Dans notre exemple nous admettons deux paramètres et nous en bindons deux.
Cependant le premier paramètre `''`, définit la référence ``this`` au sein de la fonction.
Ici nous n'en avons pas besoin, mais si vous utiliser le moteur ``xhrQuery`` dans une classe
**JavaScript**, alors il faudra remplacer `''` par ``this``,
a moins d'avoir créer une variable **locale** ``self`` (ou équivalent)
ou bien les fonctions fléchée.
Le second paramètre **bindé** est ``red``.
Il correspond donc au paramètre couleur de la fonction ``afficherMessage``.
La réponse **AJAX** se positionnera sur le paramètre message.



### Envoyer des données

**AJAX** prend tout son sens lorsqu'il envoie des données que le script devra traité.
il existe plusieurs façons d'envoyer des données.
La premiére consiste à définir des couples ``variable=valeur``.
La seconde consiste à envoyer un objet **HTML** d'un des types suivant.
Celui-ci devra obligatoirement disposer de l'attribut ``name``
tel qu'on le trouverez dans un formulaire classique.

* ``HTLMInputElement``.
* ``HTLMSelectElement``.
* ``HTLMTextAreaElement``.

La dernière manière d'envoyer des données est d'envoyer le formulaire complet.
Celà à l'avantage d'envoyer une grande quantitié de donnée avec un minimum d'instruction
de code.



#### Envoyer des données directe par couple ``variable=valeur``

Pour envoyer des données sous la forme de couple ``variable=valeur``,
il suffit d'utiliser la méthode ``values``.
Vous l'aurez compris, values accepte plusieurs paramètres.
Pour être plus précis, elle accepte autant de paramètre que nécéssaire.
Elle se charge de tout

````js
var moteur = new xhrQuery();
moteur.target('script_cible.php');
moteur.values('nom=DUPRE', 'prenom=nicolas', 'age=27');
moteur.callbacks(ma_fonction_1);
moteur.send();
````

Si vous envoyez ces données vers un script PHP vous obtenez donc ceci :

````php
print_r($_REQUEST);
````

````
Array
(
    [nom] => DUPRE,
    [prenom] => nicolas,
    [age] => 27
)
````



#### Envoyer des données par objet HTML ``HTML____Element``

Dans le cas où vous ne disposez pas spécialement de couple ``variable=valeur``,
mais plutôt d'un objet **HTML** de type ``HTML____Element``,
alors vous aurez besoin de la méthode ``inputs``.
Celle-ci accepte évidement autant de paramètres que vous voulez.
Il est bon de savoir que la méthode accepte,
soit directement l'objet **HTML** (Référence),
soit son identifiant au format chaine de caractère.
Dans ce cas là, la fonction essayera d'obtenir l'objet concerné.
Dans le cas contraire, il sera ignoré.

Prenons le code HTML suivant :

````html
<form onsubmit="send_form(); return false;" id="prez">
	<input type="text" name="nom" placeholder="Nom">
	<input type="text" name="prenom" placeholder="Prénom">
	<input type="text" name="age" placeholder="Age">
	<input type="submit" value="Envoyer">
</form>
````

Au niveau de la fonction ``send_form()`` vous aurez par exemple ceci :

````js
function send_form(){
	/** Création du moteur AJAX **/
	var AJAX = new xhrQuery();
		AJAX.target('script.php');
		AJAX.callbacks(my_callback);
		
	/** Récupérer les informations du formulaire 'prez' **/	
	var inputs = document.querySelectorAll('#prez input');
	
	/** Parcourir tout les inputs obtenu **/
	for(var i = 0; i < inputs.length; i++){
		/** Ajouter l input i au moteur **/
		AJAX.inputs(inputs[i]);
	}
	
	/** Envoyer la requêtes **/	
	AJAX.send();
}
````

Cet exemple est un peu plus complexe du fait qu'il soit plus complet.
En faite il n'en est rien.
Ici nous avons une boucle qui "automatise" la récupération,
puisque nos input ne dispose pas d'identifiant.

````js
var AJAX = new xhrQuery();
	AJAX.inputs(input_A);
	AJAX.inputs(input_B);
	AJAX.inputs(input_C);
	
/** Est identique à **/
new xhrQuery().inputs(input_A, input_B, input_C);

/** C'est aussi valable pour la méthode 'values' et 'callbacks' **/
````

Côté script nous obtenons exactement le même résultat que
l'envois de donnée par couple ``variable=valeur``.

````php
print_r($_REQUEST);
````

````
Array
(
    [nom] => DUPRE,
    [prenom] => nicolas,
    [age] => 27
)
````



#### Envoyer un formulaire ``form``

La présentation de l'envois de données à l'aide des objets **HTML** qui composent
peu être encore plus simplifiée.
Il suffit d'envoyer le formulaire **HTML** ``HTMLFormElement``.
La méthode correspondante pour ajouter un formulaire au jeu de données attaché
au moteur ``xhrQuery`` est `forms`, toujours au plusieurs, admettant autant
de paramètre que nécessaire.

Reprenons le formulaire précédent :

````html
<form onsubmit="send_form(); return false;" id="prez">
	<input type="text" name="nom" placeholder="Nom">
	<input type="text" name="prenom" placeholder="Prénom">
	<input type="text" name="age" placeholder="Age">
	<input type="submit" value="Envoyer">
</form>
````

L'envois des données se ferais ainsi.

````js
var prez_form = document.querySelector('#prez');

var moteur = new xhrQuery();
moteur.target('script_cible.php');
moteur.forms(prez_form);
moteur.callbacks(ma_fonction_1);
moteur.send();
````

Pour le moment, la méthode n'accepte que des objets de type ``HTMLFormElement``.
Dans les prochaines versions, la méthode `forms` se comportera comme la méthode ``inputs``
et cherchera à identifier un éventuel formulaire correspond à l'identifiant
spécifier au format ``string``.






### Méthode d'envoi de données

Dans les deux derniers exemples,
nous avons affiché les données reçues à l'aide de ``$_REQUEST`` par un script **PHP**.
Je n'ai volontairement pas spécifié la méthode d'envoi que je reservait pour ici.

En effet, il existe deux types d'envois de donnée.
Il y à la méthode ``GET`` et la méthode ``POST``.
Cela fonctionne de la même manière qu'un formulaire classique.
Par défaut la méthode utilisée est la méthode ``POST``.
Mais si vous souhaitez passer en méthode ``GET``,
alors il faudra utiliser la méthode ``method``.

Dans l'exemple ci-dessous nous demandons à utiliser la méthode ``GET``.
Attention, la taille des données est limitée.
Avant ce champ était limité à 255 caractères de données via la méthode ``GET``.

````js
new xhrQuery('script.php').values('nom=DUPRE').callbacks(ma_function).method('GET').send();
````

Pour afficher les données en **PHP**

````php
print_r($_GET);
````

````
Array
(
    [nom] => DUPRE
)
````

La méthode methode est insensible à la casse
et accepte uniquement les valeur ``GET`` ou ``POST`` comme valeur.

Si vous voulez envoyer des fichiers à l'aide d'**AJAX**,
il vous faudra obligatoirement utiliser la méthode ``POST``.



### Barre de progression lors d'envoi de fichiers

Lorsque vous envoyez des fichiers,
vous pouvez indiquer une fonction qui affichera la progression de l'envois.
La méthode permettant d'indiquer la progression est ``progress``.

````html
<form onsubmit="send_file(); return false;" id="import">
	<input type="file" multiple="" id="fichiers">
	<input type="submit" value="Envoyer">
</form>

<div id="cadre" style="border: 1px solid black; height: 20px; width: 200px;">
	<div id="barre" style="width: 0%;">
	
	</div>
</div>
````

````js
function send_file(){
	var file_input = document.getElementById('fichiers');
	
	xhrQuery().target('script.php').inputs(file_input).callback(ma_callback).progress(uploadProgress.bind('', 'barre')).send()
}

function uploadProgress(HTML, uploaded, totalSize){
	var barre = document.getElementById(HTML);
	var progression = (uploaded * 100) / totalSize; 
	
	barre.setAttribute('style', 'width: '+progression+'%');
}
````

Encore une fois cet exemple est très complet.
En faite, l'idée était de montrer qu'il était également possible de passer des données
dans la fonction de progression tel qu'on la fais pour la fonction de traitement de la réponse.
Dans le cas de la fonction de progression,
les deux derniers paramètres correspondent aux données reçues par **AJAX**.
Au sein de ces deux derniers paramètres,
le premier correspond à la taille de donnée envoyé,
le second correspond à la taille totale des données à envoyer.






## En résumé

En résumé, la classe xhrQuery vous permet de faire tout cela très simplement :

* Une requête **AJAX** ne représente qu'une seule ligne dans votre fonction.
* Les méthods sont consécutive et l'ordre n'à pas d'important à l'exception de la méthode ``send``
qui doit être en dernier.
* La méthode ``target`` indique le script cible de traitement des données.
* La méthode ``callbacks`` indique le ou les fonctions de traitement de la réponse.
* La méthode ``values`` indique le ou les couples de donnée ``variable=valeur`` à envoyer au script.
* La méthode ``inputs`` indique le ou les objets HTML ``HTMLI____Element`` contenant
les données à envoyer au script.
* Les objet **HTML** ``HTML____Element`` doivent obligatoirement disposer de l'attribut ``name``.
* La méthode ``method`` définit la méthode d'envois de donnée 
ce sont les termes technique approprié).
* Elle est **insensible** à la casse et n'accepte que ``GET`` ou ``POST``.
* Pour envoyer des fichiers, il est nécessaire d'utiliser la méthode ``POST``.
* Pour afficher la progression de l'envois du ou des fichier,
il faut utiliser la méthode ``progress``.
* Le format de réponse par défaut est ``responseText``
car le format ``responseXML`` est lourd à traiter.
* Il n'y à pas forcement besoin de traiter la réponse d'une requête **AJAX**.
