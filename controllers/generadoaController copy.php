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

			$params = array(
				'user' => $_SESSION['id'],
			);

			$result = $soap->ConsultaGenerado($params);
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

			$this->getLibrary('fpdf/fpdf');
			$this->getLibrary('fpdf/makefont/makefont');

			$pdf = new FPDF();
			$pdf = new alphapdf();

			$pdf->AddPage();
			$pdf->SetAlpha(0.5);
			$pdf->SetMargins(25, 4, 28);
			$pdf->Image('./public/dist/img/fondoagua.jpg', 0, 0, 210, 300, "jpg");

			$pdf->SetAlpha(1);
			$pdf->SetXY(25, 10);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHICB.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->MultiCell(160, 4, utf8_decode("DESCRIPCIÓN DE PUESTO (PROPUESTA DUX PARTNERS)"), 0, "L", false);

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


			$pdf->SetStyle("p", "CenturyGothic", "", 8, "0,0,0", 0);
			$pdf->SetFont('CenturyGothic', '', 8);
			$pdf->Write(4, utf8_decode($solicitud[0]['v_mision']));

			$pdf->Ln(4);

			// PRINCIPALES RESPONSABILIDADES
			$pdf->SetX(21);
			$txt4 = utf8_decode("<p><vb>2. PRINCIPALES RESPONSABILIDADES: </vb>Mencione las principales responsabilidades (máximo 8) que permita cumplir la misión de la posición. 
			Tener en cuenta que debe utilizar el verbo en infinitivo (QUÉ) + descripción (CÓMO) + resultado esperado (PARA QUÉ).</p>");
			$pdf->WriteTag(0, 4, $txt4, 0, "J", 0, 5);

			$pdf->Ln(-5);

			$pdf->SetX(21);
			$txt5 = utf8_decode("<p>No debe incluir funciones que son parte de un proyecto a corto plazo (Menor a 1 año).</p>");
			$pdf->WriteTag(0, 4, $txt5, 0, "J", 0, 5);

			// $pdf->SetFont('CenturyGothic','',8);
			// $pdf->Write(4,utf8_decode($solicitud[0]['v_mision']));

			$pdf->Ln(4);

			$pdf->SetMargins($pdf->left, $pdf->top, $pdf->right);
			$pdf->AddPage();

			// create table
			$columns = array();

			// header col
			$col = array();
			$col[] = array('text' => 'Datum', 'width' => '20', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '135,206,250', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Text', 'width' => '125', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '135,206,250', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Soll', 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '135,206,250', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Haben', 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '135,206,250', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Saldo', 'width' => '15', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '135,206,250', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			// data col
			$col = array();
			$col[] = array('text' => '01.12.2010', 'width' => '20', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Rechnungs Nr 123456789', 'width' => '125', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '120.50', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '12', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,255', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '120.50S', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			// data col
			$col = array();
			$col[] = array('text' => '15.12.2010', 'width' => '20', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Zahlung: 123456789', 'width' => '125', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '120.50', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => '0.00H', 'width' => '15', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$col = array();
			$col[] = array('text' => 'Ist der Text zu lang, ist das kein Problem', 'width' => '50', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' => '12', 'font_style' => '', 'fillcolor' => '0,0,255', 'textcolor' => '0,255,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Auch mit mehreren Farben ist es kein Problem', 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => 'B', 'fillcolor' => '255,255,0', 'textcolor' => '0,255,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'So ist das Bauen einer Tabelle einfach nur einfach. MuliCell macht es einfach. Okay das ist nun lang genug', 'width' => '50', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,255,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Erstellen von Rechnungen sind kein Problem mehr', 'width' => '40', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,0,255', 'textcolor' => '0,255,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			$col = array();
			$col[] = array('text' => 'Einfach nur mal eine Zeile ohne Rahmen', 'width' => '190', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,255,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'TB');
			$columns[] = $col;

			$col = array();
			$col[] = array('text' => 'Einfach nur mal eine Zeile in der Tabelle', 'width' => '80', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,0,0', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$col[] = array('text' => 'Gerne auch mit einer Spalte mehr', 'width' => '110', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '8', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => 'LTBR');
			$columns[] = $col;

			// Draw Table   
			$pdf->WriteTable($columns);

			// $htmlTable='<table>
			// <tr>
			// 	<td>#</td>
			// 	<td>'.utf8_decode("ACCIONES (¿Qué hace?, ¿Cómo lo hace?").'</td>
			// 	<td>'.utf8_decode("RESULTADO FINAL ESPERADO (¿Para qué lo hace?").'</td>
			// </tr>

			// <tr>
			// 	<td>1</td>
			// 	<td>Azeem</td>
			// 	<td>24</td>
			// </tr>

			// <tr>
			// 	<td>2</td>
			// 	<td>Atiq</td>
			// 	<td>Validar la consolidación de la distribución de productos vendidos por pedido y centro de responsabilidad para su posterior facturación.</td>
			// </tr>

			// <tr>
			// 	<td>3</td>
			// 	<td>Shahid</td>
			// 	<td>24</td>
			// </tr>

			// <tr>
			// 	<td>4</td>
			// 	<td>Roy Montgome</td>
			// 	<td>36</td>
			// </tr>

			// <tr>
			// 	<td>5</td>
			// 	<td>M.Bony</td>
			// 	<td>&nbsp;</td>
			// </tr>
			// </table>';
			// // $pdf->SetWidths(array(10, 68, 75));
			// $pdf->SetFont('CenturyGothic','',8);
			// $pdf->SetMargins(25, 4, 28);
			// $pdf->WriteHTML("Inicio<br>$htmlTable<br>Fin",92,'J');

			// $pdf->WriteTag(0,4,utf8_decode($solicitud[0]['v_mision']),0,"J",0,5);
			// $txt4=utf8_decode("<p>Estructurar el presupuesto anual de toda la organización por unidad de negocio y por todas las sucursales y/o 
			// niveles del estado ganancia - pérdida. Asimismo, efectuar el análisis y evaluaciones de todas las desviaciones presupuestarias por unidad 
			// de negocio a nivel nacional.</p>");
			// $pdf->WriteTag(0,4,$txt4,0,"J",0,5);
			// $nb=$pdf->WordWrap($solicitud[0]['v_mision'],180);
			// $pdf->Write(4,"This paragraph has $nb lines:\n");
			// $pdf->Write(4,utf8_decode($solicitud[0]['v_mision']));

			// // Text
			// $txt_mision=utf8_decode(" 
			// <p><vb></vb> con <vb>RUC Nº 20394862704</vb>, domiciliado en , 
			// debidamente representada por , en su calidad de empleador y en cumplimiento de lo 
			// dispuesto por el , deja constancia de la determinación, distribución y pago de 
			// la participación en las utilidades del trabajador <vb>JOSEPH CARLOS MAGALLANES NOLAZCO</vb>, correspondiente al ejercicio <vb>2021</vb>, 
			// con fecha depósito <vb>2021-09-06</vb>, en la cuenta N° <vb></vb> del <vb></vb>.</p>
			// ");
			// $pdf->WriteTag(0,4,$txt_mision,0,"J",0,5);

			$pdf->Ln(15);


			//$pdf->Image('./public/dist/img/firmamaster.png', 40, 223, 65, 23, "png");
			// $pdf->Image('./public/dist/img/firmamaster.png', 15, 222, 105, 0, "png");

			$pdf->SetXY(40, 244);
			$pdf->Cell(50, 3, "_________________________________________", 0, 0, "C");
			$pdf->SetXY(40, 248);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHICB.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(50, 3, strtoupper("jhonny"), 0, 0, "C");

			// FIRMA DEL TRABAJADOR
			//$pdf->Image('./public/doc/firmas/72130767_20210426_150641.png', 117, 230, 55, 22, "png");
			$pdf->SetXY(120, 244);
			$pdf->Cell(50, 3, "_________________________________________", 0, 0, "C");
			$pdf->SetXY(120, 248);
			$pdf->AddFont('CenturyGothic-Bold', '', 'GOTHICB.php');
			$pdf->SetFont('CenturyGothic-Bold', '', 8);
			$pdf->Cell(50, 3, strtoupper(utf8_decode($solicitud[0]['v_puesto'])), 0, 0, "C");

			$pdf->Output(strtoupper(utf8_decode($solicitud[0]['v_puesto'])).".pdf", 'I');
		} else {
			$this->redireccionar('index/logout');
		}
	}
}
?>