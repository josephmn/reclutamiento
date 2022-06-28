<?php

class puestosaController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','puestosa');

			$this->_view->setCss_Specific(
				array(
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					'dist/css/forms/wizard/bs-stepper.min',
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
					'dist/css/plugins/forms/wizard/form-wizard',
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
					'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
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
				'post' => 3, //cargar solo con tipo de check
				'id' => 0,
				'chk' => 0 //tipo de check (0.deseleccionados, 1.seleccionados), pero no usa
			);

			$result = $soap->Cargo($params);
			$cargo = json_decode($result->CargoResult, true);

			$result1 = $soap->Especifica();
			$especificas = json_decode($result1->EspecificaResult, true);

			$result2 = $soap->Transversal();
			$transversales = json_decode($result2->TransversalResult, true);

			$this->_view->cargo = $cargo;
			$this->_view->especificas = $especificas;
			$this->_view->transversales = $transversales;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');

		} else {
			$this->redireccionar('index/logout');
		}
    }

	public function get_correlativo() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$id = intval($_POST['id']);
			//$id = 1;

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
				'id' => intval($id),
			);

			$result = $soap->GenCorrelativo($params);
			$gencorrelativo = json_decode($result->GenCorrelativoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vcorrelativo" => $gencorrelativo[0]['v_correlativo'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function registro_puesto() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$puesto = intval($_POST['puesto']);
			$fecha = $_POST['fecha'];
			$elaborado = $_POST['elaborado'];
			$revisado = $_POST['revisado'];
			$gerencia = $_POST['gerencia'];
			$reporta = $_POST['reporta'];
			$mision = $_POST['mision'];
			$datosaci= $_POST['datosaci'];//array responsablidades
			$datosimp= $_POST['datosimp'];//array impacto
			$organizacion= $_POST['organizacion'];
			$datosorg= $_POST['datosorg'];//array organizacion
			$datosres= $_POST['datosres'];//array responsablidades relaciones
			$complejidad= $_POST['complejidad'];
			$datoscom= $_POST['datoscom'];//array complejidad
			$chktecnico= $_POST['chktecnico'];
			$chkuniversitario= $_POST['chkuniversitario'];
			$chkpostgrado= $_POST['chkpostgrado'];
			$chkotros= $_POST['chkotros'];
			$indicar_otro= $_POST['indicar_otro'];
			$profesion= $_POST['profesion'];
			$rd1= $_POST['rd1'];
			$rd2= $_POST['rd2'];
			$datospri= $_POST['datospri'];//array idioma
			$datospro= $_POST['datospro'];//array programas
			$sector= $_POST['sector'];
			$anhio_sector= intval($_POST['anhio_sector']);
			$personal_acargo= $_POST['personal_acargo'];
			$anhio_personal= intval($_POST['anhio_personal']);
			$puestos_similares= $_POST['puestos_similares'];
			$anhio_puestos= intval($_POST['anhio_puestos']);
			$conocimiento= $_POST['conocimiento'];
			$otro_licencias= $_POST['otro_licencias'];
			$desc_licencias= $_POST['desc_licencias'];
			$otro_certificaciones= $_POST['otro_certificaciones'];
			$desc_certificaciones= $_POST['desc_certificaciones'];


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

			//array responsablidades
			$i = 0;
			foreach ($datosaci as $di) {
				$params[$i] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $di['id'],
					'acciones' 		=> $di['acciones'],
					'resultados' 	=> $di['resultados'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPAResponsabilidades($params[$i]);
				$i++;
			}

			//array impacto
			$j = 0;
			foreach ($datosimp as $dp) {
				$params[$j] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $dp['id'],
					'dimensiones' 	=> $dp['dimensiones'],
					'magnitudes' 	=> $dp['magnitudes'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPAImpacto($params[$j]);
				$j++;
			}

			//array organizacion
			$k = 0;
			foreach ($datosorg as $or) {
				$params[$k] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $or['id'],
					'puestos' 		=> $or['puestos'],
					'reportes' 		=> $or['reportes'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPAOrganizacion($params[$k]);
				$k++;
			}

			//array responsabilidad por las relaciones
			$l = 0;
			foreach ($datosres as $rs) {
				$params[$l] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $rs['id'],
					'entidades' 	=> $rs['entidades'],
					'cargos' 		=> $rs['cargos'],
					'objetivos' 	=> $rs['objetivos'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPARelaciones($params[$l]);
				$l++;
			}

			//array complejidad
			$m = 0;
			foreach ($datoscom as $dc) {
				$params[$m] = array(
					'post'				=> $post,
					'correlativo'		=> $correlativo,
					'id'				=> $dc['id'],
					'decisiones' 		=> $dc['decisiones'],
					'recomendaciones' 	=> $dc['recomendaciones'],
					'user' 				=> intval($_SESSION['id']),
				);
				$soap->RPADecisiones($params[$m]);
				$m++;
			}

			//array idiomas
			$n = 0;
			foreach ($datospri as $di) {
				$params[$n] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $di['id'],
					'idioma' 		=> $di['idioma'],
					'ihabla' 		=> $di['hablaid'],
					'vhabla' 		=> $di['hablatext'],
					'ilee' 			=> $di['leeid'],
					'vlee' 			=> $di['leetext'],
					'iescribe' 		=> $di['escribeid'],
					'vescribe' 		=> $di['escribetext'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPAIdiomas($params[$n]);
				$n++;
			}

			//array programas
			$o = 0;
			foreach ($datospro as $do) {
				$params[$o] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $do['id'],
					'programa' 		=> $do['programas'],
					'inivel' 		=> $do['nivelid'],
					'vnivel' 		=> $do['niveltext'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPAProgramas($params[$o]);
				$o++;
			}

			$params = array(
				'post' => $post,
				'correlativo' => $correlativo,
				'estado' => 1, //siempre inserta en activo (registro nuevo)
				'puesto' => $puesto,
				'fecha' =>  $fecha,
				'elaborado_por' => $elaborado,
				'revisado_por' => $revisado,
				'gerencia' => $gerencia,
				'posicion_reporta' => $reporta,
				'mision' => $mision,
				'organizacion' => $organizacion,
				'complejidad' => $complejidad,
				'chktecnico' => $chktecnico,
				'chkuniversitario' => $chkuniversitario,
				'chkpostgrado' => $chkpostgrado,
				'chkotros' => $chkotros,
				'otros' => $indicar_otro,
				'profesion' => $profesion,
				'rd1' => $rd1,
				'rd2' => $rd2,
				'sector' => $sector,
				'anhio_sector' => $anhio_sector,
				'personal_acargo' => $personal_acargo,
				'anhio_personal' => $anhio_personal,
				'puestos_similares' => $puestos_similares,
				'anhio_puestos' => $anhio_puestos,
				'conocimiento' => $conocimiento,
				'otro_licencias' => $otro_licencias,
				'desc_licencias' => $desc_licencias,
				'otro_certificaciones' => $otro_certificaciones,
				'desc_certificaciones'  => $desc_certificaciones,
				'user' => intval($_SESSION['id']),
			);

			$result2 = $soap->RegistroPuestoA($params);
			$rpuestoA = json_decode($result2->RegistroPuestoAResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					// "data"			=> $params,
					"vicon" 		=> $rpuestoA[0]['v_icon'],
					"vtitle" 		=> $rpuestoA[0]['v_title'],
					"vtext" 		=> $rpuestoA[0]['v_text'],
					"itimer" 		=> intval($rpuestoA[0]['i_timer']),
					"icase" 		=> intval($rpuestoA[0]['i_case']),
					"vprogressbar" 	=> $rpuestoA[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

}
?>