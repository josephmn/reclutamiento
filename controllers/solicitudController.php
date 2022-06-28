<?php

class solicitudController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('solicitudes','solicitud');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					// 'dist/css/forms/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/forms/form-wizard',
					// 'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					//'plugins/datatables-net/css/searchPanes.dataTables.min',
					//'plugins/datatables-net/select.dataTables.min',
					'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
					'plugins/datatables-net/css/dataTables.checkboxes'
				)
			);

			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					//'plugins/datatables-net/js/dataTables.searchPanes.min',
					'plugins/datatables-net/js/dataTables.select.min',
					'plugins/datatables-net/js/dataTables.buttons.min',
					'plugins/datatables-net/js/buttons.flash.min',
					'plugins/datatables-net/js/jszip.min',
					'plugins/datatables-net/js/pdfmake.min',
					'plugins/datatables-net/js/vfs_fonts',
					'plugins/datatables-net/js/buttons.html5.min',
					'plugins/datatables-net/js/buttons.print.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'plugins/datatables-net/js/dataTables.checkboxes.min',
					'plugins/vendors/js/extensions/sweetalert2.all.min'
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

			$params1 = array(
				'post' => 2, //cargar solo con tipo de check
				'id' => 0,
				'chk' => 0 //tipo de check (0.deseleccionados, 1.seleccionados)
			);

			$result = $soap->Cargo($params1);
			$cargosactivos = json_decode($result->CargoResult, true);

			$params2 = array(
				"user" => intval($_SESSION['id']),
			);

			$result = $soap->ConsultaSolicitudes($params2);
			$cargossolicitados = json_decode($result->ConsultaSolicitudesResult, true);

			$this->_view->cargossolicitados = $cargossolicitados;
			$this->_view->cargosactivos = $cargosactivos;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function revision_detalle()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					// 'dist/css/forms/select/select2.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					// 'plugins/datatables-net/css/searchPanes.dataTables.min',
					// 'plugins/datatables-net/select.dataTables.min',
					// 'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
				)
			);

			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					// 'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/forms/select/select2.full.min',
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
					'plugins/vendors/js/extensions/sweetalert2.all.min',
				)
			);

			$publicacion = $_GET['publicacion'];
			$cargo = $_GET['cargo'];

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

			// cv enviado
			$param = array(
				"post"			=> 4, //0 para todos, 1 busqueda por estados, 2 listar para correo, 3 envio de cv, 4 entrevista
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 0, //0 no se busca estado, 1,2,3,4 --estados
			);
			
			$result = $soap->PublicacionBDetalle($param);
			$cvenviado = json_decode($result->PublicacionBDetalleResult, true);

			// entrevista aprobada
			$param1 = array(
				"post"			=> 5, //0 para todos, 1 busqueda por estados, 2 listar para correo, 3 envio de cv, 4 entrevista
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 6, //0 no se busca estado, 1,2,3,4 --estados
			);
			
			$result = $soap->PublicacionBDetalle($param1);
			$entrevistaapro = json_decode($result->PublicacionBDetalleResult, true);

			// entrevista desaprobada
			$param1 = array(
				"post"			=> 5, //0 para todos, 1 busqueda por estados, 2 listar para correo, 3 envio de cv, 4 entrevista
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 7, //0 no se busca estado, 1,2,3,4 --estados
			);
			
			$result = $soap->PublicacionBDetalle($param1);
			$entrevistadesapro = json_decode($result->PublicacionBDetalleResult, true);

			$this->_view->cargo = $cargo;
			$this->_view->cvenviado = $cvenviado;
			$this->_view->entrevistaapro = $entrevistaapro;
			$this->_view->entrevistadesapro = $entrevistadesapro;

			$this->_view->setJs(array('revision'));
			$this->_view->renderizar('revision');

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_solicitudes() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$codigo = $_POST['codigo'];
			$cantidad = $_POST['cantidad'];
			$solicitud = $_POST['solicitud'];

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

			$param = array(
				"post" => $post,
				"codigo" => $codigo,
				"cantidad" => $cantidad,
				"solicitud" => $solicitud,
				"user" => intval($_SESSION['id']),
			);

			$result = $soap->MantSolicitudes($param);
			$mantperfiles = json_decode($result->MantSolicitudesResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vicon" 		=> $mantperfiles[0]['v_icon'],
					"vtitle" 		=> $mantperfiles[0]['v_title'],
					"vtext" 		=> $mantperfiles[0]['v_text'],
					"itimer" 		=> intval($mantperfiles[0]['i_timer']),
					"icase" 		=> intval($mantperfiles[0]['i_case']),
					"vprogressbar" 	=> $mantperfiles[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
?>