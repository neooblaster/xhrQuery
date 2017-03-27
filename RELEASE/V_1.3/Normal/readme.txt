Fichier multiple reçu par PHP :
-------------------------------

Array
(
	 [file] => Array
		  (
				[name] => Array
					 (
						  [0] => secondarytile.png
						  [1] => 42.0.2311.135.manifest
						  [2] => libegl.dll
						  [3] => xinput1_3.dll
					 )

				[type] => Array
					 (
						  [0] => image/png
						  [1] => application/octet-stream
						  [2] => application/x-msdownload
						  [3] => application/x-msdownload
					 )

				[tmp_name] => Array
					 (
						  [0] => /tmp/phpdlYN6X
						  [1] => /tmp/phpoZv3DP
						  [2] => /tmp/phpjpijbH
						  [3] => /tmp/phpV2av2C
					 )

				[error] => Array
					 (
						  [0] => 0
						  [1] => 0
						  [2] => 0
						  [3] => 0
					 )

				[size] => Array
					 (
						  [0] => 637
						  [1] => 224
						  [2] => 80712
						  [3] => 81768
					 )

		  )

)


Fichier multiple réorganisé à l'aide de la fonction fixFilesArray() :
---------------------------------------------------------------------

Array
(
    [0] => Array
        (
            [name] => 42.0.2311.135.manifest
            [type] => application/octet-stream
            [tmp_name] => /tmp/phpOlZnjJ
            [error] => 0
            [size] => 224
        )

    [1] => Array
        (
            [name] => libegl.dll
            [type] => application/x-msdownload
            [tmp_name] => /tmp/phpIQY56O
            [error] => 0
            [size] => 80712
        )

    [2] => Array
        (
            [name] => secondarytile.png
            [type] => image/png
            [tmp_name] => /tmp/php4ZA15Y
            [error] => 0
            [size] => 637
        )

    [3] => Array
        (
            [name] => xinput1_3.dll
            [type] => application/x-msdownload
            [tmp_name] => /tmp/phpmn5x98
            [error] => 0
            [size] => 81768
        )

)