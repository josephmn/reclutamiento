<?php

class puestosbController extends Controller
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

			$params = array(
				'post' => 2, //cargar solo con tipo de check
				'id' => 0,
				'chk' => 0 //tipo de check (0.deseleccionados, 1.seleccionados)
			);

			$result = $soap->Cargo($params);
			$cargos = json_decode($result->CargoResult, true);

			$this->_view->cargos = $cargos;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_cargos() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$codigo = $_POST['codigo'];
			$cargo = $_POST['cargo'];
			$chk = $_POST['chk'];
			$dias = $_POST['dias'];

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
				'post'			=> $post,
				'id' 			=> $codigo,
				'cargo' 		=> $cargo,
				'chk'			=> $chk,
				'dias'			=> $dias,
				'user' 			=> intval($_SESSION['id']),
			);
			$result = $soap->MantCargo($params);
			$mantcargo = json_decode($result->MantCargoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $mantcargo[0]['v_icon'],
					"vtitle" 		=> $mantcargo[0]['v_title'],
					"vtext" 		=> $mantcargo[0]['v_text'],
					"itimer" 		=> intval($mantcargo[0]['i_timer']),
					"icase" 		=> intval($mantcargo[0]['i_case']),
					"vprogressbar" 	=> $mantcargo[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}
}