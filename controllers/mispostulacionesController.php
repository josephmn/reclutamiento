<?php

class mispostulacionesController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('mispostulaciones','');

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

			$param = array(
				"user" => intval($_SESSION['id']),
			);

			$result = $soap->MisPostulaciones($param);
			$mispostulaciones = json_decode($result->MisPostulacionesResult, true);
			
			$this->_view->mispostulaciones = $mispostulaciones;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function publicacion_detalle()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$codigo = $_POST['codigo'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'codigo' => $codigo,
			);

			$result = $soap->Publicacion($params);
			$publicacion = json_decode($result->PublicacionResult, true);

			$params1 = array(
				'post'		=> 0, //todos
				'codigo' 	=> $codigo,
				'id' 		=> 0, //todos
			);

			$result2 = $soap->PublicacionTarea($params1);
			$ptarea = json_decode($result2->PublicacionTareaResult, true);

			$params2 = array(
				'post'		=> 0, //todos
				'codigo' 	=> $codigo,
				'id' 		=> 0, //todos
			);

			$result3 = $soap->PublicacionPerfil($params2);
			$pperfil = json_decode($result3->PublicacionPerfilResult, true);

			$arrptare = "";
			foreach($ptarea as $pt){
				$arrptare.='<li>'.$pt['v_tarea'].'</li>';
			}

			$arrpperfil = "";
			foreach($pperfil as $pp){
				$arrpperfil.='<li>'.$pp['v_perfil'].'</li>';
			}

			$div = '';

			$div.='
			<div class="card-header">
				<h4 class="card-title">VERDUM PERÚ S.A.C.</h4>
			</div>
			<div class="card-body">
				<p class="card-text mb-0"><i class="fas fa-clock"></i>&nbsp;&nbsp;'.$publicacion[0]['v_jornada'].'</p>
				<p class="card-text mb-1"><i class="fas fa-map-marker-alt"></i></i>&nbsp;&nbsp;'.$publicacion[0]['v_distrito'].', '.$publicacion[0]['v_provincia'].', '.$publicacion[0]['v_pais'].'</p>
				<div>
					<h4 class="card-title mb-1 text-success">'.$publicacion[0]['v_titulo'].' ('.$publicacion[0]['v_complemento'].')</h4>
				</div>
				<div class="media my-1 py-25">
					<div class="media-body">
						<small class="text font-weight-bolder">Reclutamiento Verdum</small>
						<span class="text ml-50 mr-25">|</span>
						<small class="text font-weight-bolder">'.$publicacion[0]['d_fecha'].'</small>
					</div>
				</div>
				<h4 class="mb-1">Descripcion:</h4>
				<p class="card-text mb-2" style="text-align: justify;">
					'.$publicacion[0]['v_descripcion_puesto'].'
				</p>
				<hr class="my-1" />
				<h4 class="mb-0">Principales tareas:</h4>
				<ul class="p-2 mb-0" style="text-align: justify;">
					'.$arrptare.'
				</ul>
				<hr class="my-1" />
				<h4 class="mb-0">Perfil buscado:</h4>
				<ul class="p-2 mb-0" style="text-align: justify;">
					'.$arrpperfil.'
					<li>Educación mínima: '.$publicacion[0]['v_estudios'].'.</li>
					<li>Nro de vacantes: '.$publicacion[0]['i_vacantes'].'.</li>
					<li>Experiencia mínima: '.$publicacion[0]['i_experiencia'].' año(s) en puestos similares.</li>
					<li>Disponibilidad para viajar: '.$publicacion[0]['v_viaje'].'</li>
					<li>Disponibilidad para cambiar de residencia: '.$publicacion[0]['v_residencia'].'</li>
					<li>Personas con discapacidad: '.$publicacion[0]['v_discapacidad'].'</li>
					<li>Edad: '.$publicacion[0]['v_edad'].'</li>

				</ul>
				<hr class="my-1" />
				<h4 class="mb-1">Qued ofrecemos:</h4>
				<p class="card-text mb-0"><i class="fas fa-chart-line"></i>&nbsp;&nbsp;Línea de carrera.</p>
				<p class="card-text mb-0"><i class="fas fa-money-bill-wave-alt"></i>&nbsp;&nbsp;Salario: '.$publicacion[0]['v_salario'].'</p>
			</div>
			';
			
			// var_dump($div);exit;

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $div,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}

	}

	public function seguimiento()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$codigo = $_POST['codigo'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'publicacion' 	=> $codigo,
				"user" 			=> intval($_SESSION['id']),
			);

			$result = $soap->Seguimiento($params);
			$seguimiento = json_decode($result->SeguimientoResult, true);

			$list = "";
			foreach($seguimiento as $pt){
				$list.='
				<li class="timeline-item">
					<span class="timeline-point timeline-point-success timeline-point-indicator"></span>
					<div class="timeline-event">
						<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
							<h6>'.$pt['v_cabecera'].'</h6>
							<span class="timeline-event-time">'.$pt['d_fecha'].' - '.$pt['v_hora'].'</span>
						</div>
						<p>'.$pt['v_mensaje'].'</p>
					</div>
				</li>';
			}

			$div = '';

			$div.='
			<div class="card-header">
				<h4 class="card-title">Seguimiento: <b>'.$seguimiento[0]['v_titulo'].'</b></h4>
			</div>
			<div class="card-body">
				<ul class="timeline">
					'.$list.'
				</ul>
			</div>
			';

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $div,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function datos_personales()
	{
		if (isset($_SESSION['usuario'])) {

			function html_caracteres($string)
			{
				$string = str_replace(
					array('&amp;', '&Ntilde;', '&Aacute;', '&Eacute;', '&Iacute;', '&Oacute;', '&Uacute;'),
					array('&', 'Ñ', 'Á', 'É', 'Í', 'Ó', 'Ú'),
					$string
				);
				return $string;
			}

			$publicacion = $_GET['publicacion'];
			$postulante = $_GET['postulante'];
			$secure = $_GET['secure'];

			// $publicacion = 'PUB000001';
			// $postulante = 1;
			// $secure = '3a96135d69075ed3d3ca898fbc9aeace';

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				//"cache_wsdl"=> WSDL_CACHE_BOTH,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params1 = array(
				'postulante' 	=> $postulante, //id de postulacion
				'publicacion' 	=> $publicacion, // PUB000001
				'secure' 		=> $secure, //secure MD5 encriptado
			);

			$result1 = $soap->ConsultaPaPersonal($params1);
			$papersonal = json_decode($result1->ConsultaPaPersonalResult, true);

			// var_dump($papersonal);exit;

			$params2 = array(
				'dni' 			=> $papersonal[0]['v_dni'],
				'postulante' 	=> $postulante,
			);

			$result2 = $soap->ConsultaPaPersonalHijos($params2);
			$papersonalhijos = json_decode($result2->ConsultaPaPersonalHijosResult, true);

			$this->getLibrary('fpdf/fpdf');
			$this->getLibrary('fpdf/makefont/makefont');

			$pdf = new FPDF('P', 'mm', 'A4');
			$pdf = new alphapdf();

			$pdf->AddPage();
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetAutoPageBreak(true,30);
			// $pdf->Image('./public/dist/img/fondoagua.jpg', 0, 0, 210, 300, "jpg");

			$pdf->SetXY(25, 10);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHICB.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 10);
			$pdf->MultiCell(160, 4, utf8_decode("FICHA DE INGRESO"), 0, "L", false);

			$pdf->SetXY(21, 10);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			// Stylesheet
			$pdf->SetStyle("p", "CenturyGothic", "", 8, "0,0,0", 0);
			$pdf->SetStyle("a", "times", "BU", 9, "0,0,255");
			$pdf->SetStyle("pers", "times", "I", 0, "255,0,0");
			$pdf->SetStyle("place", "arial", "U", 0, "153,0,0");
			$pdf->SetStyle("vb", "CenturyGothic-Bold", "", 0, "0,0,0");

			// Text
			$txt_titulo = utf8_decode(" 
			<p>Estos datos fueron llenados por el finalista a una publicacion en el portal de reclutamiento y seleccion de Verdum Perú S.A.C.. 
			Estos datos sera revisados por el Administrador o responsable de Recursos Humanos.</p>
			");
			$pdf->WriteTag(0, 4, $txt_titulo, 0, "J", 0, 5);

			// DATOS PERSONALES
			$pdf->SetXY(20, 22);
			$txt2 = utf8_decode("<p><vb>1. DATOS PERSONALES:</vb></p>"); //TITULO DE DATOS PERSONALES
			$pdf->WriteTag(0, 4, $txt2, 0, "J", 0, 5);

			$pdf->SetXY(28, 34);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CODIGO POSTULANTE"), 0, 0, 'L', false); // CODIGO POSTULANTE
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, $papersonal[0]['i_postulante'], 0, 0, 'L', false); //AQUI

			$pdf->SetXY(28, 38);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CODIGO PUBLICACIÓN"), 0, 0, 'L', false); // CODIGO PUBLICACIÓN
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_publicacion']), 0, 0, 'L', false); //AQUI

			$pdf->SetXY(28, 42);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CARGO / PUESTO DE TRABAJO"), 0, 0, 'L', false); // CARGO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_cargo']), 0, 0, 'L', false);

			$pdf->SetXY(28, 46);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("TIPO DOCUMENTO"), 0, 0, 'L', false); // TIPO DE DOCUMENTO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_tipodoc']), 0, 0, 'L', false);

			$pdf->SetXY(28, 50);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DNI / CE"), 0, 0, 'L', false); // DNI
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_dni']), 0, 0, 'L', false);

			$pdf->SetXY(28, 54);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("NOMBRES Y APELLIDOS"), 0, 0, 'L', false); // NOMBRES COMPLETOS
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_nombres']), 0, 0, 'L', false);

			$pdf->SetXY(28, 58);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("FECHA DE NACIMIENTO"), 0, 0, 'L', false); // FECHA DE NACIMIENTO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['d_fnacimiento']), 0, 0, 'L', false);

			$pdf->SetXY(28, 62);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("ESTADO CIVIL"), 0, 0, 'L', false); // ESTADO CIVIL
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_civil']), 0, 0, 'L', false);

			$pdf->SetXY(28, 66);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("SEXO"), 0, 0, 'L', false); // SEXO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_sexo']), 0, 0, 'L', false);

			$pdf->SetXY(28, 70);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("PAIS"), 0, 0, 'L', false); // PAIS
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode(html_caracteres($papersonal[0]['v_pais'])), 0, 0, 'L', false);

			$pdf->SetXY(28, 74);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DEPARTAMENTO"), 0, 0, 'L', false); // DEPARTAMENTO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode(html_caracteres($papersonal[0]['v_departamento'])), 0, 0, 'L', false);

			$pdf->SetXY(28, 78);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("PROVINCIA"), 0, 0, 'L', false); // PROVINCIA
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode(html_caracteres($papersonal[0]['v_provincia'])), 0, 0, 'L', false);

			$pdf->SetXY(28, 82);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DISTRITO"), 0, 0, 'L', false); // DISTRITO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode(html_caracteres($papersonal[0]['v_distrito'])), 0, 0, 'L', false);

			$pdf->SetXY(28, 86);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DIRECCION ACTUAL"), 0, 0, 'L', false); // DIRECCION ACTUAL
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode(html_caracteres($papersonal[0]['v_domicilio'])), 0, 0, 'L', false);

			$pdf->SetXY(28, 90);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("N° CELULAR"), 0, 0, 'L', false); // CELULAR
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_celular']), 0, 0, 'L', false);

			$pdf->SetXY(28, 94);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CORREO PERSONAL"), 0, 0, 'L', false); // CORREO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_correo']), 0, 0, 'L', false);

			$pdf->SetXY(28, 98);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("HIJOS MENORES DE 18 AÑOS"), 0, 0, 'L', false); // HIJOS MENORES
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['i_hijos']), 0, 0, 'L', false);

			$pdf->SetXY(20, 102);
			$txt2 = utf8_decode("<p><vb>2. HIJOS:</vb></p>"); //TITULO DE DATOS PERSONALES
			$pdf->WriteTag(0, 4, $txt2, 0, "J", 0, 5);

			// HIJOS
			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE RESPONSABILIDAD
			$columns = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => '#', 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("DNI"), 'width' => '36', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("NOMBRES COMPLETOS"), 'width' => '36', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("FECHA NACIMIENTO"), 'width' => '36', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("EDAD"), 'width' => '36', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$i = 0;
			$n = 1;
			foreach($papersonalhijos as $rs){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $n, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['v_dni_padre']), 'width' => '36', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['v_nombre']), 'width' => '36', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['d_fnacimiento']), 'width' => '36', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['i_edad']), 'width' => '36', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columns[] = $col;
				$i++;
				$n++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columns);

			// ESSALUD | AFP
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt5 = utf8_decode("<p><vb>3. ESSALUD | AFP:</vb></p>");
			$pdf->WriteTag(0, 4, $txt5, 0, "J", 0, 5);

			$pdf->Ln(3);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("TIENE ESSALUD"), 0, 0, 'L', false); // TIENE ESSALUD
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['i_essalud']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CODIGO ESSALUD"), 0, 0, 'L', false); // CODIGO ESSALUD
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_essalud']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DOMICILIADO"), 0, 0, 'L', false); // ES DOMICILIADO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['i_domiciliado']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("AFP / ONP / SNP"), 0, 0, 'L', false); // AFP
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_afp']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("COMISION"), 0, 0, 'L', false); // COMISION / FLUJO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_comfluafp']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("CODIGO AFP"), 0, 0, 'L', false); // CODIGO AFP
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_codafp']), 0, 0, 'L', false);

			$pdf->Ln(4);

			// REGISTRO DE TRABAJADORES Y PRESTADORES DE SERVICIOS
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt5 = utf8_decode("<p><vb>4. REGISTRO DE TRABAJADORES Y PRESTADORES DE SERVICIOS:</vb></p>");
			$pdf->WriteTag(0, 4, $txt5, 0, "J", 0, 5);

			$pdf->Ln(3);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("REGIMEN"), 0, 0, 'L', false); // REGIMEN
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['i_regimen']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("NIVEL DE EDUCACIÓN"), 0, 0, 'L', false); // NIVEL DE EDUCACIÓN
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['v_niveleducacion']), 0, 0, 'L', false);

			$pdf->Ln(4);

			$pdf->SetX(28);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("DISCAPACIDAD"), 0, 0, 'L', false); // DISCAPACIDAD
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($papersonal[0]['i_discapacidad']), 0, 0, 'L', false);

			$pdf->Output($publicacion."-".$papersonal[0]['v_cargo']."-".$papersonal[0]['v_nombres'].".pdf", 'I');
		} else {
			$this->redireccionar('index/logout');
		}
	}

}
