<?php

class publicacionesbController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','publicacionesb');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					// 'dist/css/forms/select/select2.min',
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

			$result = $soap->PublicacionB();
			$publicacionB = json_decode($result->PublicacionBResult, true);

			$this->_view->publicacionB = $publicacionB;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function postulaciones_detalle()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','publicacionesb');

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
			$puesto = $_GET['puesto'];

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
				"post"			=> 0, //0 para todos, 1 busqueda por estados, 2 listar para correo
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 1, //0 no se busca estado, 1,2,3 --estados
			);

			$result = $soap->PublicacionBDetalle($param);
			$postulantes = json_decode($result->PublicacionBDetalleResult, true);

			// aprobados
			$param1 = array(
				"post"			=> 1, //0 para todos, 1 busqueda por estados, 2 listar para correo
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 2, //0 no se busca estado, 1,2,3 --estados
			);

			$result1 = $soap->PublicacionBDetalle($param1);
			$aprobados = json_decode($result1->PublicacionBDetalleResult, true);

			// desaprobados
			$param2 = array(
				"post"			=> 1, //0 para todos, 1 busqueda por estados, 2 listar para correo
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 3, //0 no se busca estado, 1,2,3 --estados
			);

			$result2 = $soap->PublicacionBDetalle($param2);
			$desaprobados = json_decode($result2->PublicacionBDetalleResult, true);

			// cv_enviado
			$param3 = array(
				"post"			=> 3, //0 para todos, 1 busqueda por estados, 2 listar para correo, 3 envio de cv
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 4, //0 no se busca estado, 1,2,3 --estados
			);
			
			$result3 = $soap->PublicacionBDetalle($param3);
			$cvenviado = json_decode($result3->PublicacionBDetalleResult, true);

			// cv_enviado_aprobado
			$param4 = array(
				"post"			=> 5, //entrevista (aprobado y desaprobado)
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 6, //6 estado aprobado
			);
			
			$result3 = $soap->PublicacionBDetalle($param4);
			$cvenviadoaprobado = json_decode($result3->PublicacionBDetalleResult, true);


			// cv_enviado_desaprobado
			$param5 = array(
				"post"			=> 5, //entrevista (aprobado y desaprobado)
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion,
				"estados"		=> 7, //7 estado desaprobado
			);
			
			$result3 = $soap->PublicacionBDetalle($param5);
			$cvenviadodesaprobado = json_decode($result3->PublicacionBDetalleResult, true);

			$this->_view->puesto = $puesto;
			$this->_view->postulantes = $postulantes;
			$this->_view->aprobados = $aprobados;
			$this->_view->desaprobados = $desaprobados;
			$this->_view->cvenviado = $cvenviado;
			$this->_view->cvenviadoaprobado = $cvenviadoaprobado;
			$this->_view->cvenviadodesaprobado = $cvenviadodesaprobado;

			$this->_view->setJs(array('postulantes'));
			$this->_view->renderizar('postulantes');

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_publicacion()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','publicacionesb');

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

			$publicacion = $_GET['publicacion'];
			$puesto = $_GET['puesto'];

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
				"codigo"	=> $publicacion,
			);

			$result = $soap->Publicado($param);
			$publicado = json_decode($result->PublicadoResult, true);

			$result = $soap->Pais();
			$pais = json_decode($result->PaisResult, true);

			$filaspais="";
			foreach($pais as $pa){
				$filaspais.="<option ".$pa['v_default']." value=".$pa['i_codigo'].">".$pa['v_descripcion']."</option>";
			}

			$result1 = $soap->Departamento();
			$departamento = json_decode($result1->DepartamentoResult, true);

			$filasdepartamento="";
			$seldepartamento = "";
			foreach($departamento as $dp){
				if ($dp['i_codigo'] == $publicado[0]['i_departamento']){
					$seldepartamento = "selected='selected'";
				}else{
					$seldepartamento = "";
				}
				$filasdepartamento.="<option ".$seldepartamento." value=".$dp['i_codigo'].">".$dp['v_descripcion']."</option>";
			}

			$param2 = array(
				"departamento" => $publicado[0]['i_departamento'],
			);

			$result2 = $soap->Provincia($param2);
			$provincia = json_decode($result2->ProvinciaResult, true);

			$filasprovincia="";
			$selprovincia = "";
			foreach($provincia as $pr){
				if ($pr['i_codigo'] == $publicado[0]['i_provincia']){
					$selprovincia = "selected='selected'";
				}else{
					$selprovincia = "";
				}
				$filasprovincia.="<option ".$selprovincia." value=".$pr['i_codigo'].">".$pr['v_descripcion']."</option>";
			}

			$param3 = array(
				"provincia" => $publicado[0]['i_provincia'],
			);

			$result3 = $soap->Distrito($param3);
			$distrito = json_decode($result3->DistritoResult, true);

			$filasdistrito="";
			$seldistrito = "";
			foreach($distrito as $ds){
				if ($ds['i_codigo'] == $publicado[0]['i_distrito']){
					$seldistrito = "selected='selected'";
				}else{
					$seldistrito = "";
				}
				$filasdistrito.="<option ".$seldistrito." value=".$ds['i_codigo'].">".$ds['v_descripcion']."</option>";
			}

			$result4 = $soap->TipoContrato();
			$tipocontrato = json_decode($result4->TipoContratoResult, true);

			$filascontrato="";
			$selcontrato = "";
			foreach($tipocontrato as $tp){
				if ($tp['i_codigo'] == $publicado[0]['i_contrato']){
					$selcontrato = "selected='selected'";
				}else{
					$selcontrato = "";
				}
				$filascontrato.="<option ".$selcontrato." value=".$tp['i_codigo'].">".$tp['v_descripcion']."</option>";
			}

			$param5 = array(
				"post"		=> 0,
				"codigo" 	=> $publicacion,
				"id"		=> 0,
			);

			$result6 = $soap->PublicacionTarea($param5);
			$pubtarea = json_decode($result6->PublicacionTareaResult, true);

			$param4 = array(
				"post"		=> 0,
				"codigo" 	=> $publicacion,
				"id"		=> 0,
			);

			$result5 = $soap->PublicacionPerfil($param4);
			$pubperfil = json_decode($result5->PublicacionPerfilResult, true);

			$this->_view->puesto = $puesto;
			$this->_view->publicado = $publicado;

			$this->_view->pais = $filaspais;
			$this->_view->departamento = $filasdepartamento;
			$this->_view->provincia = $filasprovincia;
			$this->_view->distrito = $filasdistrito;
			$this->_view->tipocontrato = $filascontrato;

			$this->_view->pubtarea = $pubtarea;
			$this->_view->pubperfil = $pubperfil;

			$this->_view->setJs(array('mantpublicacion'));
			$this->_view->renderizar('mantpublicacion');

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function datos_correo()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$id = $_POST['id'];

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
				"id"			=> $id,
				"publicacion" 	=> "",
			);

			$result = $soap->PublicacionBDetalle($param);
			$postulantes = json_decode($result->PublicacionBDetalleResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"id" 			=> intval($postulantes[0]['id']),
					"titulo" 		=> $postulantes[0]['v_titulo'],
					"postulante" 	=> $postulantes[0]['v_postulante'],
					"correo" 		=> $postulantes[0]['v_correo'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_postulantes()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$checks = $_POST['checks'];
			$estado = $_POST['estado'];

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

			$i = 0;
			foreach ($checks as $ch) {
				$params[$i] = array(
					'post'			=> intval($post),
					'id' 			=> intval($ch),
					'estado' 		=> intval($estado),
					'user' 			=> intval($_SESSION['id']),
				);
				$result = $soap->MantPostulantesDetalle($params[$i]);
				$postulantesdetalle = json_decode($result->MantPostulantesDetalleResult, true);
				$i++;
			};

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $postulantesdetalle[0]['v_icon'],
					"vtitle" 		=> $postulantesdetalle[0]['v_title'],
					"vtext" 		=> $postulantesdetalle[0]['v_text'],
					"itimer" 		=> intval($postulantesdetalle[0]['i_timer']),
					"icase" 		=> intval($postulantesdetalle[0]['i_case']),
					"vprogressbar" 	=> $postulantesdetalle[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_publicacionB()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$estado = $_POST['estado'];
			$correlativo = $_POST['correlativo'];
			$titulo = $_POST['titulo'];
			$complemento = $_POST['complemento'];
			$descripcion = $_POST['descripcion'];
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

			$params = array(
				'post' 				=> $post,
				'estado'			=> $estado,
				'correlativo' 		=> $correlativo,
				'titulo' 			=> $titulo,
				'complemento' 		=> $complemento,
				'descripcion' 		=> $descripcion,
				'pais' 				=> $pais,
				'departamento' 		=> $departamento,
				'provincia' 		=> $provincia,
				'distrito' 			=> $distrito,
				'jornada' 			=> $jornada,
				'desc_jornada' 		=> $descjornada,
				'contrato' 			=> $contrato,
				'salario1' 			=> $salario1,
				'salario2' 			=> $salario2,
				'mostrar_salario' 	=> $mostrarsalario,
				'fecha' 			=> $fecha,
				'vacantes' 			=> $vacantes,
				'experiencia' 		=> $experiencia,
				'edad_min' 			=> $edadmin,
				'edad_max' 			=> $edadmax,
				'mostrar_edad' 		=> $mostraredad,
				'estudios' 			=> $estudios,
				'desc_estudios' 	=> $descestudios,
				'rdviaje1' 			=> $rdviaje1,
				'rdviaje2' 			=> $rdviaje2,
				'rdresidencia1' 	=> $rdresidencia1,
				'rdresidencia2' 	=> $rdresidencia2,
				'rddiscapacidad1' 	=> $rddiscapacidad1,
				'rddiscapacidad2' 	=> $rddiscapacidad2,
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

	public function consulta_tarea()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$codigo = $_POST['codigo'];
			$id = $_POST['id'];

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
				'post'		=> $post,
				'codigo'	=> $codigo,
				'id'		=> $id,
			);

			$result = $soap->PublicacionTarea($params);
			$conTarea = json_decode($result->PublicacionTareaResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conTarea[0]['i_id'],
					"vtarea" 	=> $conTarea[0]['v_tarea'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_tarea()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$tarea = $_POST['tarea'];

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
				'correlativo'	=> $correlativo,
				'id'			=> $id,
				'tarea' 		=> $tarea,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPBTarea($params);
			$rpatarea = json_decode($result->RPBTareaResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpatarea[0]['v_icon'],
					"vtitle" 		=> $rpatarea[0]['v_title'],
					"vtext" 		=> $rpatarea[0]['v_text'],
					"itimer" 		=> intval($rpatarea[0]['i_timer']),
					"icase" 		=> intval($rpatarea[0]['i_case']),
					"vprogressbar" 	=> $rpatarea[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_perfil()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$codigo = $_POST['codigo'];
			$id = $_POST['id'];

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
				'post'		=> $post,
				'codigo'	=> $codigo,
				'id'		=> $id,
			);

			$result = $soap->PublicacionPerfil($params);
			$conPerfil = json_decode($result->PublicacionPerfilResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conPerfil[0]['i_id'],
					"vperfil" 	=> $conPerfil[0]['v_perfil'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_perfil()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$perfil = $_POST['perfil'];

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
				'correlativo'	=> $correlativo,
				'id'			=> $id,
				'perfil' 		=> $perfil,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPBPerfil($params);
			$rpatarea = json_decode($result->RPBPerfilResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpatarea[0]['v_icon'],
					"vtitle" 		=> $rpatarea[0]['v_title'],
					"vtext" 		=> $rpatarea[0]['v_text'],
					"itimer" 		=> intval($rpatarea[0]['i_timer']),
					"icase" 		=> intval($rpatarea[0]['i_case']),
					"vprogressbar" 	=> $rpatarea[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

}
?>