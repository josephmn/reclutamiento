<?php

class adaptacionbController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','adaptacionb');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
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

			$params1 = array(
				"user" => 0,
			);

			$result6 = $soap->ConsultaSolicitudes($params1);
			$cargossolicitados = json_decode($result6->ConsultaSolicitudesResult, true);

			$this->_view->cargossolicitados = $cargossolicitados;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');

		} else {
			$this->redireccionar('index/logout');
		}
    }

	public function adaptacionb_detalle()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','adaptacionb');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
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

			$codigo = $_GET['codigo'];
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

			$result = $soap->Pais();
			$pais = json_decode($result->PaisResult, true);

			$result1 = $soap->Departamento();
			$departamento = json_decode($result1->DepartamentoResult, true);

			$param2 = array(
				"departamento" => 0,
			);

			$result2 = $soap->Provincia($param2);
			$provincia = json_decode($result2->ProvinciaResult, true);

			$param3 = array(
				"provincia" => 0,
			);

			$result3 = $soap->Distrito($param3);
			$distrito = json_decode($result3->DistritoResult, true);

			$result4 = $soap->TipoContrato();
			$tipocontrato = json_decode($result4->TipoContratoResult, true);

			$params5 = array(
				'id' => $codigo,
			);

			$result5 = $soap->ConsultaListaSolicitud($params5);
			$listasolicitud = json_decode($result5->ConsultaListaSolicitudResult, true);

			$this->_view->cargo = $cargo;
			$this->_view->listasolicitud = $listasolicitud;
			$this->_view->pais = $pais;
			$this->_view->departamento = $departamento;
			$this->_view->provincia = $provincia;
			$this->_view->distrito = $distrito;
			$this->_view->tipocontrato = $tipocontrato;

			$this->_view->setJs(array('adaptaciondetalle'));
			$this->_view->renderizar('adaptaciondetalle');

		} else {
			$this->redireccionar('index/logout');
		}
    }

	public function cargar_provincia()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$departamento = $_POST['departamento'];

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
				"departamento" => $departamento,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->Provincia($param);
			$provincia = json_decode($result->ProvinciaResult, true);
			
			$filas="";
			foreach($provincia as $dv){
				$filas.="<option value=".$dv['i_codigo'].">".$dv['v_descripcion']."</option>";
			};

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function cargar_distritos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$provincia = $_POST['provincia'];

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
				"provincia" => $provincia,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->Distrito($param);
			$distrito = json_decode($result->DistritoResult, true);

			$filas="";
			foreach($distrito as $dv){
				$filas.="<option value=".$dv['i_codigo'].">".$dv['v_descripcion']."</option>";
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

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

	public function get_verificacion() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$codigo = intval($_POST['codigo']);

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
				'codigo' => intval($codigo),
			);

			$result = $soap->Verificacion($params);
			$getverificacion = json_decode($result->VerificacionResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $getverificacion[0]['v_icon'],
					"vtitle" 		=> $getverificacion[0]['v_title'],
					"vtext" 		=> $getverificacion[0]['v_text'],
					"itimer" 		=> intval($getverificacion[0]['i_timer']),
					"icase" 		=> intval($getverificacion[0]['i_case']),
					"vprogressbar" 	=> $getverificacion[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function registro_publicacion() //OK
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$titulo = $_POST['titulo'];
			$complemento = $_POST['complemento'];
			$descripcion = $_POST['descripcion'];
			$datortr = $_POST['datortr']; //array tareas
			$pais = $_POST['pais'];
			$departamento = $_POST['departamento'];
			$provincia = $_POST['provincia'];
			$distrito= $_POST['distrito'];
			$jornada= $_POST['jornada'];
			$descjornada= $_POST['descjornada'];
			$contrato= $_POST['contrato'];
			$salario1= $_POST['salario1'];
			$salario2= $_POST['salario2'];
			$mostrarsalario= $_POST['mostrarsalario'];
			$fecha= $_POST['fecha'];
			$vacantes= $_POST['vacantes'];
			$experiencia= $_POST['experiencia'];
			$edadmin= $_POST['edadmin'];
			$edadmax= $_POST['edadmax'];
			$mostraredad= $_POST['mostraredad'];
			$estudios= $_POST['estudios'];
			$descestudios= $_POST['descestudios'];
			$datospri= $_POST['datospri']; //array perfil
			$rdviaje1= $_POST['rdviaje1'];
			$rdviaje2= $_POST['rdviaje2'];
			$rdresidencia1= $_POST['rdresidencia1'];
			$rdresidencia2= $_POST['rdresidencia2'];
			$rddiscapacidad1= $_POST['rddiscapacidad1'];
			$rddiscapacidad2= $_POST['rddiscapacidad2'];
			$puesto= $_POST['puesto'];

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

			//array tareas
			$i = 0;
			foreach ($datortr as $di) {
				$params[$i] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $di['id'],
					'tarea' 		=> $di['tareas'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPBTarea($params[$i]);
				$i++;
			}

			//array perfil
			$j = 0;
			foreach ($datospri as $dp) {
				$params[$j] = array(
					'post'			=> $post,
					'correlativo'	=> $correlativo,
					'id'			=> $dp['id'],
					'perfil' 		=> $dp['perfil'],
					'user' 			=> intval($_SESSION['id']),
				);
				$soap->RPBPerfil($params[$j]);
				$j++;
			}

			$params = array(
				'post' => $post,
				'estado' => 1, // para la publicacion siempre es en 1
				'correlativo' => $correlativo,
				'titulo' => $titulo,
				'complemento' =>  $complemento,
				'descripcion' =>  $descripcion,
				'pais' => $pais,
				'departamento' => $departamento,
				'provincia' => $provincia,
				'distrito' => $distrito,
				'jornada' => $jornada,
				'desc_jornada' => $descjornada,
				'contrato' => $contrato,
				'salario1' => $salario1,
				'salario2' => $salario2,
				'mostrar_salario' => $mostrarsalario,
				'fecha' => $fecha,
				'vacantes' => $vacantes,
				'experiencia' => $experiencia,
				'edad_min' => $edadmin,
				'edad_max' => $edadmax,
				'mostrar_edad' => $mostraredad,
				'estudios' => $estudios,
				'desc_estudios' => $descestudios,
				'rdviaje1' => $rdviaje1,
				'rdviaje2' => $rdviaje2,
				'rdresidencia1' => $rdresidencia1,
				'rdresidencia2' => $rdresidencia2,
				'rddiscapacidad1' => $rddiscapacidad1,
				'rddiscapacidad2' => $rddiscapacidad2,
				'puesto' => $puesto,
				'user' => intval($_SESSION['id']),
			);

			$result2 = $soap->RegistroPublicacionB($params);
			$plublicacionB = json_decode($result2->RegistroPublicacionBResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $plublicacionB[0]['v_icon'],
					"vtitle" 		=> $plublicacionB[0]['v_title'],
					"vtext" 		=> $plublicacionB[0]['v_text'],
					"itimer" 		=> intval($plublicacionB[0]['i_timer']),
					"icase" 		=> intval($plublicacionB[0]['i_case']),
					"vprogressbar" 	=> $plublicacionB[0]['v_progressbar'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

}
?>