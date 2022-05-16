<?php

class documentosController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-wizard',
					// 'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					// 'plugins/datatables-net/css/searchPanes.dataTables.min',
					// 'plugins/datatables-net/select.dataTables.min',
					// 'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
					//
					'plugins/vendors/css/pickers/pickadate/pickadate',
					'plugins/vendors/css/pickers/flatpickr/flatpickr.min',
					'plugins/vendors/css/pickers/form-flat-pickr',
					'plugins/vendors/css/pickers/form-pickadate',
				)
			);
	
			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/extensions/toastr.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					// 'plugins/datatables-net/js/dataTables.searchPanes.min',
					// 'plugins/datatables-net/js/dataTables.select.min',
					// 'plugins/datatables-net/js/dataTables.buttons.min',
					// 'plugins/datatables-net/js/buttons.flash.min',
					// 'plugins/datatables-net/js/jszip.min',
					// 'plugins/datatables-net/js/pdfmake.min',
					// 'plugins/datatables-net/js/vfs_fonts',
					// 'plugins/datatables-net/js/buttons.html5.min',
					// 'plugins/datatables-net/js/buttons.print.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					//
					'plugins/vendors/js/extensions/sweetalert2.all.min',

					'plugins/vendors/js/pickers/pickadate/picker',
					'plugins/vendors/js/pickers/pickadate/picker.date',
					'plugins/vendors/js/pickers/pickadate/picker.time',
					'plugins/vendors/js/pickers/pickadate/legacy',
					'plugins/vendors/js/pickers/flatpickr/flatpickr.min',
					'dist/js/scripts/forms/pickers/form-pickers',
					// imput mask
					'dist/js/scripts/forms/form-input-mask',
					'plugins/vendors/js/forms/cleave/cleave.min'
				)
			);

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'post' 	=> 1, //todos los archivos
				'id' 	=> 0,
				'user' 	=> $_SESSION['id'],
			);

			$result1 = $soap->ConsultaCV($params);
			$consultacv = json_decode($result1->ConsultaCVResult, true);

			$this->_view->consultacv = $consultacv;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');

		} else {
			$this->redireccionar('index/logout');
		}
    }

	public function subir_archivos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			if (is_array($_FILES) && count($_FILES) > 0) {

				// RECORTAMOS EL TIPO DE ARCHIVO Y LO GUADAMOS EN UNA VARIABLE
				$extdoc = explode("/",$_FILES["archivo"]["type"]);
				$filesize = $_FILES["archivo"]["size"];
				// DECIMOS EN QUE RUTA SE GUARDARA EL ARCHIVO
				$destino = "public/doc/documentos/". $_SESSION['correo'] ."/cv_".$_SESSION['correo'].".".$extdoc[1];

				if (($_FILES["archivo"]["type"] == "application/pdf")) {
					
					$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

					$options = array(
						"uri" => $wsdl,
						"style" => SOAP_RPC,
						"use" => SOAP_ENCODED,
						"soap_version" => SOAP_1_1,
						"connection_timeout" => 60,
						"trace" => false,
						"encoding" => "UTF-8",
						"exceptions" => false,
					);

					$param = array(
						"post"	=> 1, //insert
						"id"	=> 0,
						"nombre"=> "cv_".$_SESSION['correo'],
						"ruta"	=> $destino,
						"size"	=> $filesize,
						"type"	=> $extdoc[1],
						"user"	=> intval($_SESSION['id']),
					);
			
					$soap = new SoapClient($wsdl, $options);
					$result = $soap->MantCV($param);
					$cv = json_decode($result->MantCVResult, true);

					if (intval($cv[0]['i_case']) == 1){

						move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino);

						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								"vicon" 		=> $cv[0]['v_icon'],
								"vtitle" 		=> $cv[0]['v_title'],
								"vtext" 		=> $cv[0]['v_text'],
								"itimer" 		=> intval($cv[0]['i_timer']),
								"icase" 		=> intval($cv[0]['i_case']),
								"vprogressbar" 	=> $cv[0]['v_progressbar'],
							)
						);
					}else{
						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								"vicon" 		=> $cv[0]['v_icon'],
								"vtitle" 		=> $cv[0]['v_title'],
								"vtext" 		=> $cv[0]['v_text'],
								"itimer" 		=> intval($cv[0]['i_timer']),
								"icase" 		=> intval($cv[0]['i_case']),
								"vprogressbar" 	=> $cv[0]['v_progressbar'],
							)
						);
					}

				} else {

					header('Content-type: application/json; charset=utf-8');
					echo $json->encode(
						array(
							"vicon" 		=> "info",
							"vtitle" 		=> "Archivo seleccionado no es un pdf...",
							"vtext" 		=> "Favor de seleccionar un archivo válido!",
							"itimer" 		=> 4000,
							"icase" 		=> 5,
							"vprogressbar" 	=> "true",
						)
					);
				}
			} else {

				header('Content-type: application/json; charset=utf-8');
				echo $json->encode(
					array(
						"vicon" 		=> "error",
						"vtitle" 		=> "Archivo no existe",
						"vtext" 		=> "Ocurrio un error al cargar el archivo, favor de volver a intentar",
						"itimer" 		=> 4000,
						"icase" 		=> 4,
						"vprogressbar" 	=> "true",
					)
				);
			}
		} else {
			$this->redireccionar('index/logout');
		}
	}

	// public function consultar_archivos()
	// {

	// 	if (isset($_SESSION['usuario'])) {

	// 		putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
	// 		putenv("NLS_CHARACTERSET=AL32UTF8");
	// 		$this->getLibrary('json_php/JSON');
	// 		$json = new Services_JSON();

	// 		$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

	// 		$options = array(
	// 			"uri" => $wsdl,
	// 			"style" => SOAP_RPC,
	// 			"use" => SOAP_ENCODED,
	// 			"soap_version" => SOAP_1_1,
	// 			"connection_timeout" => 60,
	// 			"trace" => false,
	// 			"encoding" => "UTF-8",
	// 			"exceptions" => false,
	// 		);
	
	// 		$param = array(
	// 			"post"	=> 1, //consultar todo los archivos
	// 			"id"	=> 0,
	// 			"user"	=> intval($_SESSION['id']),
	// 		);
	
	// 		$soap = new SoapClient($wsdl, $options);
	// 		$result = $soap->ConsultaCV($param);
	// 		$consultacv = json_decode($result->ConsultaCVResult, true);

	// 		$filas="";
	// 		foreach($consultacv as $cv){
	// 			$filas.=
	// 			"<tr>
	// 				<td>".$cv['id']."</td>
	// 				<td>".$cv['v_nombre']."</td>
	// 				<td>".$cv['v_fecha']."</td>
	// 				<td>".$cv['v_size']."</td>
	// 				<td>
	// 					<a class='btn btn-danger btn-sm' target='_blank' style='color:white' href=". BASE_URL . $cv['v_ruta'] .">
	// 						<i class='fas fa-". $cv['v_icon'] ."'></i>
	// 					</a>
	// 				</td>
	// 				<td>
	// 					<a id=".$cv['id']." name=".$cv['v_nombre']." class='btn btn-danger btn-sm text-white eliminar'>
	// 						<i class='fa fa-trash-alt'></i>
	// 						<span><b>&nbsp;&nbsp;Eliminar</b></span>
	// 					</a>
	// 				</td>
	// 			</tr>";
	// 		}

	// 		header('Content-type: application/json; charset=utf-8');
	// 		echo $json->encode(
	// 			array(
	// 				"data" => $filas,
	// 			)
	// 		);

	// 	} else {
	// 		$this->redireccionar('index/logout');
	// 	}

	// }

	public function mantenimiento_archivos()
	{

		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$id = $_POST['id'];
			$nombre = $_POST['nombre'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$param2 = array(
				"post"	=> 2, //consultar archivo especifico
				"id"	=> intval($id),
				"user"	=> intval($_SESSION['id']),
			);
	
			$soap = new SoapClient($wsdl, $options);
			$result2 = $soap->ConsultaCV($param2);
			$consultacv = json_decode($result2->ConsultaCVResult, true);

			unlink($consultacv[0]['v_ruta']);
	
			$param = array(
				"post"	=> intval($post), //eliminar
				"id"	=> intval($id),
				"nombre"=> $nombre,
				"ruta"	=> "",
				"size"	=> 0.00,
				"type"	=> "",
				"user"	=> intval($_SESSION['id']),
			);
	
			$soap = new SoapClient($wsdl, $options);
			$result = $soap->MantCV($param);
			$cv = json_decode($result->MantCVResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $cv[0]['v_icon'],
					"vtitle" 		=> $cv[0]['v_title'],
					"vtext" 		=> $cv[0]['v_text'],
					"itimer" 		=> intval($cv[0]['i_timer']),
					"icase" 		=> intval($cv[0]['i_case']),
					"vprogressbar" 	=> $cv[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}

	}

}
?>