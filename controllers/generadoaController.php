<?php

class generadoaController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','generadoa');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					// 'dist/css/extensions/toastr.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
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
					'plugins/vendors/js/extensions/sweetalert2.all.min',
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

			$result = $soap->ConsultaGenerado();
			$generado = json_decode($result->ConsultaGeneradoResult, true);

			$this->_view->generado = $generado;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function solicitud_generado($codigo)
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

			$params = array(
				'codigo' => $codigo
			);

			$soap = new SoapClient($wsdl, $options);

			$result = $soap->ConsultaPuestoA($params);
			$solicitud = json_decode($result->ConsultaPuestoAResult, true);

			$params1 = array(
				'post' => 0, //no se usa para este caso
				'codigo' => $codigo,
				'id' => 0 //no se usa para este caso
			);

			$result1 = $soap->ConsultaResponsabilidad($params1);
			$responsabilidad = json_decode($result1->ConsultaResponsabilidadResult, true);

			$result2 = $soap->ConsultaImpacto($params1);
			$impacto = json_decode($result2->ConsultaImpactoResult, true);

			$result3 = $soap->ConsultaOrganizacion($params1);
			$organizacion = json_decode($result3->ConsultaOrganizacionResult, true);

			$result4 = $soap->ConsultaRelaciones($params1);
			$relaciones = json_decode($result4->ConsultaRelacionesResult, true);

			$result5 = $soap->ConsultaDecisiones($params1);
			$decisiones = json_decode($result5->ConsultaDecisionesResult, true);

			$result6 = $soap->ConsultaTransversales($params1);
			$transversales = json_decode($result6->ConsultaTransversalesResult, true);

			$result7 = $soap->ConsultaEspecificas($params1);
			$especificas = json_decode($result7->ConsultaEspecificasResult, true);

			$result8 = $soap->ConsultaIdiomas($params1);
			$idiomas = json_decode($result8->ConsultaIdiomasResult, true);

			$result9 = $soap->ConsultaProgramas($params1);
			$programas = json_decode($result9->ConsultaProgramasResult, true);

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
			$pdf->MultiCell(160, 4, utf8_decode("DESCRIPCIÓN DE PUESTO"), 0, "L", false);

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
			<p>Este documento consolida las funciones y responsabilidades que conforma cada uno de los puestos de la estructura organizacional de la compañía. 
			Es requisito indispensable para la búsqueda de nuevas posiciones y para aquellas que han tenido un cambio significativo requiriendo una revaloración. 
			Una vez completado, deberá ser revisado y firmado por el jefe del área y enviarlo a responsable de Recursos Humanos.</p>
			");
			$pdf->WriteTag(0, 4, $txt_titulo, 0, "J", 0, 5);

			$pdf->SetXY(21, 32);
			$txt2 = utf8_decode("<p><vb>DATOS:</vb></p>");
			$pdf->WriteTag(0, 4, $txt2, 0, "J", 0, 5);

			$pdf->SetXY(25, 42);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("TITULO DEL PUESTO"), 0, 0, 'L', false); // TITULO DEL PUESTO
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($solicitud[0]['v_puesto']), 0, 0, 'L', false);

			$pdf->SetXY(140, 42);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(11, 4, utf8_decode("FECHA"), 0, 0, 'L', false); // FECHA
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, $solicitud[0]['d_fecha'], 0, 0, 'L', false);

			$pdf->SetXY(25, 46);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("ELABORADO POR"), 0, 0, 'L', false); // ELABORADO POR
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($solicitud[0]['v_elaborado_por']), 0, 0, 'L', false);

			$pdf->SetXY(25, 50);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("REVISADO POR"), 0, 0, 'L', false); // REVISADO POR
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($solicitud[0]['v_revisado_por']), 0, 0, 'L', false);

			$pdf->SetXY(25, 54);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("GERENCIA"), 0, 0, 'L', false); // GERENCIA
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($solicitud[0]['v_gerencia']), 0, 0, 'L', false);

			$pdf->SetXY(25, 58);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(43, 4, utf8_decode("POSICIÓN A LA QUE REPORTA"), 0, 0, 'L', false); // POSICION A LA QUE REPORTA
			$pdf->Cell(2, 4, utf8_decode(":"), 0, 0, 'L', false);
			$pdf->AddFont('CenturyGothic', '', 'GOTHIC.php');
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Cell(17, 4, utf8_decode($solicitud[0]['v_posicion_reporta']), 0, 0, 'L', false);

			// MISION
			$pdf->SetXY(21, 62);
			$txt3 = utf8_decode("<p><vb>1. MISÍON: </vb>Describa brevemente la misión de la posición en la empresa, utilizando el verbo en infinitivo. 
			Ejem: Administrar, planificar, desarrollar, implementar, etc.</p>");
			$pdf->WriteTag(0, 4, $txt3, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);
			
			// CREATE TABLE MISION
			$colmision = array();
			$col = array();
			$col[] = array('text' => utf8_decode($solicitud[0]['v_mision']), 'width' => '154', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colmision[] = $col;
			$pdf->WriteTable($colmision);

			// PRINCIPALES RESPONSABILIDADES
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt4 = utf8_decode("<p><vb>2. PRINCIPALES RESPONSABILIDADES: </vb>Mencione las principales responsabilidades (máximo 8) que permita cumplir la misión de la posición. 
			Tener en cuenta que debe utilizar el verbo en infinitivo (QUÉ) + descripción (CÓMO) + resultado esperado (PARA QUÉ). No debe incluir funciones que son parte de un proyecto a corto plazo (Menor a 1 año).</p>");
			$pdf->WriteTag(0, 4, $txt4, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE RESPONSABILIDAD
			$columns = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => '#', 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("ACCIONES (¿Qué hace?, ¿Cómo lo hace?"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("RESULTADO FINAL ESPERADO (¿Para qué lo hace?"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$i = 0;
			$n = 1;
			foreach($responsabilidad as $rs){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $n, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['v_acciones']), 'width' => '72', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rs['v_resultado']), 'width' => '72', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columns[] = $col;
				$i++;
				$n++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columns);

			// IMPACTO CUANTITATIVO DEL PUESTO
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt5 = utf8_decode("<p><vb>3. IMPACTO CUANTITATIVO DEL PUESTO: </vb>Ingresos, activos, gastos, etc. expresados en soles y en términos anuales. Se debe completar solo para los cargos que apliquen.</p>");
			$pdf->WriteTag(0, 4, $txt5, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE RESPONSABILIDAD
			$columns = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => '#', 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Principales Dimensiones/Magnitudes"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Magnitud S/."), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$i = 0;
			$n = 1;
			foreach($impacto as $im){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $n, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($im['v_dimensiones']), 'width' => '72', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($im['v_magnitud']), 'width' => '72', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columns[] = $col;
				$i++;
				$n++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columns);

			// ORGANIZACION
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt6 = utf8_decode("<p><vb>4. ORGANIZACIÓN: </vb>Mencione el nombre de las posiciones y cantidad de ocupantes.</p>");
			$pdf->WriteTag(0, 4, $txt6, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);
			
			$colorga = array();
			$col = array();
			$col[] = array('text' => utf8_decode("Posición del jefe directo: "), 'width' => '40', 'height' => '5', 'align' => 'J', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode($solicitud[0]['v_organizacion']), 'width' => '114', 'height' => '5', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colorga[] = $col;
			$pdf->WriteTable($colorga);

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE ORGANIZACION
			$columnsorga = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => '#', 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Puestos que le reportan"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Número de reportes"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsorga[] = $col;

			$i = 0;
			$n = 1;
			foreach($organizacion as $rg){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $n, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rg['v_puestos']), 'width' => '72', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rg['v_reportes']), 'width' => '72', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsorga[] = $col;
				$i++;
				$n++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columnsorga);

			// ORGANIZACION
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt7 = utf8_decode("<p><vb>5. RESPONSABILIDAD POR LAS RELACIONES: </vb>Señale qué tipo de relaciones tiene con personas de otras áreas internas o externas, en el cumplimiento de tus funciones (proveedores, clientes, organismos regulatorios, gobierno, etc.)</p>");
			$pdf->WriteTag(0, 4, $txt7, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE ORGANIZACION
			$columnsrela = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => utf8_decode("Entidad / Área"), 'width' => '52', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Objetivo"), 'width' => '51', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Objetivo / Implicancia"), 'width' => '51', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsrela[] = $col;

			$i = 0;
			foreach($relaciones as $rl){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => utf8_decode($rl['v_entidad']), 'width' => '52', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_cargo']), 'width' => '51', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($rl['v_objetivo']), 'width' => '51', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsrela[] = $col;
				$i++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columnsrela);

			// COMPLEJIDAD DE LA POSICIÓN
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb>6. COMPLEJIDAD DE LA POSICIÓN: </vb>Mencione los mayores retos o decisiones que la posición debe asumir de manera que explique la complejidad del cargo.</p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE COMPLEJIDAD DE LA POSICIÓN
			$colposicion = array();
			$col = array();
			$col[] = array('text' => utf8_decode($solicitud[0]['v_complejidad']), 'width' => '154', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colposicion[] = $col;
			$pdf->WriteTable($colposicion);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb>Principales decisiones que toma o recomendaciones que brinda inherentes a las funciones del puesto.</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE ORGANIZACION
			$columnsdeci = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => "#", 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Decisiones"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Recomendaciones"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columnsdeci[] = $col;

			$o = 1;
			$i = 0;
			foreach($decisiones as $ds){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $o, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($ds['v_decisiones']), 'width' => '72', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($ds['v_recomendaciones']), 'width' => '72', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columnsdeci[] = $col;
				$i++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columnsdeci);

			// COMPETENCIA
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb>7. COMPETENCIAS: </vb>Mencione el nivel de competencias que requiere la posición.</p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);
			
			$coltr = array();
			$col = array();
			$col[] = array('text' => '', 'width' => '5', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => utf8_decode("TRANSVERSALES:"), 'width' => '72', 'height' => '5', 'align' => 'J', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$coltr[] = $col;

			$i = 0;
			$c = 1;
			foreach($transversales as $ts){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $c.'. ', 'width' => '10', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
				$col[] = array('text' => utf8_decode($ts['v_descripcion']), 'width' => '72', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
				$coltr[] = $col;
				$i++;
				$c++;
			}

			$pdf->WriteTable($coltr);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);
			
			$coles = array();
			$col = array();
			$col[] = array('text' => '', 'width' => '5', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => utf8_decode("ESPECÍFICAS:"), 'width' => '72', 'height' => '5', 'align' => 'J', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$coles[] = $col;

			$i = 0;
			$c = 1;
			foreach($especificas as $ep){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $c.'. ', 'width' => '10', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
				$col[] = array('text' => utf8_decode($ep['v_descripcion']), 'width' => '72', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
				$coles[] = $col;
				$i++;
				$c++;
			}

			$pdf->WriteTable($coles);

			// PRINCIPALES CONOCIMIENTOS Y EXPERIENCIAS
			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb>8. PRINCIPALES CONOCIMIENTOS Y EXPERIENCIA: </vb>Considere lo mínimo requerido para la posición.</p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			$chktecnico = "";
			//v_chktecnico, v_chkuniversitario, v_chkpostgrado, v_chkotros, v_otros,
			if ($solicitud[0]['v_chktecnico'] === null || $solicitud[0]['v_chktecnico'] === ""){
				$chktecnico = "";
			}else{
				if ($solicitud[0]['v_chktecnico'] === "false"){
					$chktecnico = "";
				}else{
					$chktecnico = "X";
				}
			}

			$chkuniversitario = "";
			if ($solicitud[0]['v_chkuniversitario'] === null || $solicitud[0]['v_chkuniversitario'] === ""){
				$chkuniversitario = "";
			}else{
				if ($solicitud[0]['v_chkuniversitario'] === "false"){
					$chkuniversitario = "";
				}else{
					$chkuniversitario = "X";
				}
			}

			$chkpostgrado = "";
			if ($solicitud[0]['v_chkpostgrado'] === null || $solicitud[0]['v_chkpostgrado'] === ""){
				$chkpostgrado = "";
			}else{
				if ($solicitud[0]['v_chkpostgrado'] === "false"){
					$chkpostgrado = "";
				}else{
					$chkpostgrado = "X";
				}
			}

			$chkotros = "";
			$chkotros_desc = "";
			if ($solicitud[0]['v_chkotros'] === null || $solicitud[0]['v_chkotros'] === ""){
				$chkotros = "";
			}else{
				if ($solicitud[0]['v_chkotros'] === "false"){
					$chkotros = "";
					$chkotros_desc = "";
				}else{
					$chkotros = "X";
					$chkotros_desc = $solicitud[0]['v_otros'];
				}
			}

			$colexp = array();
			$col = array();
			$col[] = array('text' => $chktecnico, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Técnico"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => $chkuniversitario, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Universitario"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => $chkpostgrado, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Post Grado"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => $chkotros, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Otros"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colexp[] = $col;

			$pdf->WriteTable($colexp);

			$pdf->Ln(4);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			$colotros = array();
			$col = array();
			$col[] = array('text' => utf8_decode("Otros descripción:"), 'width' => '154', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$colotros[] = $col;

			$col = array();
			$col[] = array('text' => utf8_decode($chkotros_desc), 'width' => '154', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colotros[] = $col;

			$pdf->WriteTable($colotros);

			$pdf->Ln(4);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			$colotros = array();
			$col = array();
			$col[] = array('text' => utf8_decode(" - Carrera profesional y/o técnica:"), 'width' => '154', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$colotros[] = $col;

			$col = array();
			$col[] = array('text' => utf8_decode($solicitud[0]['v_profesion']), 'width' => '154', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colotros[] = $col;

			$pdf->WriteTable($colotros);

			$pdf->Ln(2);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb> - Conocimientos</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			//v_rd1	v_rd2
			$rd1 = "";
			$rd2 = "";
			if ($solicitud[0]['v_rd1'] == "true"){
				$rd1 = "X";
				$rd2 = "";
			}

			if ($solicitud[0]['v_rd2'] == "true"){
				$rd1 = "";
				$rd2 = "X";
			}

			$colcono = array();
			$col = array();
			$col[] = array('text' => utf8_decode("Del sector:"), 'width' => '20', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => $rd1, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Requerido"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => $rd2, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("No requerido"), 'width' => '30', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$colcono[] = $col;

			$pdf->WriteTable($colcono);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb> - Idiomas</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(2);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE ORGANIZACION
			$columidioma = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => "#", 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Idioma"), 'width' => '42', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Habla"), 'width' => '34', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Lee"), 'width' => '34', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Escribe"), 'width' => '34', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columidioma[] = $col;

			$d = 1;
			$i = 0;
			foreach($idiomas as $id){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $d, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($id['v_idioma']), 'width' => '42', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($id['v_habla']), 'width' => '34', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($id['v_lee']), 'width' => '34', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($id['v_escribe']), 'width' => '34', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$columidioma[] = $col;
				$i++;
				$d++;
			}

			// DRAW TABLE
			$pdf->WriteTable($columidioma);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb> - Programas</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(2);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);

			// CREATE TABLE ORGANIZACION
			$colprogramas = array();

			// HEADER DATA COLUMN
			$col = array();
			$col[] = array('text' => "#", 'width' => '10', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Programa"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Nivel"), 'width' => '72', 'height' => '5', 'align' => 'C', 'font_name' => 'CenturyGothic-Bold', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '97,194,80', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$colprogramas[] = $col;

			$p = 1;
			$i = 0;
			foreach($programas as $pr){
				// ROW DATA COLUMN
				$col = array();
				$col[] = array('text' => $p, 'width' => '10', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($pr['v_programa']), 'width' => '72', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$col[] = array('text' => utf8_decode($pr['v_nivel']), 'width' => '72', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
				$colprogramas[] = $col;
				$i++;
				$p++;
			}

			// DRAW TABLE
			$pdf->WriteTable($colprogramas);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb> - Experiencia previa (indicar cantidad de años en los casos que aplique):</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(2);

			$asector = "";
			$ansector = "";
			if ($solicitud[0]['v_sector'] === null || $solicitud[0]['v_sector'] === ""){
				$asector = "";
				$ansector = "";
			}else{
				if ($solicitud[0]['v_sector'] === "false"){
					$asector = "";
					$ansector = "-";
				}else{
					$asector = "X";
					$ansector = $solicitud[0]['v_anhio_sector'];
				}
			}

			$acargo = "";
			$anacargo = "";
			if ($solicitud[0]['v_personal_acargo'] === null || $solicitud[0]['v_personal_acargo'] === ""){
				$acargo = "";
				$anacargo = "";
			}else{
				if ($solicitud[0]['v_personal_acargo'] === "false"){
					$acargo = "";
					$anacargo = "-";
				}else{
					$acargo = "X";
					$anacargo = $solicitud[0]['v_anhio_personal'];
				}
			}

			$apuestos = "";
			$anpuestos = "";
			if ($solicitud[0]['v_puestos_similares'] === null || $solicitud[0]['v_puestos_similares'] === ""){
				$apuestos = "";
				$anpuestos = "";
			}else{
				if ($solicitud[0]['v_puestos_similares'] === "false"){
					$apuestos = "";
					$anpuestos = "-";
				}else{
					$apuestos = "X";
					$anpuestos = $solicitud[0]['v_anhio_puestos'];
				}
			}

			$colexp1 = array();

			$col = array();
			$col[] = array('text' => $asector, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("En el sector"), 'width' => '35', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => utf8_decode("N° de años : "), 'width' => '20', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => utf8_decode($ansector.' año(s).'), 'width' => '30', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$colexp1[] = $col;

			$col = array();
			$col[] = array('text' => '', 'width' => '3', 'height' => '2', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'T');
			$colexp1[] = $col;

			$col = array();
			$col[] = array('text' => $acargo, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Con personal a cargo"), 'width' => '35', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => utf8_decode("N° de años : "), 'width' => '20', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => utf8_decode($anacargo.' año(s).'), 'width' => '30', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$colexp1[] = $col;

			$col = array();
			$col[] = array('text' => '', 'width' => '3', 'height' => '2', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'T');
			$colexp1[] = $col;

			$col = array();
			$col[] = array('text' => $apuestos, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("En puestos similares"), 'width' => '35', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => utf8_decode("N° de años : "), 'width' => '20', 'height' => '4', 'align' => 'R', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$col[] = array('text' => utf8_decode($anpuestos.' año(s).'), 'width' => '30', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0', 'linearea' => '');
			$colexp1[] = $col;

			$pdf->WriteTable($colexp1);

			$pdf->SetMargins(25, 4, 28);
			$pdf->SetX(21);

			$txt8 = utf8_decode("<p><vb> - Otros conocimientos específicos:</vb></p>");
			$pdf->WriteTag(0, 4, $txt8, 0, "J", 0, 5);

			$pdf->Ln(4);

			$pdf->SetX(25);
			$pdf->SetMargins($pdf->left=25, $pdf->top=4, $pdf->right=10);
			
			// CREATE TABLE OTROS CONOCIMIENTOS
			$colmision = array();
			$col = array();
			$col[] = array('text' => utf8_decode($solicitud[0]['v_conocimiento']), 'width' => '154', 'height' => '4', 'align' => 'J', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colmision[] = $col;
			$pdf->WriteTable($colmision);

			$pdf->Ln(2);

			$otlicencias = "";
			$desotlicencias = "";
			if ($solicitud[0]['v_otro_licencias'] === null || $solicitud[0]['v_otro_licencias'] === ""){
				$otlicencias = "";
				$desotlicencias = "";
			}else{
				if ($solicitud[0]['v_otro_licencias'] === "false"){
					$otlicencias = "";
					$desotlicencias = "";
				}else{
					$otlicencias = "X";
					$desotlicencias = $solicitud[0]['v_desc_licencias'];
				}
			}

			$otcertifi = "";
			$desotcertifi = "";
			if ($solicitud[0]['v_otro_certificaciones'] === null || $solicitud[0]['v_otro_certificaciones'] === ""){
				$otcertifi = "";
				$desotcertifi = "";
			}else{
				if ($solicitud[0]['v_otro_certificaciones'] === "false"){
					$otcertifi = "";
					$desotcertifi = "";
				}else{
					$otcertifi = "X";
					$desotcertifi = $solicitud[0]['v_desc_certificaciones'];
				}
			}

			$colmaxexp = array();

			$col = array();
			$col[] = array('text' => $otlicencias, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Licencias"), 'width' => '25', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => utf8_decode($desotlicencias), 'width' => '120', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colmaxexp[] = $col;

			$col = array();
			$col[] = array('text' => '', 'width' => '3', 'height' => '2', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'T');
			$colmaxexp[] = $col;

			$col = array();
			$col[] = array('text' => $otcertifi, 'width' => '6', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => utf8_decode("Certificaciones"), 'width' => '25', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '3', 'height' => '4', 'align' => 'C', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'L');
			$col[] = array('text' => utf8_decode($desotcertifi), 'width' => '120', 'height' => '4', 'align' => 'L', 'font_name' => 'CenturyGothic', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.2', 'linearea' => 'LTBR');
			$colmaxexp[] = $col;

			$pdf->WriteTable($colmaxexp);

			$pdf->Output($codigo."-".strtoupper(utf8_decode($solicitud[0]['v_puesto'])).".pdf", 'I');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function detalle_generado()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','generadoa');

			$codigo = $_GET['codigo'];
			$cargo = $_GET['cargo'];

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

			$params = array(
				'codigo' => $codigo,
			);

			$result = $soap->ConsultaPuestoAGEN($params);
			$puestogen = json_decode($result->ConsultaPuestoAGENResult, true);

			$params1 = array(
				'post' => 0, // no se usa para este caso 
				'codigo' => $codigo,
				'id' => 0, // no se usa para este caso
			);

			$result1 = $soap->ConsultaResponsabilidad($params1);
			$respongen = json_decode($result1->ConsultaResponsabilidadResult, true);	

			$result2 = $soap->ConsultaImpacto($params1);
			$impacgen = json_decode($result2->ConsultaImpactoResult, true);

			$result3 = $soap->ConsultaOrganizacion($params1);
			$organigen = json_decode($result3->ConsultaOrganizacionResult, true);

			$result4 = $soap->ConsultaRelaciones($params1);
			$relacigen = json_decode($result4->ConsultaRelacionesResult, true);

			$result5 = $soap->ConsultaDecisiones($params1);
			$decisigen = json_decode($result5->ConsultaDecisionesResult, true);

			$result6 = $soap->ConsultaTransversales($params1);
			$transvgen = json_decode($result6->ConsultaTransversalesResult, true);

			$result7 = $soap->ConsultaEspecificas($params1);
			$especigen = json_decode($result7->ConsultaEspecificasResult, true);

			$result8 = $soap->ConsultaIdiomas($params1);
			$idiomagen = json_decode($result8->ConsultaIdiomasResult, true);

			$result9 = $soap->ConsultaProgramas($params1);
			$progragen = json_decode($result9->ConsultaProgramasResult, true);

			$this->_view->codigo = $codigo;
			$this->_view->cargo = $cargo;
			$this->_view->puestogen = $puestogen;
			$this->_view->respongen = $respongen;
			$this->_view->impacgen = $impacgen;
			$this->_view->organigen = $organigen;
			$this->_view->relacigen = $relacigen;
			$this->_view->decisigen = $decisigen;
			$this->_view->transvgen = $transvgen;
			$this->_view->especigen = $especigen;
			$this->_view->idiomagen = $idiomagen;
			$this->_view->progragen = $progragen;

			$this->_view->setJs(array('editargenerado'));
			$this->_view->renderizar('editargenerado');

		} else {
			$this->redireccionar('index/logout');
		}
    }

	public function consulta_responsabilidades(){
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

			$result = $soap->ConsultaResponsabilidad($params);
			$conResponsabilidades = json_decode($result->ConsultaResponsabilidadResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conResponsabilidades[0]['i_id'],
					"vacciones" 	=> $conResponsabilidades[0]['v_acciones'],
					"vresultado" 	=> $conResponsabilidades[0]['v_resultado'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_responsabilidades(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$acciones = $_POST['acciones'];
			$resultados = $_POST['resultados'];

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
				'acciones' 		=> $acciones,
				'resultados' 	=> $resultados,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPAResponsabilidades($params);
			$rpaResponsabilidades = json_decode($result->RPAResponsabilidadesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaResponsabilidades[0]['v_icon'],
					"vtitle" 		=> $rpaResponsabilidades[0]['v_title'],
					"vtext" 		=> $rpaResponsabilidades[0]['v_text'],
					"itimer" 		=> intval($rpaResponsabilidades[0]['i_timer']),
					"icase" 		=> intval($rpaResponsabilidades[0]['i_case']),
					"vprogressbar" 	=> $rpaResponsabilidades[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_impacto(){
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

			$result = $soap->ConsultaImpacto($params);
			$conImpacto = json_decode($result->ConsultaImpactoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 			=> $conImpacto[0]['i_id'],
					"vdimensiones" 	=> $conImpacto[0]['v_dimensiones'],
					"vmagnitudes" 	=> $conImpacto[0]['v_magnitud'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_impacto(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$dimensiones = $_POST['dimensiones'];
			$magnitudes = $_POST['magnitudes'];

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
				'dimensiones' 	=> $dimensiones,
				'magnitudes' 	=> $magnitudes,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPAImpacto($params);
			$rpaImpacto = json_decode($result->RPAImpactoResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaImpacto[0]['v_icon'],
					"vtitle" 		=> $rpaImpacto[0]['v_title'],
					"vtext" 		=> $rpaImpacto[0]['v_text'],
					"itimer" 		=> intval($rpaImpacto[0]['i_timer']),
					"icase" 		=> intval($rpaImpacto[0]['i_case']),
					"vprogressbar" 	=> $rpaImpacto[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_organizacion(){
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

			$result = $soap->ConsultaOrganizacion($params);
			$conOrganizacion = json_decode($result->ConsultaOrganizacionResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 			=> $conOrganizacion[0]['i_id'],
					"vpuestos" 		=> $conOrganizacion[0]['v_puestos'],
					"vreportes" 	=> $conOrganizacion[0]['v_reportes'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_organizacion(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$puestos = $_POST['puestos'];
			$reportes = $_POST['reportes'];

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
				'puestos' 		=> $puestos,
				'reportes' 		=> $reportes,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPAOrganizacion($params);
			$rpaOrganizacion = json_decode($result->RPAOrganizacionResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaOrganizacion[0]['v_icon'],
					"vtitle" 		=> $rpaOrganizacion[0]['v_title'],
					"vtext" 		=> $rpaOrganizacion[0]['v_text'],
					"itimer" 		=> intval($rpaOrganizacion[0]['i_timer']),
					"icase" 		=> intval($rpaOrganizacion[0]['i_case']),
					"vprogressbar" 	=> $rpaOrganizacion[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_relaciones(){
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

			$result = $soap->ConsultaRelaciones($params);
			$conRelaciones = json_decode($result->ConsultaRelacionesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conRelaciones[0]['i_id'],
					"ventidad" 	=> $conRelaciones[0]['v_entidad'],
					"vcargo" 	=> $conRelaciones[0]['v_cargo'],
					"vobjetivo" => $conRelaciones[0]['v_objetivo'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_relaciones(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$entidades = $_POST['entidades'];
			$cargos = $_POST['cargos'];
			$objetivos = $_POST['objetivos'];

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
				'entidades' 	=> $entidades,
				'cargos' 		=> $cargos,
				'objetivos' 	=> $objetivos,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPARelaciones($params);
			$rpaRelaciones = json_decode($result->RPARelacionesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaRelaciones[0]['v_icon'],
					"vtitle" 		=> $rpaRelaciones[0]['v_title'],
					"vtext" 		=> $rpaRelaciones[0]['v_text'],
					"itimer" 		=> intval($rpaRelaciones[0]['i_timer']),
					"icase" 		=> intval($rpaRelaciones[0]['i_case']),
					"vprogressbar" 	=> $rpaRelaciones[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_complejidad(){
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

			$result = $soap->ConsultaDecisiones($params);
			$conComplejidad = json_decode($result->ConsultaDecisionesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 				=> $conComplejidad[0]['i_id'],
					"vdecisiones" 		=> $conComplejidad[0]['v_decisiones'],
					"vrecomendaciones" 	=> $conComplejidad[0]['v_recomendaciones'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_complejidad(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$decisiones = $_POST['decisiones'];
			$recomendaciones = $_POST['recomendaciones'];

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
				'post'				=> $post,
				'correlativo'		=> $correlativo,
				'id'				=> $id,
				'decisiones' 		=> $decisiones,
				'recomendaciones' 	=> $recomendaciones,
				'user' 				=> intval($_SESSION['id']),
			);

			$result = $soap->RPADecisiones($params);
			$rpaComplejidad = json_decode($result->RPADecisionesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaComplejidad[0]['v_icon'],
					"vtitle" 		=> $rpaComplejidad[0]['v_title'],
					"vtext" 		=> $rpaComplejidad[0]['v_text'],
					"itimer" 		=> intval($rpaComplejidad[0]['i_timer']),
					"icase" 		=> intval($rpaComplejidad[0]['i_case']),
					"vprogressbar" 	=> $rpaComplejidad[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_transversal(){
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

			$result = $soap->ConsultaTransversales($params);
			$conComplejidad = json_decode($result->ConsultaTransversalesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 			=> $conComplejidad[0]['i_id'],
					"vdescripcion" 	=> $conComplejidad[0]['v_descripcion'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_transversal(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$descripcion = $_POST['descripcion'];

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
				'post'				=> $post,
				'correlativo'		=> $correlativo,
				'id'				=> $id,
				'descripcion' 		=> $descripcion,
				'user' 				=> intval($_SESSION['id']),
			);

			$result = $soap->RPATransversales($params);
			$rpaTransversales = json_decode($result->RPATransversalesResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaTransversales[0]['v_icon'],
					"vtitle" 		=> $rpaTransversales[0]['v_title'],
					"vtext" 		=> $rpaTransversales[0]['v_text'],
					"itimer" 		=> intval($rpaTransversales[0]['i_timer']),
					"icase" 		=> intval($rpaTransversales[0]['i_case']),
					"vprogressbar" 	=> $rpaTransversales[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_especifico(){
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

			$result = $soap->ConsultaEspecificas($params);
			$conEspecificas = json_decode($result->ConsultaEspecificasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 			=> $conEspecificas[0]['i_id'],
					"vdescripcion" 	=> $conEspecificas[0]['v_descripcion'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_especifico(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$descripcion = $_POST['descripcion'];

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
				'post'				=> $post,
				'correlativo'		=> $correlativo,
				'id'				=> $id,
				'descripcion' 		=> $descripcion,
				'user' 				=> intval($_SESSION['id']),
			);

			$result = $soap->RPAEspecificas($params);
			$rpaEspecificas = json_decode($result->RPAEspecificasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaEspecificas[0]['v_icon'],
					"vtitle" 		=> $rpaEspecificas[0]['v_title'],
					"vtext" 		=> $rpaEspecificas[0]['v_text'],
					"itimer" 		=> intval($rpaEspecificas[0]['i_timer']),
					"icase" 		=> intval($rpaEspecificas[0]['i_case']),
					"vprogressbar" 	=> $rpaEspecificas[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_idioma(){
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

			$result = $soap->ConsultaIdiomas($params);
			$conIdiomas = json_decode($result->ConsultaIdiomasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conIdiomas[0]['i_id'],
					"vidioma" 	=> $conIdiomas[0]['v_idioma'],
					"vhabla" 	=> $conIdiomas[0]['i_habla'],
					"vlee" 		=> $conIdiomas[0]['i_lee'],
					"vescribe" 	=> $conIdiomas[0]['i_escribe'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_idioma(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$idioma = $_POST['idioma'];

			$ihabla = $_POST['ihabla'];
			$ilee = $_POST['ilee'];
			$iescribe = $_POST['iescribe'];

			$vhabla = $_POST['vhabla'];
			$vlee = $_POST['vlee'];
			$vescribe = $_POST['vescribe'];

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
				'idioma' 		=> $idioma,
				'ihabla' 		=> $ihabla,
				'vhabla' 		=> $vhabla,
				'ilee' 			=> $ilee,
				'vlee' 			=> $vlee,
				'iescribe' 		=> $iescribe,
				'vescribe' 		=> $vescribe,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPAIdiomas($params);
			$rpaIdiomas = json_decode($result->RPAIdiomasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaIdiomas[0]['v_icon'],
					"vtitle" 		=> $rpaIdiomas[0]['v_title'],
					"vtext" 		=> $rpaIdiomas[0]['v_text'],
					"itimer" 		=> intval($rpaIdiomas[0]['i_timer']),
					"icase" 		=> intval($rpaIdiomas[0]['i_case']),
					"vprogressbar" 	=> $rpaIdiomas[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_programa(){
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

			$result = $soap->ConsultaProgramas($params);
			$conProgramas = json_decode($result->ConsultaProgramasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"iid" 		=> $conProgramas[0]['i_id'],
					"vprograma" => $conProgramas[0]['v_programa'],
					"vnivel" 	=> $conProgramas[0]['i_nivel'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_programa(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$id = $_POST['id'];
			$programa = $_POST['programa'];
			$inivel = $_POST['inivel'];
			$vnivel = $_POST['vnivel'];

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
				'programa' 		=> $programa,
				'inivel' 		=> $inivel,
				'vnivel' 		=> $vnivel,
				'user' 			=> intval($_SESSION['id']),
			);

			$result = $soap->RPAProgramas($params);
			$rpaProgramas = json_decode($result->RPAProgramasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $rpaProgramas[0]['v_icon'],
					"vtitle" 		=> $rpaProgramas[0]['v_title'],
					"vtext" 		=> $rpaProgramas[0]['v_text'],
					"itimer" 		=> intval($rpaProgramas[0]['i_timer']),
					"icase" 		=> intval($rpaProgramas[0]['i_case']),
					"vprogressbar" 	=> $rpaProgramas[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_puestoagen(){
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$correlativo = $_POST['correlativo'];
			$estado = $_POST['estado'];
			$puesto = intval($_POST['puesto']);
			$fecha = $_POST['fecha'];
			$elaborado = $_POST['elaborado'];
			$revisado = $_POST['revisado'];
			$gerencia = $_POST['gerencia'];
			$reporta = $_POST['reporta'];
			$mision = $_POST['mision'];
			$organizacion= $_POST['organizacion'];
			$complejidad= $_POST['complejidad'];
			$chktecnico= $_POST['chktecnico'];
			$chkuniversitario= $_POST['chkuniversitario'];
			$chkpostgrado= $_POST['chkpostgrado'];
			$chkotros= $_POST['chkotros'];
			$indicar_otro= $_POST['indicar_otro'];
			$profesion= $_POST['profesion'];
			$rd1= $_POST['rd1'];
			$rd2= $_POST['rd2'];
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

			$params = array(
				'post'					=> $post,
				'correlativo' 			=> $correlativo,
				'estado' 				=> $estado,
				'puesto' 				=> $puesto,
				'fecha' 				=> $fecha,
				'elaborado_por' 		=> $elaborado,
				'revisado_por' 			=> $revisado,
				'gerencia' 				=> $gerencia,
				'posicion_reporta' 		=> $reporta,
				'mision' 				=> $mision,
				'organizacion' 			=> $organizacion,
				'complejidad' 			=> $complejidad,
				'chktecnico' 			=> $chktecnico,
				'chkuniversitario' 		=> $chkuniversitario,
				'chkpostgrado' 			=> $chkpostgrado,
				'chkotros' 				=> $chkotros,
				'otros' 				=> $indicar_otro,
				'profesion' 			=> $profesion,
				'rd1' 					=> $rd1,
				'rd2' 					=> $rd2,
				'sector' 				=> $sector,
				'anhio_sector'		 	=> $anhio_sector,
				'personal_acargo' 		=> $personal_acargo,
				'anhio_personal' 		=> $anhio_personal,
				'puestos_similares' 	=> $puestos_similares,
				'anhio_puestos' 		=> $anhio_puestos,
				'conocimiento' 			=> $conocimiento,
				'otro_licencias' 		=> $otro_licencias,
				'desc_licencias' 		=> $desc_licencias,
				'otro_certificaciones' 	=> $otro_certificaciones,
				'desc_certificaciones'  => $desc_certificaciones,
				'user' 					=> intval($_SESSION['id']),
			);

			$result = $soap->RegistroPuestoA($params);
			$rpuestoA = json_decode($result->RegistroPuestoAResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
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